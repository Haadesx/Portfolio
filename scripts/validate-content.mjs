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

const furtherWorkMatch = curationSource.match(/export const furtherWorkSlugs = \[([^\]]+)\]/);
const furtherWork = furtherWorkMatch
  ? [...furtherWorkMatch[1].matchAll(/["']([^"']+)["']/g)].map((match) => match[1])
  : [];
const ossBlock = curationSource.split("export const openSourceHighlights")[1]?.split("export const archiveGroups")[0] ?? "";
if (!furtherWorkMatch) failures.push("Missing furtherWorkSlugs curation array");
if (!ossBlock) failures.push("Missing openSourceHighlights curation block");
const ossSlugs = [...ossBlock.matchAll(/slug:\s*["']([^"']+)["']/g)].map((match) => match[1]);
const repeated = furtherWork.filter((slug) => ossSlugs.includes(slug));
if (repeated.length) {
  failures.push(`Homepage project listings repeat between More engineering and Released work: ${repeated.join(", ")}`);
}
for (const slug of [...furtherWork, ...ossSlugs]) {
  if (!uniqueProjectSlugs.has(slug)) failures.push(`Homepage curation references unknown project slug: ${slug}`);
}

for (const path of [
  "src/app/(site)/page.tsx",
  "src/app/(site)/projects/page.tsx",
  "src/components/feature/FlagshipPanel.tsx",
  "src/components/feature/ProjectList.tsx",
]) {
  if (!existsSync(join(root, path))) failures.push(`Expected source file missing: ${path}`);
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
  `Content validation passed: ${uniqueProjectSlugs.size} projects, ${mdxFiles.length} MDX case studies, ${archived.size} archived slugs.`,
);
