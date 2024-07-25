import { useState } from "react";
import { faker } from "@faker-js/faker";

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
  height: "100%",
  width: "100%",
  placeContent: "center",
};

const BACKGROUNDS: Partial<Record<GridArea, string>> = {
  [GridArea.CANVAS]: "#FC8603",
  [GridArea.EDITOR]: "#0379FC",
  [GridArea.LEFT]: "#8B3DC2",
  [GridArea.RIGHT]: "#74C23D",
  [GridArea.SIDEBAR]: "#FFAA00",
  [GridArea.HEADER]: "#F81407",
};

const Cell = ({ type }: { type: `${GridArea}` }) => {
  return (
    <div
      style={{
        display: "grid",
        width: "100%",
        gridTemplateRows: "50px 1fr",
        placeContent: "center",
        background: BACKGROUNDS[type] || "pink",
        padding: 24,
      }}
    >
      <h4>{type}</h4>
      <div>
        {faker.lorem
          .paragraphs(10, "|")
          .split("|")
          .map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
      </div>
    </div>
  );
};

function App() {
  const [mode, setMode] = useState<ViewMode>(ViewMode.SIDE_BY_SIDE);
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        height: "100vh",
        background: "#1ECBE1",
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
          <button onClick={() => setMode(ViewMode.CANVAS_EDIT)}>
            CANVAS_EDIT
          </button>
          <button onClick={() => setMode(ViewMode.PREVIEW)}>PREVIEW</button>
          <button onClick={() => setMode(ViewMode.SIDE_BY_SIDE)}>
            SIDE_BY_SIDE
          </button>
        </div>

        <AnimatedGridLayout
          areas={AREAS}
          columns={COLUMNS[mode]}
          rows={ROWS[mode]}
          width="100vw"
        >
          <LayoutArea name={GridArea.HEADER}>
            <div
              style={{
                ...COMMON_CELL_STYLES,
                background: BACKGROUNDS[GridArea.HEADER],
              }}
            >
              <h4>HEADER</h4>
            </div>
          </LayoutArea>
          <LayoutArea name={GridArea.SIDEBAR}>
            <div
              style={{
                ...COMMON_CELL_STYLES,
                background: BACKGROUNDS[GridArea.SIDEBAR],
              }}
            >
              <h4>SB</h4>
            </div>
          </LayoutArea>
          <LayoutArea name={GridArea.LEFT}>
            <Cell type={GridArea.LEFT} />
          </LayoutArea>
          <LayoutArea name={GridArea.EDITOR}>
            <Cell type={GridArea.EDITOR} />
          </LayoutArea>
          <LayoutArea name={GridArea.CANVAS}>
            <Cell type="CANVAS" />
          </LayoutArea>
          <LayoutArea name={GridArea.RIGHT}>
            {/* <div style={{ ...COMMON_CELL_STYLES, background: "blue" }}>
              RIGHT
            </div> */}
            <Cell type={GridArea.RIGHT} />
          </LayoutArea>
        </AnimatedGridLayout>
      </div>
    </div>
  );
}

export default App;
