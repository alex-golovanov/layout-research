import { useState, useMemo } from "react";
import { Badge, Button, Grid } from "@adobe/react-spectrum";

import { View } from "./components";
import { GridArea, ViewMode } from "./enums";

function Spectrum() {
  const [mode, setMode] = useState<ViewMode.CODE_EDIT | ViewMode.SIDE_BY_SIDE>(
    ViewMode.SIDE_BY_SIDE
  );

  const handleModeChange = () => {
    setMode((prevMode) =>
      prevMode === ViewMode.CODE_EDIT
        ? ViewMode.SIDE_BY_SIDE
        : ViewMode.CODE_EDIT
    );
  };

  const columns = useMemo<string[]>(() => {
    const config = {
      [ViewMode.SIDE_BY_SIDE]: ["50px", "1fr", "1fr"],
      [ViewMode.CODE_EDIT]: ["50px", "1fr", "0fr"],
    };

    return config[mode];
  }, [mode]);

  return (
    <Grid
      areas={[`${GridArea.SIDEBAR} ${GridArea.LEFT} ${GridArea.CANVAS}`]}
      columns={columns}
      height="100vh"
    >
      <div style={{ background: "red", gridArea: GridArea.SIDEBAR }}></div>
      <View
        mode={mode}
        defaultArea={GridArea.LEFT}
        config={{
          [ViewMode.SIDE_BY_SIDE]: { gridArea: GridArea.LEFT },
          [ViewMode.CODE_EDIT]: { gridArea: GridArea.LEFT },
        }}
        style={{
          background: "orange",
          display: "grid",
          placeContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Badge variant="magenta">editor</Badge>
          <Button variant="primary" onPress={handleModeChange}>
            {mode === ViewMode.CODE_EDIT ? "side-by-side" : "code editor"}
          </Button>
        </div>
      </View>
      <View
        mode={mode}
        defaultArea={GridArea.CANVAS}
        config={{
          [ViewMode.SIDE_BY_SIDE]: { gridArea: GridArea.CANVAS },
          [ViewMode.CODE_EDIT]: { gridArea: GridArea.CANVAS, hidden: true },
        }}
        style={{
          background: "teal",
          display: "grid",
          placeContent: "center",
        }}
      >
        <Badge variant="yellow">canvas</Badge>
      </View>
    </Grid>
  );
}

export default Spectrum;
