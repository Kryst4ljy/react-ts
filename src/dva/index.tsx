import React from "react";
import { Provider, connect } from "react-redux";
import createLoading from "dva-loading";
import { create } from "dva-core";
import { Model } from "dva";

export { connect };
export interface Options {
  models: Model[];
  extraReducers?: any;
  initialState: any;
  onError: (e: any) => void;
  onAction?: any[];
}

export function dva(options: Options) {
  /**
   * 创建APP实例
   */
  const app = create(options);

  /**
   * 注册全局model
   */
  options.models.forEach((model: Model) => app.model(model));

  /**
   * 添加loading中间件插件必须在start()之前注册
   */
  app.use(createLoading());
  /**
   * 启动APP，必须放在app创建之后的第一步，只有app启动了，app实例才存在
   */
  app.start();

  /**
   * 重载app的start方法
   */
  const store = app._store;
  app.start = (container: any) => () =>
    <Provider store={store}>{container}</Provider>;
  /**
   * 暴露获取store的接口
   */
  app.getStore = () => store;
  return app;
}
