import { describe, it, expect } from "vitest";
import {
  InstalledItemSchema,
  MachineSchema,
  RealtimeCommandSchema,
  SnapshotSchema,
  agentSupportsQueue,
  isFinalCommandStatus
} from "../src/schemas";

const baseItem = {
  id: "skill:global:/home/user/.agents/skills/data-visualization",
  machineId: "22222222-2222-2222-2222-222222222222",
  harnesses: ["claude_code", "codex"],
  kind: "skill",
  name: "data-visualization",
  enabled: true,
  path: "/home/user/.agents/skills/data-visualization",
  scope: "global",
  projectPath: null,
  sourceType: "manual",
  sourceRef: null,
  sourceSubdir: null,
  sourceCommit: null,
  contentBackupId: null,
  lastSyncedAt: "2026-09-02T00:00:00.000Z"
} as const;

describe("InstalledItemSchema", () => {
  it("accepts a valid global skill item with harnesses", () => {
    expect(InstalledItemSchema.parse(baseItem)).toEqual(baseItem);
  });

  it("reads a legacy tool field as harnesses of one", () => {
    const { harnesses: _harnesses, ...legacy } = baseItem;
    const parsed = InstalledItemSchema.parse({ ...legacy, tool: "codex" });
    expect(parsed.harnesses).toEqual(["codex"]);
    expect("tool" in parsed).toBe(false);
  });

  it("prefers harnesses when both harnesses and a legacy tool are present", () => {
    const parsed = InstalledItemSchema.parse({ ...baseItem, tool: "codex" });
    expect(parsed.harnesses).toEqual(["claude_code", "codex"]);
    expect("tool" in parsed).toBe(false);
  });

  it("keeps a git skill's repository subdirectory", () => {
    const parsed = InstalledItemSchema.parse({
      ...baseItem,
      sourceType: "git",
      sourceRef: "https://github.com/sslinNn/cc-limits",
      sourceSubdir: "skills/cc-limits"
    });
    expect(parsed.sourceSubdir).toBe("skills/cc-limits");
  });

  it("treats a missing subdirectory as null so older snapshots still parse", () => {
    const { sourceSubdir: _dropped, ...withoutSubdir } = baseItem;
    expect(InstalledItemSchema.parse(withoutSubdir).sourceSubdir).toBeNull();
  });

  it("rejects scope: project without a projectPath", () => {
    const item = {
      ...baseItem,
      kind: "mcp",
      name: "x",
      path: "/x",
      scope: "project",
      projectPath: null
    };
    expect(() => InstalledItemSchema.parse(item)).toThrow();
  });
});

describe("MachineSchema", () => {
  it("defaults presentHarnesses to empty when a machine has not reported them yet", () => {
    const parsed = MachineSchema.parse({
      id: "m1",
      userId: "u1",
      hostname: "studio",
      os: "linux",
      agentVersion: "0.1.0",
      pairedAt: "2026-01-01T00:00:00.000Z",
      lastSeenAt: "2026-01-01T00:00:00.000Z",
      status: "online"
    });
    expect(parsed.presentHarnesses).toEqual([]);
  });
});

describe("SnapshotSchema", () => {
  it("accepts a machine id plus a list of items", () => {
    const snap = { machineId: "22222222-2222-2222-2222-222222222222", items: [] };
    expect(SnapshotSchema.parse(snap)).toEqual(snap);
  });
});

describe("RealtimeCommandSchema install", () => {
  it("accepts an install command without a tool", () => {
    const parsed = RealtimeCommandSchema.parse({
      type: "install",
      kind: "skill",
      scope: "global",
      projectPath: null,
      sourceType: "git",
      sourceRef: "https://github.com/example/skill.git"
    });
    expect(parsed.type).toBe("install");
    if (parsed.type === "install") {
      expect(parsed).not.toHaveProperty("tool");
      expect(parsed.kind).toBe("skill");
    }
  });

  it("strips a leftover tool field on install rather than requiring it", () => {
    const parsed = RealtimeCommandSchema.parse({
      type: "install",
      tool: "claude_code",
      kind: "skill",
      scope: "global",
      projectPath: null,
      sourceType: "git",
      sourceRef: "https://github.com/example/skill.git"
    });
    expect(parsed.type).toBe("install");
    expect(parsed).not.toHaveProperty("tool");
  });
});

describe("sourceCommit", () => {
  const sha = "0123456789abcdef0123456789abcdef01234567";
  const install = {
    type: "install",
    kind: "skill",
    scope: "global",
    projectPath: null,
    sourceType: "git",
    sourceRef: "https://github.com/o/r"
  } as const;

  it("defaults to null on an item written before it existed", () => {
    const { sourceCommit: _omit, ...older } = baseItem;
    expect(InstalledItemSchema.parse(older).sourceCommit).toBeNull();
  });

  it("rides an install command when given, and is optional", () => {
    expect(RealtimeCommandSchema.parse({ ...install, sourceCommit: sha })).toMatchObject({ sourceCommit: sha });
    expect(RealtimeCommandSchema.safeParse(install).success).toBe(true);
  });

  it("refuses anything that is not a full commit id", () => {
    for (const bad of ["main", "HEAD", "0123456", `${sha}0`, "../../etc"]) {
      expect(RealtimeCommandSchema.safeParse({ ...install, sourceCommit: bad }).success, bad).toBe(false);
    }
  });
});

describe("command queue", () => {
  it("knows which agents read it", () => {
    expect(agentSupportsQueue("0.1.3")).toBe(false);
    expect(agentSupportsQueue("0.2.0")).toBe(true);
    expect(agentSupportsQueue("0.10.0")).toBe(true);
    expect(agentSupportsQueue("1.0.0-beta.1")).toBe(true);
    expect(agentSupportsQueue("unknown")).toBe(false);
  });

  it("tells final states from in-flight ones", () => {
    expect(isFinalCommandStatus("pending")).toBe(false);
    expect(isFinalCommandStatus("awaiting_approval")).toBe(false);
    expect(isFinalCommandStatus("denied")).toBe(true);
    expect(isFinalCommandStatus("expired")).toBe(true);
  });
});
