export type McpCatalogItem = {
  slug: string;
  name: string;
  description: string;
  provider: "smithery";
  source: "SMITHERY";
  mcpUrl: string;
  smitheryServerKey: string;
  authType: "oauth" | "api_key" | "none";
  categories: string[];
  verified: boolean;
  toolCount: number;
};

export const curatedMcpCatalog: McpCatalogItem[] = [
  {
    slug: "github",
    name: "GitHub",
    description: "Search repositories, inspect issues, and work with pull requests.",
    provider: "smithery",
    source: "SMITHERY",
    mcpUrl: "https://server.smithery.ai/github",
    smitheryServerKey: "github",
    authType: "oauth",
    categories: ["Developer tools", "Source control"],
    verified: true,
    toolCount: 0,
  },
  {
    slug: "slack",
    name: "Slack",
    description: "Read channels, search messages, and send team updates.",
    provider: "smithery",
    source: "SMITHERY",
    mcpUrl: "https://server.smithery.ai/slack",
    smitheryServerKey: "slack",
    authType: "oauth",
    categories: ["Communication"],
    verified: true,
    toolCount: 0,
  },
  {
    slug: "notion",
    name: "Notion",
    description: "Find pages, read workspace knowledge, and create structured notes.",
    provider: "smithery",
    source: "SMITHERY",
    mcpUrl: "https://server.smithery.ai/notion",
    smitheryServerKey: "notion",
    authType: "oauth",
    categories: ["Knowledge base", "Productivity"],
    verified: true,
    toolCount: 0,
  },
  {
    slug: "google-drive",
    name: "Google Drive",
    description: "Search files, read documents, and retrieve workspace context.",
    provider: "smithery",
    source: "SMITHERY",
    mcpUrl: "https://server.smithery.ai/googledrive",
    smitheryServerKey: "googledrive",
    authType: "oauth",
    categories: ["Knowledge base", "Documents"],
    verified: true,
    toolCount: 0,
  },
];

export const findCuratedMcp = (slug: string) =>
  curatedMcpCatalog.find((item) => item.slug === slug);
