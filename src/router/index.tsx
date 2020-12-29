import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import proHistory from "../dva/history";
import dynamic from "../dva/dynamic";
import { routes, RouteConf } from "./config";

const RouterConfig = ({ app }: any) => {
  return (
    <Router history={proHistory}>
      <Switch>
        {routes.map((value: RouteConf, key: number) => (
          <Route
            exact
            key={key}
            path={value.path}
            component={dynamic({
              app,
              ...value,
            })}
          />
        ))}
        <Redirect from="/*" to="/404"></Redirect>
      </Switch>
    </Router>
  );
};

export default RouterConfig;
