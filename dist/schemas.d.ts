import { z } from "zod";
/** Known coding-agent harnesses Loadout can project skills/MCP onto. */
export declare const HARNESS_IDS: readonly ["claude_code", "codex", "cursor", "gemini_cli", "copilot"];
export declare const HarnessSchema: z.ZodEnum<["claude_code", "codex", "cursor", "gemini_cli", "copilot"]>;
export type HarnessId = (typeof HARNESS_IDS)[number];
export declare const KindSchema: z.ZodEnum<["skill", "mcp"]>;
export declare const ScopeSchema: z.ZodEnum<["global", "project"]>;
export declare const SourceTypeSchema: z.ZodEnum<["manual", "git", "npm", "marketplace"]>;
/** A full 40-character git commit id. */
export declare const CommitShaSchema: z.ZodString;
export declare const InstalledItemSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    machineId: z.ZodString;
    harnesses: z.ZodArray<z.ZodString, "many">;
    kind: z.ZodEnum<["skill", "mcp"]>;
    name: z.ZodString;
    enabled: z.ZodBoolean;
    path: z.ZodString;
    scope: z.ZodEnum<["global", "project"]>;
    projectPath: z.ZodNullable<z.ZodString>;
    sourceType: z.ZodEnum<["manual", "git", "npm", "marketplace"]>;
    sourceRef: z.ZodNullable<z.ZodString>;
    sourceSubdir: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    sourceCommit: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    contentBackupId: z.ZodNullable<z.ZodString>;
    lastSyncedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    harnesses: string[];
    id: string;
    machineId: string;
    path: string;
    kind: "skill" | "mcp";
    name: string;
    enabled: boolean;
    scope: "global" | "project";
    projectPath: string | null;
    sourceType: "manual" | "git" | "npm" | "marketplace";
    sourceRef: string | null;
    sourceSubdir: string | null;
    sourceCommit: string | null;
    contentBackupId: string | null;
    lastSyncedAt: string;
}, {
    harnesses: string[];
    id: string;
    machineId: string;
    path: string;
    kind: "skill" | "mcp";
    name: string;
    enabled: boolean;
    scope: "global" | "project";
    projectPath: string | null;
    sourceType: "manual" | "git" | "npm" | "marketplace";
    sourceRef: string | null;
    contentBackupId: string | null;
    lastSyncedAt: string;
    sourceSubdir?: string | null | undefined;
    sourceCommit?: string | null | undefined;
}>, {
    harnesses: string[];
    id: string;
    machineId: string;
    path: string;
    kind: "skill" | "mcp";
    name: string;
    enabled: boolean;
    scope: "global" | "project";
    projectPath: string | null;
    sourceType: "manual" | "git" | "npm" | "marketplace";
    sourceRef: string | null;
    sourceSubdir: string | null;
    sourceCommit: string | null;
    contentBackupId: string | null;
    lastSyncedAt: string;
}, {
    harnesses: string[];
    id: string;
    machineId: string;
    path: string;
    kind: "skill" | "mcp";
    name: string;
    enabled: boolean;
    scope: "global" | "project";
    projectPath: string | null;
    sourceType: "manual" | "git" | "npm" | "marketplace";
    sourceRef: string | null;
    contentBackupId: string | null;
    lastSyncedAt: string;
    sourceSubdir?: string | null | undefined;
    sourceCommit?: string | null | undefined;
}>, {
    harnesses: string[];
    id: string;
    machineId: string;
    path: string;
    kind: "skill" | "mcp";
    name: string;
    enabled: boolean;
    scope: "global" | "project";
    projectPath: string | null;
    sourceType: "manual" | "git" | "npm" | "marketplace";
    sourceRef: string | null;
    sourceSubdir: string | null;
    sourceCommit: string | null;
    contentBackupId: string | null;
    lastSyncedAt: string;
}, unknown>;
export type InstalledItem = z.infer<typeof InstalledItemSchema>;
export declare const MachineSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    hostname: z.ZodString;
    os: z.ZodString;
    agentVersion: z.ZodString;
    pairedAt: z.ZodString;
    lastSeenAt: z.ZodString;
    status: z.ZodEnum<["online", "offline"]>;
    /** Harnesses whose config directory is present on this machine. Empty means unknown. */
    presentHarnesses: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "online" | "offline";
    userId: string;
    hostname: string;
    os: string;
    agentVersion: string;
    pairedAt: string;
    lastSeenAt: string;
    presentHarnesses: string[];
}, {
    id: string;
    status: "online" | "offline";
    userId: string;
    hostname: string;
    os: string;
    agentVersion: string;
    pairedAt: string;
    lastSeenAt: string;
    presentHarnesses?: string[] | undefined;
}>;
export type Machine = z.infer<typeof MachineSchema>;
export declare const SnapshotSchema: z.ZodObject<{
    machineId: z.ZodString;
    items: z.ZodArray<z.ZodEffects<z.ZodEffects<z.ZodObject<{
        id: z.ZodString;
        machineId: z.ZodString;
        harnesses: z.ZodArray<z.ZodString, "many">;
        kind: z.ZodEnum<["skill", "mcp"]>;
        name: z.ZodString;
        enabled: z.ZodBoolean;
        path: z.ZodString;
        scope: z.ZodEnum<["global", "project"]>;
        projectPath: z.ZodNullable<z.ZodString>;
        sourceType: z.ZodEnum<["manual", "git", "npm", "marketplace"]>;
        sourceRef: z.ZodNullable<z.ZodString>;
        sourceSubdir: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        sourceCommit: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        contentBackupId: z.ZodNullable<z.ZodString>;
        lastSyncedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        harnesses: string[];
        id: string;
        machineId: string;
        path: string;
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        sourceSubdir: string | null;
        sourceCommit: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }, {
        harnesses: string[];
        id: string;
        machineId: string;
        path: string;
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
        sourceSubdir?: string | null | undefined;
        sourceCommit?: string | null | undefined;
    }>, {
        harnesses: string[];
        id: string;
        machineId: string;
        path: string;
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        sourceSubdir: string | null;
        sourceCommit: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }, {
        harnesses: string[];
        id: string;
        machineId: string;
        path: string;
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
        sourceSubdir?: string | null | undefined;
        sourceCommit?: string | null | undefined;
    }>, {
        harnesses: string[];
        id: string;
        machineId: string;
        path: string;
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        sourceSubdir: string | null;
        sourceCommit: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }, unknown>, "many">;
}, "strip", z.ZodTypeAny, {
    machineId: string;
    items: {
        harnesses: string[];
        id: string;
        machineId: string;
        path: string;
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        sourceSubdir: string | null;
        sourceCommit: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }[];
}, {
    machineId: string;
    items: unknown[];
}>;
export type Snapshot = z.infer<typeof SnapshotSchema>;
export declare const RealtimeCommandSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"toggle">;
    itemId: z.ZodString;
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    type: "toggle";
    enabled: boolean;
    itemId: string;
}, {
    type: "toggle";
    enabled: boolean;
    itemId: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"remove">;
    itemId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "remove";
    itemId: string;
}, {
    type: "remove";
    itemId: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"install">;
    kind: z.ZodEnum<["skill", "mcp"]>;
    scope: z.ZodEnum<["global", "project"]>;
    projectPath: z.ZodNullable<z.ZodString>;
    sourceType: z.ZodEnum<["manual", "git", "npm", "marketplace"]>;
    sourceRef: z.ZodString;
    sourceSubdir: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sourceCommit: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    listingId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    type: "install";
    kind: "skill" | "mcp";
    scope: "global" | "project";
    projectPath: string | null;
    sourceType: "manual" | "git" | "npm" | "marketplace";
    sourceRef: string;
    sourceSubdir?: string | null | undefined;
    sourceCommit?: string | null | undefined;
    listingId?: string | null | undefined;
}, {
    type: "install";
    kind: "skill" | "mcp";
    scope: "global" | "project";
    projectPath: string | null;
    sourceType: "manual" | "git" | "npm" | "marketplace";
    sourceRef: string;
    sourceSubdir?: string | null | undefined;
    sourceCommit?: string | null | undefined;
    listingId?: string | null | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"restore">;
    items: z.ZodArray<z.ZodEffects<z.ZodEffects<z.ZodObject<{
        id: z.ZodString;
        machineId: z.ZodString;
        harnesses: z.ZodArray<z.ZodString, "many">;
        kind: z.ZodEnum<["skill", "mcp"]>;
        name: z.ZodString;
        enabled: z.ZodBoolean;
        path: z.ZodString;
        scope: z.ZodEnum<["global", "project"]>;
        projectPath: z.ZodNullable<z.ZodString>;
        sourceType: z.ZodEnum<["manual", "git", "npm", "marketplace"]>;
        sourceRef: z.ZodNullable<z.ZodString>;
        sourceSubdir: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        sourceCommit: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        contentBackupId: z.ZodNullable<z.ZodString>;
        lastSyncedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        harnesses: string[];
        id: string;
        machineId: string;
        path: string;
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        sourceSubdir: string | null;
        sourceCommit: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }, {
        harnesses: string[];
        id: string;
        machineId: string;
        path: string;
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
        sourceSubdir?: string | null | undefined;
        sourceCommit?: string | null | undefined;
    }>, {
        harnesses: string[];
        id: string;
        machineId: string;
        path: string;
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        sourceSubdir: string | null;
        sourceCommit: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }, {
        harnesses: string[];
        id: string;
        machineId: string;
        path: string;
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
        sourceSubdir?: string | null | undefined;
        sourceCommit?: string | null | undefined;
    }>, {
        harnesses: string[];
        id: string;
        machineId: string;
        path: string;
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        sourceSubdir: string | null;
        sourceCommit: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }, unknown>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "restore";
    items: {
        harnesses: string[];
        id: string;
        machineId: string;
        path: string;
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        sourceSubdir: string | null;
        sourceCommit: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }[];
}, {
    type: "restore";
    items: unknown[];
}>]>;
export type RealtimeCommand = z.infer<typeof RealtimeCommandSchema>;
/**
 * Lifecycle of a queued command (`machine_commands`). Broadcasts are fire-and-forget and
 * lost when the agent is offline; a queued command waits for it and reports back.
 *
 *   pending ──claim──▶ running ──▶ awaiting_approval ──▶ done | failed | denied
 *      │                                       (local confirmation, if the action needs one)
 *      ├──▶ cancelled   (by the dashboard, while still pending)
 *      └──▶ expired     (not picked up before expires_at)
 */
export declare const MACHINE_COMMAND_STATUSES: readonly ["pending", "running", "awaiting_approval", "done", "failed", "denied", "expired", "cancelled"];
export declare const MachineCommandStatusSchema: z.ZodEnum<["pending", "running", "awaiting_approval", "done", "failed", "denied", "expired", "cancelled"]>;
export type MachineCommandStatus = z.infer<typeof MachineCommandStatusSchema>;
/** A status nothing will move on from. */
export declare function isFinalCommandStatus(status: MachineCommandStatus): boolean;
export declare const MachineCommandSchema: z.ZodObject<{
    id: z.ZodString;
    machineId: z.ZodString;
    command: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"toggle">;
        itemId: z.ZodString;
        enabled: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        type: "toggle";
        enabled: boolean;
        itemId: string;
    }, {
        type: "toggle";
        enabled: boolean;
        itemId: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"remove">;
        itemId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "remove";
        itemId: string;
    }, {
        type: "remove";
        itemId: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"install">;
        kind: z.ZodEnum<["skill", "mcp"]>;
        scope: z.ZodEnum<["global", "project"]>;
        projectPath: z.ZodNullable<z.ZodString>;
        sourceType: z.ZodEnum<["manual", "git", "npm", "marketplace"]>;
        sourceRef: z.ZodString;
        sourceSubdir: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sourceCommit: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        listingId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        type: "install";
        kind: "skill" | "mcp";
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string;
        sourceSubdir?: string | null | undefined;
        sourceCommit?: string | null | undefined;
        listingId?: string | null | undefined;
    }, {
        type: "install";
        kind: "skill" | "mcp";
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string;
        sourceSubdir?: string | null | undefined;
        sourceCommit?: string | null | undefined;
        listingId?: string | null | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"restore">;
        items: z.ZodArray<z.ZodEffects<z.ZodEffects<z.ZodObject<{
            id: z.ZodString;
            machineId: z.ZodString;
            harnesses: z.ZodArray<z.ZodString, "many">;
            kind: z.ZodEnum<["skill", "mcp"]>;
            name: z.ZodString;
            enabled: z.ZodBoolean;
            path: z.ZodString;
            scope: z.ZodEnum<["global", "project"]>;
            projectPath: z.ZodNullable<z.ZodString>;
            sourceType: z.ZodEnum<["manual", "git", "npm", "marketplace"]>;
            sourceRef: z.ZodNullable<z.ZodString>;
            sourceSubdir: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            sourceCommit: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            contentBackupId: z.ZodNullable<z.ZodString>;
            lastSyncedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            harnesses: string[];
            id: string;
            machineId: string;
            path: string;
            kind: "skill" | "mcp";
            name: string;
            enabled: boolean;
            scope: "global" | "project";
            projectPath: string | null;
            sourceType: "manual" | "git" | "npm" | "marketplace";
            sourceRef: string | null;
            sourceSubdir: string | null;
            sourceCommit: string | null;
            contentBackupId: string | null;
            lastSyncedAt: string;
        }, {
            harnesses: string[];
            id: string;
            machineId: string;
            path: string;
            kind: "skill" | "mcp";
            name: string;
            enabled: boolean;
            scope: "global" | "project";
            projectPath: string | null;
            sourceType: "manual" | "git" | "npm" | "marketplace";
            sourceRef: string | null;
            contentBackupId: string | null;
            lastSyncedAt: string;
            sourceSubdir?: string | null | undefined;
            sourceCommit?: string | null | undefined;
        }>, {
            harnesses: string[];
            id: string;
            machineId: string;
            path: string;
            kind: "skill" | "mcp";
            name: string;
            enabled: boolean;
            scope: "global" | "project";
            projectPath: string | null;
            sourceType: "manual" | "git" | "npm" | "marketplace";
            sourceRef: string | null;
            sourceSubdir: string | null;
            sourceCommit: string | null;
            contentBackupId: string | null;
            lastSyncedAt: string;
        }, {
            harnesses: string[];
            id: string;
            machineId: string;
            path: string;
            kind: "skill" | "mcp";
            name: string;
            enabled: boolean;
            scope: "global" | "project";
            projectPath: string | null;
            sourceType: "manual" | "git" | "npm" | "marketplace";
            sourceRef: string | null;
            contentBackupId: string | null;
            lastSyncedAt: string;
            sourceSubdir?: string | null | undefined;
            sourceCommit?: string | null | undefined;
        }>, {
            harnesses: string[];
            id: string;
            machineId: string;
            path: string;
            kind: "skill" | "mcp";
            name: string;
            enabled: boolean;
            scope: "global" | "project";
            projectPath: string | null;
            sourceType: "manual" | "git" | "npm" | "marketplace";
            sourceRef: string | null;
            sourceSubdir: string | null;
            sourceCommit: string | null;
            contentBackupId: string | null;
            lastSyncedAt: string;
        }, unknown>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "restore";
        items: {
            harnesses: string[];
            id: string;
            machineId: string;
            path: string;
            kind: "skill" | "mcp";
            name: string;
            enabled: boolean;
            scope: "global" | "project";
            projectPath: string | null;
            sourceType: "manual" | "git" | "npm" | "marketplace";
            sourceRef: string | null;
            sourceSubdir: string | null;
            sourceCommit: string | null;
            contentBackupId: string | null;
            lastSyncedAt: string;
        }[];
    }, {
        type: "restore";
        items: unknown[];
    }>]>;
    status: z.ZodEnum<["pending", "running", "awaiting_approval", "done", "failed", "denied", "expired", "cancelled"]>;
    /** Why it failed or was denied, or a short note on what it did. */
    detail: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    expiresAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    machineId: string;
    status: "pending" | "running" | "awaiting_approval" | "done" | "failed" | "denied" | "expired" | "cancelled";
    command: {
        type: "toggle";
        enabled: boolean;
        itemId: string;
    } | {
        type: "remove";
        itemId: string;
    } | {
        type: "install";
        kind: "skill" | "mcp";
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string;
        sourceSubdir?: string | null | undefined;
        sourceCommit?: string | null | undefined;
        listingId?: string | null | undefined;
    } | {
        type: "restore";
        items: {
            harnesses: string[];
            id: string;
            machineId: string;
            path: string;
            kind: "skill" | "mcp";
            name: string;
            enabled: boolean;
            scope: "global" | "project";
            projectPath: string | null;
            sourceType: "manual" | "git" | "npm" | "marketplace";
            sourceRef: string | null;
            sourceSubdir: string | null;
            sourceCommit: string | null;
            contentBackupId: string | null;
            lastSyncedAt: string;
        }[];
    };
    detail: string | null;
    createdAt: string;
    updatedAt: string;
    expiresAt: string;
}, {
    id: string;
    machineId: string;
    status: "pending" | "running" | "awaiting_approval" | "done" | "failed" | "denied" | "expired" | "cancelled";
    command: {
        type: "toggle";
        enabled: boolean;
        itemId: string;
    } | {
        type: "remove";
        itemId: string;
    } | {
        type: "install";
        kind: "skill" | "mcp";
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string;
        sourceSubdir?: string | null | undefined;
        sourceCommit?: string | null | undefined;
        listingId?: string | null | undefined;
    } | {
        type: "restore";
        items: unknown[];
    };
    detail: string | null;
    createdAt: string;
    updatedAt: string;
    expiresAt: string;
}>;
export type MachineCommand = z.infer<typeof MachineCommandSchema>;
/**
 * The first agent release that drains `machine_commands`. Older agents only listen for
 * broadcasts, so the dashboard keeps broadcasting to them (and keeps their controls disabled
 * while they are offline).
 */
export declare const QUEUE_MIN_AGENT_VERSION = "0.2.0";
/** Whether an agent reporting `agentVersion` reads the command queue. Unknown versions do not. */
export declare function agentSupportsQueue(agentVersion: string): boolean;
