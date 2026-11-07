#!/usr/bin/env node
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const failures = [];

const projectsSource = read("src/data/projects.ts");
const projectSlugs = [...projectsSource.matchAll(/slug:\s*["']([^"']+)["']/g)].map((match) => match[1]);
const uniqueProjectSlugs = new Set(projectSlugs);

if (projectSlugs.length !== uniqueProjectSlugs.size) {
  failures.push("Duplicate project slugs found in src/data/projects.ts");
}

const mdxFiles = readdirSync(join(root, "src/content/projects"))
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => file.replace(/\.mdx$/, ""));

for (const slug of uniqueProjectSlugs) {
  if (!mdxFiles.includes(slug)) failures.push(`Missing MDX case study for project: ${slug}`);
}
for (const slug of mdxFiles) {
  if (!uniqueProjectSlugs.has(slug)) failures.push(`MDX case study has no project record: ${slug}`);
}

const curationSource = read("src/data/curation.ts");
const curationSlugs = [...curationSource.matchAll(/slug:\s*["']([^"']+)["']/g)].map((match) => match[1]);
for (const slug of curationSlugs) {
  if (!uniqueProjectSlugs.has(slug)) failures.push(`Curation references unknown project slug: ${slug}`);
}

const archiveSlugGroups = [...curationSource.matchAll(/slugs:\s*\[([^\]]+)\]/g)].map((match) =>
  [...match[1].matchAll(/["']([^"']+)["']/g)].map((item) => item[1]),
);
const archived = new Set(archiveSlugGroups.flat());
for (const slug of uniqueProjectSlugs) {
  if (!archived.has(slug)) failures.push(`Project is missing from the curated archive groups: ${slug}`);
}

for (const path of [
  "src/app/(site)/page.tsx",
  "src/app/(site)/about/page.tsx",
  "src/app/(site)/projects/page.tsx",
  "src/components/feature/FlagshipPanel.tsx",
  "src/components/feature/ProjectList.tsx",
]) {
  if (!existsSync(join(root, path))) failures.push(`Expected source file missing: ${path}`);
}

const homepageSource = read("src/app/(site)/page.tsx");

// The homepage must keep every flagship and the recent spotlight reachable, and
// must send visitors to the full archive rather than duplicating it.
const featuredMatch = curationSource.match(/export const featuredFlagships[^=]*=\s*\[([\s\S]*?)\n\];/);
const featuredSlugs = featuredMatch
  ? [...featuredMatch[1].matchAll(/slug:\s*["']([^"']+)["']/g)].map((match) => match[1])
  : [];
const spotlightMatch = curationSource.match(/export const medcheckSpotlight\s*=\s*\{([\s\S]*?)\n\};/);
const spotlightSlug = spotlightMatch?.[1].match(/slug:\s*["']([^"']+)["']/)?.[1];
if (featuredSlugs.length !== 3) failures.push(`Expected 3 featured flagships, found ${featuredSlugs.length}`);
if (!spotlightSlug) failures.push("Missing medcheckSpotlight slug");
if (!homepageSource.includes("featuredFlagships")) {
  failures.push("Homepage does not render the curated flagships");
}
if (!homepageSource.includes("medcheckSpotlight")) {
  failures.push("Homepage does not render the recent-work spotlight");
}
if (
  spotlightSlug &&
  !homepageSource.includes(`/projects/${spotlightSlug}`) &&
  !homepageSource.includes("medcheck.slug")
) {
  failures.push(`Homepage does not link the spotlight case study: ${spotlightSlug}`);
}
if (!homepageSource.includes("/projects")) failures.push("Homepage does not link to the project archive");

const publicationLinks = [
  "https://doi.org/10.1007/978-3-032-02949-2_2",
  "https://www.ijirmf.com/wp-content/uploads/NOBCON-2024-min.pdf#page=17",
  "https://doi.org/10.1109/FMLDS63805.2024.00092",
];
for (const url of publicationLinks) {
  if (!homepageSource.includes(url)) failures.push(`Missing official publication link: ${url}`);
}
const publicationLinkCount = (homepageSource.match(/className="publication-paper-link"/g) ?? []).length;
if (publicationLinkCount < 1) {
  failures.push("Homepage renders no publication-paper-link elements");
}
const homepagePublicationEntries = (homepageSource.match(/^\s+url: "https?:\/\//gm) ?? []).length;
if (homepagePublicationEntries !== publicationLinks.length) {
  failures.push(
    `Expected ${publicationLinks.length} homepage publication entries, found ${homepagePublicationEntries}`,
  );
}

for (const [needle, reason] of [
  ["2nd Prize", "unverified ordinal award claim"],
  ["Best Use Case of Solana", "superseded award wording"],
]) {
  const hit = [...projectFiles()].find((file) => read(file).includes(needle));
  if (hit) failures.push(`Found ${reason} in ${hit}: ${needle}`);
}

function* projectFiles() {
  yield "src/data/projects.ts";
  for (const slug of mdxFiles) yield `src/content/projects/${slug}.mdx`;
}

if (failures.length) {
  console.error("Content validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Content validation passed: ${uniqueProjectSlugs.size} projects, ${mdxFiles.length} MDX case studies, ${archived.size} archived slugs, ${featuredSlugs.length} flagships.`,
);
