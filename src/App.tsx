import { Grid } from "@adobe/react-spectrum";
import { Link } from "react-router-dom";

import { ROUTES } from "./constants";

function App() {
  return (
    <Grid height="100vh" justifyContent="center" alignContent="center">
      {ROUTES.map(({ path, name }) => (
        <Link key={path} to={path}>
          {name}
        </Link>
      ))}
    </Grid>
  );
}

export default App;
