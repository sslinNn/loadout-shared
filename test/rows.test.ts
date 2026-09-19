import { describe, it, expect } from "vitest";
import { toInstalledItem, toInstalledItemRow, toMachine } from "../src/rows";
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
