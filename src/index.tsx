import React from "react";
import ReactDOM from "react-dom";
import { dva } from "./dva";
import Router from "./router/index";

/**
 * 创建dva app
 */
const app = dva({
  initialState: {},
  models: [], // 公共的model 在这里引入
  extraReducers: {},
  onError(e: any) {
    console.error("onError", e);
  },
});

//加载渲染根路由方法
const render = (Component: any) => {
  ReactDOM.render(<Component />, document.getElementById("root"));
};

const App = app.start(<Router app={app} />);

render(App);
