import React, { ReactElement, cloneElement } from "react";

import { animated, useSpring } from "@react-spring/web";

import { usePrevious } from "./hooks";
import { DEFAULT_ROWS } from "./constants";
import type { LayoutAreaProps } from "./components";

import {
  resolveAreasVisibility,
  type ResolveAreasVisibilityProps,
} from "./utils";

type GridProps = Omit<ResolveAreasVisibilityProps, "rows"> &
  Partial<Pick<ResolveAreasVisibilityProps, "rows">>;

interface GridLayoutProps extends GridProps {
  height?: string;
  width?: string;
  children: Array<ReactElement<LayoutAreaProps>>;
}

export function AnimatedGridLayout(props: GridLayoutProps) {
  const {
    children,
    areas,
    columns,
    rows = DEFAULT_ROWS,
    width,
    height,
  } = props;

  const gridTemplateAreas = areas
    .map((area) => `"${area.join(" ")}"`)
    .join("\n");

  const gridTemplateRows = rows.join(" ");
  const prevGridTemplateRows = usePrevious(gridTemplateRows);

  const gridTemplateColumns = columns.join(" ");
  const prevGridTemplateColumns = usePrevious(gridTemplateColumns);

  const spring = useSpring({
    from: {
      girdTemplateColumns: prevGridTemplateColumns,
      gridTemplateRows: prevGridTemplateRows,
    },
    to: { gridTemplateColumns, gridTemplateRows },
  });

  const visibility = resolveAreasVisibility({ rows, columns, areas });

  const components = React.Children.map(children, (child) => {
    const { name: areaName } = child.props;
    return cloneElement(child, { hidden: !visibility[areaName] });
  });

  return (
    <animated.div
      style={{
        display: "grid",
        gridTemplateAreas,
        width: width ?? "auto",
        height: height ?? "auto",
        gap: 0,
        ...spring,
      }}
    >
      {components}
    </animated.div>
  );
}
