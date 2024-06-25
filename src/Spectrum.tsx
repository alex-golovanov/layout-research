import { useState, useMemo } from "react";
import { Badge, Button, Grid } from "@adobe/react-spectrum";

import { View } from "./components";
import { GridArea, ViewMode } from "./enums";

function Spectrum() {
  const [mode, setMode] = useState<ViewMode.CONTENT | ViewMode.SIDE_BY_SIDE>(
    ViewMode.SIDE_BY_SIDE
  );

  const handleModeChange = () => {
    setMode((prevMode) =>
      prevMode === ViewMode.CONTENT ? ViewMode.SIDE_BY_SIDE : ViewMode.CONTENT
    );
  };

  const columns = useMemo<string[]>(() => {
    const config = {
      [ViewMode.SIDE_BY_SIDE]: ["50px", "1fr", "1fr"],
      [ViewMode.CONTENT]: ["50px", "1fr"],
    };

    return config[mode];
  }, [mode]);

  return (
    <Grid
      areas={[`${GridArea.SIDEBAR} ${GridArea.LEFT} ${GridArea.MAIN}`]}
      columns={columns}
      gap="size-100"
      height="100vh"
    >
      <div style={{ background: "red", gridArea: GridArea.SIDEBAR }}></div>
      <View
        mode={mode}
        config={{
          [ViewMode.SIDE_BY_SIDE]: { gridArea: GridArea.LEFT },
          [ViewMode.CONTENT]: { gridArea: GridArea.LEFT },
        }}
        style={{
          background: "orange",
          display: "grid",
          placeContent: "center",
        }}
      >
        <Button variant="primary" onPress={handleModeChange}>
          change type
        </Button>
      </View>
      <View
        mode={mode}
        config={{
          [ViewMode.SIDE_BY_SIDE]: { gridArea: GridArea.MAIN },
          [ViewMode.CONTENT]: { gridArea: GridArea.MAIN, hidden: true },
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
