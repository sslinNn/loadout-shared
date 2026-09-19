function harnessesFromRow(row) {
    if (Array.isArray(row.harnesses))
        return row.harnesses.map(String);
    if (typeof row.tool === "string" && row.tool.length > 0)
        return [row.tool];
    return [];
}
export function toInstalledItemRow(item) {
    return {
        id: item.id,
        machine_id: item.machineId,
        harnesses: item.harnesses,
        kind: item.kind,
        name: item.name,
        enabled: item.enabled,
        path: item.path,
        scope: item.scope,
        project_path: item.projectPath,
        source_type: item.sourceType,
        source_ref: item.sourceRef,
        source_subdir: item.sourceSubdir ?? null,
        content_backup_id: item.contentBackupId,
        last_synced_at: item.lastSyncedAt
    };
}
export function toInstalledItem(row) {
    return {
        id: row.id,
        machineId: row.machine_id,
        harnesses: harnessesFromRow(row),
        kind: row.kind,
        name: row.name,
        enabled: row.enabled,
        path: row.path,
        scope: row.scope,
        projectPath: row.project_path ?? null,
        sourceType: row.source_type,
        sourceRef: row.source_ref ?? null,
        sourceSubdir: row.source_subdir ?? null,
        contentBackupId: row.content_backup_id ?? null,
        lastSyncedAt: row.last_synced_at
    };
}
export function toMachine(row) {
    return {
        id: row.id,
        userId: row.user_id,
        hostname: row.hostname,
        os: row.os,
        agentVersion: row.agent_version,
        pairedAt: row.paired_at,
        lastSeenAt: row.last_seen_at,
        status: row.status,
        presentHarnesses: Array.isArray(row.present_harnesses) ? row.present_harnesses.map(String) : []
    };
}
