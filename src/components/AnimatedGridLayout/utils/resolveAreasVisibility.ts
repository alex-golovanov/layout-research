import { normalizeMeasurement } from "./normalizeMeasurement";

export interface ResolveAreasVisibilityProps {
  rows: string[];
  columns: string[];
  areas: string[][];
}

/**
 * Resolves the visibility of areas in a grid layout.
 */
export function resolveAreasVisibility({
  rows,
  columns,
  areas,
}: ResolveAreasVisibilityProps): Record<string, boolean> {
  const normalizedRows = rows.map(normalizeMeasurement);
  const normalizeColumns = columns.map(normalizeMeasurement);

  const result: Record<string, boolean> = {};
  for (let rowIndex = 0; rowIndex < areas.length; rowIndex++) {
    const areasRow = areas[rowIndex];
    for (let columnIndex = 0; columnIndex < areasRow.length; columnIndex++) {
      result[areasRow[columnIndex]] = false;
    }
  }

  for (let rowIndex = 0; rowIndex < areas.length; rowIndex++) {
    const areasRow = areas[rowIndex];

    if (normalizedRows[rowIndex]) {
      for (let columnIndex = 0; columnIndex < areasRow.length; columnIndex++) {
        const areaName = areasRow[columnIndex];
        if (normalizeColumns[columnIndex] && areasRow.includes(areaName)) {
          result[areaName] = true;
        }
      }
    }
  }

  return result;
}
