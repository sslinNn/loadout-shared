import { z } from "zod";

/** Known coding-agent harnesses Loadout can project skills/MCP onto. */
export const HARNESS_IDS = ["claude_code", "codex", "cursor", "gemini_cli", "copilot"] as const;
export const HarnessSchema = z.enum(HARNESS_IDS);
export type HarnessId = (typeof HARNESS_IDS)[number];

export const KindSchema = z.enum(["skill", "mcp"]);
export const ScopeSchema = z.enum(["global", "project"]);
export const SourceTypeSchema = z.enum(["manual", "git", "npm", "marketplace"]);

/**
 * Snapshot/restore used to send `{ tool: "codex" }`. New items send `harnesses`.
 * Prefer the array when both are present; otherwise lift the legacy scalar.
 */
function withHarnesses(raw: unknown): unknown {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return raw;
  const obj = { ...(raw as Record<string, unknown>) };
  if (Array.isArray(obj.harnesses)) {
    delete obj.tool;
    return obj;
  }
  if (typeof obj.tool === "string") {
    obj.harnesses = [obj.tool];
    delete obj.tool;
  }
  return obj;
}

export const InstalledItemSchema = z.preprocess(
  withHarnesses,
  z
    .object({
      id: z.string(),
      machineId: z.string(),
      harnesses: z.array(z.string()),
      kind: KindSchema,
      name: z.string().min(1),
      enabled: z.boolean(),
      path: z.string().min(1),
      scope: ScopeSchema,
      projectPath: z.string().nullable(),
      sourceType: SourceTypeSchema,
      sourceRef: z.string().nullable(),
      // Same meaning as the install command's sourceSubdir: where the skill lives inside
      // a git repo (`skills/<name>/`). Scanners cannot observe this on disk; install writes
      // it, snapshot upsert keeps it, restore reads it. Missing on older rows/snapshots.
      sourceSubdir: z.string().nullable().default(null),
      contentBackupId: z.string().nullable(),
      lastSyncedAt: z.string()
    })
    .refine((v) => (v.scope === "project" ? v.projectPath !== null : true), {
      message: "projectPath is required when scope is 'project'",
      path: ["projectPath"]
    })
);

export type InstalledItem = z.infer<typeof InstalledItemSchema>;

export const MachineSchema = z.object({
  id: z.string(),
  userId: z.string(),
  hostname: z.string(),
  os: z.string(),
  agentVersion: z.string(),
  pairedAt: z.string(),
  lastSeenAt: z.string(),
  status: z.enum(["online", "offline"]),
  /** Harnesses whose config directory is present on this machine. Empty means unknown. */
  presentHarnesses: z.array(z.string()).default([])
});
export type Machine = z.infer<typeof MachineSchema>;

export const SnapshotSchema = z.object({
  machineId: z.string(),
  items: z.array(InstalledItemSchema)
});
export type Snapshot = z.infer<typeof SnapshotSchema>;

export const RealtimeCommandSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("toggle"), itemId: z.string(), enabled: z.boolean() }),
  z.object({ type: z.literal("remove"), itemId: z.string() }),
  z.object({
    type: z.literal("install"),
    kind: KindSchema,
    scope: ScopeSchema,
    projectPath: z.string().nullable(),
    sourceType: SourceTypeSchema,
    sourceRef: z.string(),
    // Where the skill lives INSIDE the repository, when the repository is not itself a
    // bare skill directory. Skills in the wild ship inside plugins (`skills/<name>/`),
    // and the scanners only report a directory that has its own SKILL.md — so without
    // this, only a repo whose root is a skill could ever be installed. Relative to the
    // repository root; null/omitted means "the root is the skill".
    sourceSubdir: z.string().nullish(),
    // Set when the install was triggered from a marketplace listing (see
    // apps/dashboard/lib/domain/listing.ts). The agent records it as an `installs`
    // row so the listing's install is attributable; omitted for a plain git/npm install
    // that didn't come from a listing.
    listingId: z.string().nullish()
  }),
  z.object({ type: z.literal("restore"), items: z.array(InstalledItemSchema) })
]);
export type RealtimeCommand = z.infer<typeof RealtimeCommandSchema>;
