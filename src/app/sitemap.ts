import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.initvaresh.com";
  return ["", "/about", "/projects", "/research", "/contact", "/chat", ...projects.map((project) => `/projects/${project.slug}`)]
    .map((path) => ({ url: `${base}${path}` }));
}
