import { Link } from "react-router-dom";

import { ROUTES } from "./constants";

function App() {
  return (
    <div style={{ display: "grid", placeContent: "center", height: "100vh" }}>
      {ROUTES.map(({ path, name }) => (
        <Link key={path} to={path}>
          {name}
        </Link>
      ))}
    </div>
  );
}

export default App;
