import { z } from "zod";
export declare const ToolSchema: z.ZodEnum<["claude_code", "codex"]>;
export declare const KindSchema: z.ZodEnum<["skill", "mcp"]>;
export declare const ScopeSchema: z.ZodEnum<["global", "project"]>;
export declare const SourceTypeSchema: z.ZodEnum<["manual", "git", "npm", "marketplace"]>;
export declare const InstalledItemSchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    machineId: z.ZodString;
    tool: z.ZodEnum<["claude_code", "codex"]>;
    kind: z.ZodEnum<["skill", "mcp"]>;
    name: z.ZodString;
    enabled: z.ZodBoolean;
    path: z.ZodString;
    scope: z.ZodEnum<["global", "project"]>;
    projectPath: z.ZodNullable<z.ZodString>;
    sourceType: z.ZodEnum<["manual", "git", "npm", "marketplace"]>;
    sourceRef: z.ZodNullable<z.ZodString>;
    contentBackupId: z.ZodNullable<z.ZodString>;
    lastSyncedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    machineId: string;
    tool: "claude_code" | "codex";
    kind: "skill" | "mcp";
    name: string;
    enabled: boolean;
    path: string;
    scope: "global" | "project";
    projectPath: string | null;
    sourceType: "manual" | "git" | "npm" | "marketplace";
    sourceRef: string | null;
    contentBackupId: string | null;
    lastSyncedAt: string;
}, {
    id: string;
    machineId: string;
    tool: "claude_code" | "codex";
    kind: "skill" | "mcp";
    name: string;
    enabled: boolean;
    path: string;
    scope: "global" | "project";
    projectPath: string | null;
    sourceType: "manual" | "git" | "npm" | "marketplace";
    sourceRef: string | null;
    contentBackupId: string | null;
    lastSyncedAt: string;
}>, {
    id: string;
    machineId: string;
    tool: "claude_code" | "codex";
    kind: "skill" | "mcp";
    name: string;
    enabled: boolean;
    path: string;
    scope: "global" | "project";
    projectPath: string | null;
    sourceType: "manual" | "git" | "npm" | "marketplace";
    sourceRef: string | null;
    contentBackupId: string | null;
    lastSyncedAt: string;
}, {
    id: string;
    machineId: string;
    tool: "claude_code" | "codex";
    kind: "skill" | "mcp";
    name: string;
    enabled: boolean;
    path: string;
    scope: "global" | "project";
    projectPath: string | null;
    sourceType: "manual" | "git" | "npm" | "marketplace";
    sourceRef: string | null;
    contentBackupId: string | null;
    lastSyncedAt: string;
}>;
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
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "online" | "offline";
    userId: string;
    hostname: string;
    os: string;
    agentVersion: string;
    pairedAt: string;
    lastSeenAt: string;
}, {
    id: string;
    status: "online" | "offline";
    userId: string;
    hostname: string;
    os: string;
    agentVersion: string;
    pairedAt: string;
    lastSeenAt: string;
}>;
export type Machine = z.infer<typeof MachineSchema>;
export declare const SnapshotSchema: z.ZodObject<{
    machineId: z.ZodString;
    items: z.ZodArray<z.ZodEffects<z.ZodObject<{
        id: z.ZodString;
        machineId: z.ZodString;
        tool: z.ZodEnum<["claude_code", "codex"]>;
        kind: z.ZodEnum<["skill", "mcp"]>;
        name: z.ZodString;
        enabled: z.ZodBoolean;
        path: z.ZodString;
        scope: z.ZodEnum<["global", "project"]>;
        projectPath: z.ZodNullable<z.ZodString>;
        sourceType: z.ZodEnum<["manual", "git", "npm", "marketplace"]>;
        sourceRef: z.ZodNullable<z.ZodString>;
        contentBackupId: z.ZodNullable<z.ZodString>;
        lastSyncedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        machineId: string;
        tool: "claude_code" | "codex";
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        path: string;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }, {
        id: string;
        machineId: string;
        tool: "claude_code" | "codex";
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        path: string;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }>, {
        id: string;
        machineId: string;
        tool: "claude_code" | "codex";
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        path: string;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }, {
        id: string;
        machineId: string;
        tool: "claude_code" | "codex";
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        path: string;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    machineId: string;
    items: {
        id: string;
        machineId: string;
        tool: "claude_code" | "codex";
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        path: string;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }[];
}, {
    machineId: string;
    items: {
        id: string;
        machineId: string;
        tool: "claude_code" | "codex";
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        path: string;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }[];
}>;
export type Snapshot = z.infer<typeof SnapshotSchema>;
export declare const RealtimeCommandSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"toggle">;
    itemId: z.ZodString;
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    type: "toggle";
    itemId: string;
}, {
    enabled: boolean;
    type: "toggle";
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
    tool: z.ZodEnum<["claude_code", "codex"]>;
    kind: z.ZodEnum<["skill", "mcp"]>;
    scope: z.ZodEnum<["global", "project"]>;
    projectPath: z.ZodNullable<z.ZodString>;
    sourceType: z.ZodEnum<["manual", "git", "npm", "marketplace"]>;
    sourceRef: z.ZodString;
    sourceSubdir: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    listingId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    tool: "claude_code" | "codex";
    kind: "skill" | "mcp";
    scope: "global" | "project";
    projectPath: string | null;
    sourceType: "manual" | "git" | "npm" | "marketplace";
    sourceRef: string;
    type: "install";
    sourceSubdir?: string | null | undefined;
    listingId?: string | null | undefined;
}, {
    tool: "claude_code" | "codex";
    kind: "skill" | "mcp";
    scope: "global" | "project";
    projectPath: string | null;
    sourceType: "manual" | "git" | "npm" | "marketplace";
    sourceRef: string;
    type: "install";
    sourceSubdir?: string | null | undefined;
    listingId?: string | null | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"restore">;
    items: z.ZodArray<z.ZodEffects<z.ZodObject<{
        id: z.ZodString;
        machineId: z.ZodString;
        tool: z.ZodEnum<["claude_code", "codex"]>;
        kind: z.ZodEnum<["skill", "mcp"]>;
        name: z.ZodString;
        enabled: z.ZodBoolean;
        path: z.ZodString;
        scope: z.ZodEnum<["global", "project"]>;
        projectPath: z.ZodNullable<z.ZodString>;
        sourceType: z.ZodEnum<["manual", "git", "npm", "marketplace"]>;
        sourceRef: z.ZodNullable<z.ZodString>;
        contentBackupId: z.ZodNullable<z.ZodString>;
        lastSyncedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        machineId: string;
        tool: "claude_code" | "codex";
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        path: string;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }, {
        id: string;
        machineId: string;
        tool: "claude_code" | "codex";
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        path: string;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }>, {
        id: string;
        machineId: string;
        tool: "claude_code" | "codex";
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        path: string;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }, {
        id: string;
        machineId: string;
        tool: "claude_code" | "codex";
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        path: string;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "restore";
    items: {
        id: string;
        machineId: string;
        tool: "claude_code" | "codex";
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        path: string;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }[];
}, {
    type: "restore";
    items: {
        id: string;
        machineId: string;
        tool: "claude_code" | "codex";
        kind: "skill" | "mcp";
        name: string;
        enabled: boolean;
        path: string;
        scope: "global" | "project";
        projectPath: string | null;
        sourceType: "manual" | "git" | "npm" | "marketplace";
        sourceRef: string | null;
        contentBackupId: string | null;
        lastSyncedAt: string;
    }[];
}>]>;
export type RealtimeCommand = z.infer<typeof RealtimeCommandSchema>;
