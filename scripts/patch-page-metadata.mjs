import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function routePathFromFile(file) {
  const rel = file.replace(/^app\//, "").replace(/\/page\.tsx$/, "");
  if (!rel) return "/";
  if (rel.includes("[id]")) return null;
  return `/${rel}`;
}

function cleanTitle(title) {
  return title
    .replace(/\s*\|\s*Berkshire Hathaway HomeServices[^|]*/gi, "")
    .replace(/^Berkshire Hathaway HomeServices\s+/gi, "")
    .replace(/\s*\|\s*BHHS[^|]*/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function patchFile(file) {
  const routePath = routePathFromFile(file);
  if (!routePath) return false;

  let content = fs.readFileSync(path.join(root, file), "utf8");
  if (!content.includes("export const metadata")) return false;

  if (!content.includes("buildPageMetadata")) {
    if (content.includes('import type { Metadata } from "next";')) {
      content = content.replace(
        'import type { Metadata } from "next";',
        'import { buildPageMetadata } from "@/lib/seo/metadata";'
      );
    } else {
      content = `import { buildPageMetadata } from "@/lib/seo/metadata";\n${content}`;
    }
  }

  content = content.replace(
    /export const metadata: Metadata = \{/,
    `export const metadata = buildPageMetadata({\n  path: "${routePath}",`
  );

  content = content.replace(
    /export const metadata = buildPageMetadata\(\{\n  path: "[^"]+",\n  path: "[^"]+",/g,
    (m) => m.replace(/\n  path: "[^"]+",$/, "")
  );

  const metaStart = content.indexOf("export const metadata = buildPageMetadata({");
  if (metaStart === -1) return false;
  const afterStart = content.slice(metaStart);
  const closeIdx = afterStart.indexOf("\n};");
  if (closeIdx === -1) return false;
  const before = content.slice(0, metaStart);
  const metaBlock = afterStart.slice(0, closeIdx + 1);
  const after = afterStart.slice(closeIdx + 1);

  let updatedMeta = metaBlock.replace(/\n};$/, "\n});");
  updatedMeta = updatedMeta.replace(
    /title:\s*"([^"]*)"/,
    (_, t) => `title: "${cleanTitle(t)}"`
  );

  content = before + updatedMeta + after;
  fs.writeFileSync(path.join(root, file), content);
  return true;
}

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (ent.name === "page.tsx") acc.push(p.replace(`${root}/`, ""));
  }
  return acc;
}

const files = walk(path.join(root, "app"));
let count = 0;
for (const f of files) {
  if (patchFile(f)) count++;
}
console.log(`Patched metadata in ${count} page(s)`);
