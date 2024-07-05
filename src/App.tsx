import { Link } from "react-router-dom";

import { ROUTES } from "./constants";
import Vanilla from "./Vanilla";

function App() {
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        height: "100vh",
        background: "orange",
      }}
    >
      <Vanilla />
    </div>
  );
}

export default App;
