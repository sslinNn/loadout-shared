import { describe, it, expect } from "vitest";
import { toInstalledItem, toInstalledItemRow, toMachine, toMachineCommand } from "../src/rows";
import type { InstalledItem } from "../src/schemas";

const item: InstalledItem = {
  id: "skill:global:/home/u/.agents/skills/a",
  machineId: "m1",
  harnesses: ["cursor", "codex"],
  kind: "skill",
  name: "a",
  enabled: true,
  path: "/home/u/.agents/skills/a",
  scope: "global",
  projectPath: null,
  sourceType: "manual",
  sourceRef: null,
  sourceSubdir: null,
  sourceCommit: null,
  contentBackupId: null,
  lastSyncedAt: "2026-01-01T00:00:00.000Z"
};

describe("installed item row mappers", () => {
  it("writes harnesses and not a single owning tool", () => {
    const row = toInstalledItemRow(item);
    expect(row.harnesses).toEqual(["cursor", "codex"]);
    expect(row).not.toHaveProperty("tool");
    expect(row.machine_id).toBe("m1");
  });

  it("reads harnesses from a new row", () => {
    expect(toInstalledItem(toInstalledItemRow(item))).toEqual(item);
  });

  it("reads a legacy tool column as harnesses of one", () => {
    const parsed = toInstalledItem({
      id: item.id,
      machine_id: item.machineId,
      tool: "codex",
      kind: item.kind,
      name: item.name,
      enabled: item.enabled,
      path: item.path,
      scope: item.scope,
      project_path: null,
      source_type: item.sourceType,
      source_ref: null,
      content_backup_id: null,
      last_synced_at: item.lastSyncedAt
    });
    expect(parsed.harnesses).toEqual(["codex"]);
  });

  it("round-trips a git skill's repository subdirectory", () => {
    const gitItem: InstalledItem = {
      ...item,
      sourceType: "git",
      sourceRef: "https://github.com/sslinNn/cc-limits",
      sourceSubdir: "skills/cc-limits"
    };
    const row = toInstalledItemRow(gitItem);
    expect(row.source_subdir).toBe("skills/cc-limits");
    expect(toInstalledItem(row)).toEqual(gitItem);
  });

  it("reads a missing source_subdir column as null", () => {
    const { source_subdir: _dropped, ...legacy } = toInstalledItemRow(item);
    expect(toInstalledItem(legacy).sourceSubdir).toBeNull();
  });
});

describe("toMachine", () => {
  it("reads present_harnesses from a machines row", () => {
    expect(
      toMachine({
        id: "m1",
        user_id: "u1",
        hostname: "studio",
        os: "linux",
        agent_version: "0.1.0",
        paired_at: "2026-01-01T00:00:00.000Z",
        last_seen_at: "2026-01-01T00:00:00.000Z",
        status: "online",
        present_harnesses: ["claude_code", "cursor"]
      }).presentHarnesses
    ).toEqual(["claude_code", "cursor"]);
  });

  it("treats a missing present_harnesses column as unknown, not an empty live set", () => {
    expect(
      toMachine({
        id: "m1",
        user_id: "u1",
        hostname: "studio",
        os: "linux",
        agent_version: "0.1.0",
        paired_at: "2026-01-01T00:00:00.000Z",
        last_seen_at: "2026-01-01T00:00:00.000Z",
        status: "online"
      }).presentHarnesses
    ).toEqual([]);
  });
});

describe("source_commit", () => {
  const sha = "0123456789abcdef0123456789abcdef01234567";
  it("round-trips through the row", () => {
    const row = toInstalledItemRow({ ...item, sourceType: "git", sourceRef: "https://github.com/o/r", sourceCommit: sha });
    expect(row.source_commit).toBe(sha);
    expect(toInstalledItem(row as unknown as Record<string, unknown>).sourceCommit).toBe(sha);
  });
  it("reads a missing column as null", () => {
    const { source_commit: _dropped, ...legacy } = toInstalledItemRow(item);
    expect(toInstalledItem(legacy as unknown as Record<string, unknown>).sourceCommit).toBeNull();
  });
});

describe("toMachineCommand", () => {
  const row = {
    id: "c1",
    machine_id: "m1",
    command: { type: "toggle", itemId: "x", enabled: false },
    status: "pending",
    detail: null,
    created_at: "2026-10-03T00:00:00Z",
    updated_at: "2026-10-03T00:00:00Z",
    expires_at: "2026-10-04T00:00:00Z"
  };
  it("maps a queued command", () => {
    expect(toMachineCommand(row)).toMatchObject({ id: "c1", machineId: "m1", status: "pending", command: { type: "toggle" } });
  });
  it("refuses a payload the command schema would refuse", () => {
    expect(toMachineCommand({ ...row, command: { type: "rm -rf", path: "/" } })).toBeNull();
  });
});
