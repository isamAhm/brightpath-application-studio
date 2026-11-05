export const pageMeta = (title: string, description: string) => ({
  meta: [
    { title: `${title} — ApplyPilot` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — ApplyPilot` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ],
});
