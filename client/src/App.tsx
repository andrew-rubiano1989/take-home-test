import React from "react";
import { Route, Switch } from "react-router";
import { Home } from "./views/Home";
import { TestPage } from "./views/TestPage";

const App = () => {
  return (
    <Switch>
      <Route exact path="/test">
        <TestPage />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default App
