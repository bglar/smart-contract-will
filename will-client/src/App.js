import React from 'react';
import { Route, Switch } from "react-router-dom";
import { publicRoutes } from "./routes";
import "./styles/style.css";


const App = () => (
  <Switch>
    {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
          />
        ))}
  </Switch>
);

export default App;