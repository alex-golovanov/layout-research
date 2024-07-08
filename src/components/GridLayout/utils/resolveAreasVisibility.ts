import { normalizeMeasurement } from "./normalizeMeasurement";

interface ResolveAreasVisibilityProps<T> {
  rows: string[];
  columns: string[];
  areas: T[][];
}

/**
 * Resolves the visibility of areas in a grid layout.
 */
export function resolveAreasVisibility<T extends string>({
  rows,
  columns,
  areas,
}: ResolveAreasVisibilityProps<T>): Record<T, boolean> {
  const normalizedRows = rows.map(normalizeMeasurement);
  const normalizeColumns = columns.map(normalizeMeasurement);

  const result = {} as Record<T, boolean>;
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
