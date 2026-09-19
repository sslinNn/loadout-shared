import type { InstalledItem, Machine } from "./schemas.js";
/**
 * PostgREST returns snake_case columns; shared types are camelCase. Every read/write that
 * crosses that boundary must go through these mappers — casting a row `as InstalledItem`
 * type-checks but leaves camelCase fields undefined at runtime.
 *
 * Two callers (dashboard + agent) already needed the same mapping; this module is the seam.
 */
export type InstalledItemRow = {
    id: string;
    machine_id: string;
    harnesses: string[];
    kind: InstalledItem["kind"];
    name: string;
    enabled: boolean;
    path: string;
    scope: InstalledItem["scope"];
    project_path: string | null;
    source_type: InstalledItem["sourceType"];
    source_ref: string | null;
    source_subdir: string | null;
    content_backup_id: string | null;
    last_synced_at: string;
};
export declare function toInstalledItemRow(item: InstalledItem): InstalledItemRow;
export declare function toInstalledItem(row: Record<string, unknown>): InstalledItem;
export declare function toMachine(row: Record<string, unknown>): Machine;
