import { useState } from "react";
import GridLayout from "react-grid-layout";
import { Badge, Button } from "@adobe/react-spectrum";

const COMMON_CELL_STYLE = { display: "grid", placeContent: "center" };
const ROWS_COUNT = 10;
const ROW_HEIGHT = (1040 - 50) / ROWS_COUNT;

function ReactGridLayout() {
  const [count, setCount] = useState(1);

  console.log(count);

  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: ROWS_COUNT },
    { i: "b", x: 1, y: 0, w: 3, h: ROWS_COUNT, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: count, h: ROWS_COUNT },
  ];

  return (
    <div
      style={{ display: "grid", height: "100vh", gridTemplateRows: "50px 1fr" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Button variant="accent" onPress={() => setCount((c) => --c)}>
          -
        </Button>
        <Button variant="accent" onPress={() => setCount((c) => ++c)}>
          +
        </Button>
      </div>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={ROW_HEIGHT}
        width={1200}
        margin={[0, 0]}
        resizeHandles={["e"]}
      >
        <div
          key="a"
          style={{
            background: "orange",
            ...COMMON_CELL_STYLE,
          }}
        >
          <Badge variant="info">sidebar</Badge>
        </div>
        <div
          key="b"
          style={{
            background: "teal",
            ...COMMON_CELL_STYLE,
          }}
        >
          <Badge variant="yellow">explorer</Badge>
        </div>
        <div
          key="c"
          style={{
            background: "tomato",
            ...COMMON_CELL_STYLE,
          }}
        >
          <Badge variant="indigo">canvas</Badge>
        </div>
      </GridLayout>
    </div>
  );
}

export default ReactGridLayout;
