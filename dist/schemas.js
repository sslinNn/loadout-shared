import { z } from "zod";
/** Known coding-agent harnesses Loadout can project skills/MCP onto. */
export const HARNESS_IDS = ["claude_code", "codex", "cursor", "gemini_cli", "copilot"];
export const HarnessSchema = z.enum(HARNESS_IDS);
export const KindSchema = z.enum(["skill", "mcp"]);
export const ScopeSchema = z.enum(["global", "project"]);
export const SourceTypeSchema = z.enum(["manual", "git", "npm", "marketplace"]);
/** A full 40-character git commit id. */
export const CommitShaSchema = z.string().regex(/^[0-9a-f]{40}$/, "expected a full 40-character commit id");
/**
 * Snapshot/restore used to send `{ tool: "codex" }`. New items send `harnesses`.
 * Prefer the array when both are present; otherwise lift the legacy scalar.
 */
function withHarnesses(raw) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw))
        return raw;
    const obj = { ...raw };
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
export const InstalledItemSchema = z.preprocess(withHarnesses, z
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
    // The exact commit a git install checked out. The install command's sourceCommit when
    // one was given (a reviewed listing pins one), otherwise whatever HEAD resolved to at
    // install time — so a restore reproduces the same files rather than today's branch.
    // Missing on older rows/snapshots.
    sourceCommit: CommitShaSchema.nullable().default(null),
    contentBackupId: z.string().nullable(),
    lastSyncedAt: z.string()
})
    .refine((v) => (v.scope === "project" ? v.projectPath !== null : true), {
    message: "projectPath is required when scope is 'project'",
    path: ["projectPath"]
}));
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
export const SnapshotSchema = z.object({
    machineId: z.string(),
    items: z.array(InstalledItemSchema)
});
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
        // Check out exactly this commit instead of the default branch. A marketplace listing
        // carries the commit its reviewer approved; installing anything else would install code
        // nobody reviewed. Agents older than 0.2.0 strip the field and install HEAD.
        sourceCommit: CommitShaSchema.nullish(),
        // Set when the install was triggered from a marketplace listing (see
        // apps/dashboard/lib/domain/listing.ts). The agent records it as an `installs`
        // row so the listing's install is attributable; omitted for a plain git/npm install
        // that didn't come from a listing.
        listingId: z.string().nullish()
    }),
    z.object({ type: z.literal("restore"), items: z.array(InstalledItemSchema) })
]);
/**
 * Lifecycle of a queued command (`machine_commands`). Broadcasts are fire-and-forget and
 * lost when the agent is offline; a queued command waits for it and reports back.
 *
 *   pending ──claim──▶ running ──▶ awaiting_approval ──▶ done | failed | denied
 *      │                                       (local confirmation, if the action needs one)
 *      ├──▶ cancelled   (by the dashboard, while still pending)
 *      └──▶ expired     (not picked up before expires_at)
 */
export const MACHINE_COMMAND_STATUSES = [
    "pending",
    "running",
    "awaiting_approval",
    "done",
    "failed",
    "denied",
    "expired",
    "cancelled"
];
export const MachineCommandStatusSchema = z.enum(MACHINE_COMMAND_STATUSES);
/** A status nothing will move on from. */
export function isFinalCommandStatus(status) {
    return status === "done" || status === "failed" || status === "denied" || status === "expired" || status === "cancelled";
}
export const MachineCommandSchema = z.object({
    id: z.string(),
    machineId: z.string(),
    command: RealtimeCommandSchema,
    status: MachineCommandStatusSchema,
    /** Why it failed or was denied, or a short note on what it did. */
    detail: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    expiresAt: z.string()
});
/**
 * The first agent release that drains `machine_commands`. Older agents only listen for
 * broadcasts, so the dashboard keeps broadcasting to them (and keeps their controls disabled
 * while they are offline).
 */
export const QUEUE_MIN_AGENT_VERSION = "0.2.0";
function versionParts(version) {
    const match = /^(\d+)\.(\d+)\.(\d+)/.exec(version.trim());
    return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
}
/** Whether an agent reporting `agentVersion` reads the command queue. Unknown versions do not. */
export function agentSupportsQueue(agentVersion) {
    const have = versionParts(agentVersion);
    const need = versionParts(QUEUE_MIN_AGENT_VERSION);
    if (!have)
        return false;
    for (let i = 0; i < 3; i += 1) {
        if (have[i] !== need[i])
            return have[i] > need[i];
    }
    return true;
}
