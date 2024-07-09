import { useState } from "react";

import { GridArea, ViewMode } from "./enums";
import { AnimatedGridLayout, LayoutArea } from "./components";

const AREAS = [
  [
    GridArea.HEADER,
    GridArea.HEADER,
    GridArea.HEADER,
    GridArea.HEADER,
    GridArea.HEADER,
  ],
  [
    GridArea.SIDEBAR,
    GridArea.LEFT,
    GridArea.EDITOR,
    GridArea.CANVAS,
    GridArea.RIGHT,
  ],
];

const ROWS = {
  [ViewMode.SIDE_BY_SIDE]: ["0px", "1fr"],
  [ViewMode.CODE_EDIT]: ["0px", "1fr"],
  [ViewMode.CANVAS_EDIT]: ["0px", "1fr"],
  [ViewMode.PREVIEW]: ["50px", "1fr"],
};

const COLUMNS = {
  [ViewMode.SIDE_BY_SIDE]: ["50px", "0fr", "1fr", "1fr", "0fr"],
  [ViewMode.CODE_EDIT]: ["50px", "1fr", "2fr", "0fr", "0fr"],
  [ViewMode.CANVAS_EDIT]: ["50px", "1fr", "0fr", "3fr", "1fr"],
  [ViewMode.PREVIEW]: ["0px", "0fr", "0fr", "1fr", "0fr"],
};

const COMMON_CELL_STYLES = {
  display: "grid",
  placeContent: "center",
  height: "100%",
  width: "100%",
};

function App() {
  const [mode, setMode] = useState<ViewMode>(ViewMode.SIDE_BY_SIDE);
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        height: "100vh",
        background: "orange",
      }}
    >
      <div
        style={{
          display: "grid",
          height: "100vh",
          gridTemplateRows: "50px 1fr",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            background: "lightgray",
          }}
        >
          <button onClick={() => setMode(ViewMode.CODE_EDIT)}>CODE_EDIT</button>
          <button onClick={() => setMode(ViewMode.PREVIEW)}>PREVIEW</button>
          <button onClick={() => setMode(ViewMode.SIDE_BY_SIDE)}>
            SIDE_BY_SIDE
          </button>
          <button onClick={() => setMode(ViewMode.CANVAS_EDIT)}>
            CANVAS_EDIT
          </button>
        </div>

        <AnimatedGridLayout
          areas={AREAS}
          columns={COLUMNS[mode]}
          rows={ROWS[mode]}
          width="100vw"
        >
          <LayoutArea name={GridArea.HEADER}>
            <div style={{ ...COMMON_CELL_STYLES, background: "green" }}>
              HEADER
            </div>
          </LayoutArea>
          <LayoutArea name={GridArea.SIDEBAR}>
            <div style={{ ...COMMON_CELL_STYLES, background: "red" }}>SB</div>
          </LayoutArea>
          <LayoutArea name={GridArea.LEFT}>
            <div style={{ ...COMMON_CELL_STYLES, background: "purple" }}>
              LEFT
            </div>
          </LayoutArea>
          <LayoutArea name={GridArea.EDITOR}>
            <div style={{ ...COMMON_CELL_STYLES, background: "gold" }}>
              EDITOR
            </div>
          </LayoutArea>
          <LayoutArea name={GridArea.CANVAS}>
            <div style={{ ...COMMON_CELL_STYLES, background: "skyblue" }}>
              CANVAS
            </div>
          </LayoutArea>
          <LayoutArea name={GridArea.RIGHT}>
            <div style={{ ...COMMON_CELL_STYLES, background: "blue" }}>
              RIGHT
            </div>
          </LayoutArea>
        </AnimatedGridLayout>
      </div>
    </div>
  );
}

export default App;
