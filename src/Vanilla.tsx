import { useState } from "react";
import { Badge, Button } from "@adobe/react-spectrum";

import { View } from "./components";
import { GridArea, ViewMode } from "./enums";
import { animated, useSpring } from "@react-spring/web";

const AREAS = `"${GridArea.SIDEBAR} ${GridArea.LEFT} ${GridArea.EDITOR} ${GridArea.CANVAS} ${GridArea.RIGHT}"`;
const COLUMNS = {
  [ViewMode.SIDE_BY_SIDE]: "50px 0fr 1fr 1fr 0fr",
  [ViewMode.CODE_EDIT]: "50px 1fr 2fr 0fr 0fr",
  [ViewMode.CANVAS_EDIT]: "50px 1fr 0fr 3fr 1fr",
  [ViewMode.PREVIEW]: "0px 0fr 0fr 1fr 0fr",
};

const Cell = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 20,
    }}
  >
    {children}
  </div>
);

function Vanilla() {
  const [mode, setMode] = useState<ViewMode>(ViewMode.SIDE_BY_SIDE);

  const [springs, api] = useSpring(() => ({
    from: {
      gridTemplateColumns: COLUMNS[mode],
    },
  }));

  const handleModeChange = (nextMode: ViewMode) => () => {
    api.start({
      from: {
        gridTemplateColumns: COLUMNS[mode],
      },
      to: {
        gridTemplateColumns: COLUMNS[nextMode],
      },
    });

    setMode(nextMode);
  };

  return (
    <animated.div
      style={{
        display: "grid",
        height: "100vh",
        gridTemplateAreas: AREAS,
        ...springs,
      }}
    >
      <div style={{ background: "tomato", gridArea: GridArea.SIDEBAR }}></div>
      <View
        mode={mode}
        defaultArea={GridArea.LEFT}
        config={{
          [ViewMode.SIDE_BY_SIDE]: { hidden: true },
          [ViewMode.PREVIEW]: { hidden: true },
        }}
        style={{
          background: "mediumpurple",
          display: "grid",
          placeContent: "center",
        }}
      >
        <Cell>
          <Badge variant="positive">explorer</Badge>
        </Cell>
      </View>
      <View
        mode={mode}
        defaultArea={GridArea.EDITOR}
        config={{
          [ViewMode.PREVIEW]: { hidden: true },
          [ViewMode.CANVAS_EDIT]: { hidden: true },
        }}
        style={{
          background: "orange",
          display: "grid",
          placeContent: "center",
        }}
      >
        <Cell>
          <Badge variant="seafoam">editor</Badge>
          <Button
            variant="primary"
            onPress={handleModeChange(
              mode === ViewMode.CODE_EDIT
                ? ViewMode.SIDE_BY_SIDE
                : ViewMode.CODE_EDIT
            )}
          >
            {mode === ViewMode.SIDE_BY_SIDE
              ? "enter fullscreen editor"
              : "enter side-by-side"}
          </Button>
          <Button
            variant="primary"
            onPress={handleModeChange(ViewMode.CANVAS_EDIT)}
          >
            enter canvas editor
          </Button>
          <Button
            variant="primary"
            onPress={handleModeChange(ViewMode.PREVIEW)}
          >
            enter preview mode
          </Button>
        </Cell>
      </View>
      <View
        mode={mode}
        defaultArea={GridArea.CANVAS}
        config={{
          [ViewMode.CODE_EDIT]: { hidden: true },
        }}
        style={{
          background: "teal",
          display: "grid",
          placeContent: "center",
        }}
      >
        <Cell>
          <Badge variant="yellow">canvas</Badge>
          <Button
            variant="primary"
            onPress={handleModeChange(ViewMode.PREVIEW)}
          >
            enter preview mode
          </Button>
          <Button
            variant="primary"
            onPress={handleModeChange(ViewMode.CANVAS_EDIT)}
          >
            enter canvas editor
          </Button>
          <Button
            variant="primary"
            onPress={handleModeChange(ViewMode.SIDE_BY_SIDE)}
          >
            enter side-by-side
          </Button>
        </Cell>
      </View>
      <View
        mode={mode}
        defaultArea={GridArea.RIGHT}
        config={{
          [ViewMode.SIDE_BY_SIDE]: { hidden: true },
          [ViewMode.PREVIEW]: { hidden: true },
          [ViewMode.CODE_EDIT]: { hidden: true },
        }}
        style={{
          background: "gold",
          display: "grid",
          placeContent: "center",
        }}
      >
        <Cell>
          <Badge variant="negative">properties</Badge>
        </Cell>
      </View>
    </animated.div>
  );
}

export default Vanilla;
