import { animated } from "@react-spring/web";
import { GridArea, ViewMode } from "../enums";
import { useMemo } from "react";

interface ViewConfig {
  gridArea: GridArea;
  hidden?: boolean;
}

interface ViewProps<T extends ViewMode> {
  mode: T;
  config: Record<T, ViewConfig>;
  children: React.ReactNode;
  style: Partial<React.CSSProperties>;
}

export function View<T extends ViewMode>({
  mode,
  config,
  children,
  style,
}: ViewProps<T>) {
  const { gridArea, hidden } = config[mode];

  const derivedStyle = useMemo(() => {
    const res: React.CSSProperties = { gridArea, ...(style || []) };
    if (hidden) {
      res.display = "none";
    }
    return res;
  }, [gridArea, hidden, style]);

  return <animated.div style={derivedStyle}>{children}</animated.div>;
}
