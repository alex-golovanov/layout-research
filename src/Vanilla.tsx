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
          gap: 12,
        }}
      >
        <Button variant="primary" onPress={handleModeChange(ViewMode.PREVIEW)}>
          preview mode
        </Button>
        <Button
          variant="primary"
          onPress={handleModeChange(ViewMode.CANVAS_EDIT)}
        >
          canvas editor
        </Button>
        <Button
          variant="primary"
          onPress={handleModeChange(ViewMode.SIDE_BY_SIDE)}
        >
          side-by-side
        </Button>
        <Button
          variant="primary"
          onPress={handleModeChange(ViewMode.CODE_EDIT)}
        >
          code editor
        </Button>
      </div>
      <animated.div
        style={{
          display: "grid",
          gridTemplateAreas: AREAS,
          ...springs,
        }}
      >
        <View
          mode={mode}
          defaultArea={GridArea.SIDEBAR}
          config={{
            [ViewMode.PREVIEW]: { hidden: true },
          }}
          style={{
            background: "tomato",
            display: "grid",
            placeContent: "center",
          }}
        >
          <Badge variant="indigo">sb</Badge>
        </View>
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
    </div>
  );
}

export default Vanilla;
