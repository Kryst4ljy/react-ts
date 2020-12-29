import React from "react";
import { Provider, connect } from "react-redux";
import { Reducer, Dispatch } from "redux";
import createLoading from "dva-loading";
import { create } from "dva-core";

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
  app.start = (container: any) => () => (
    <Provider store={store}>{container}</Provider>
  );
  /**
   * 暴露获取store的接口
   */
  app.getStore = () => store;
  return app;
}

/**
 * 定义model 中的接口
 */

export interface Action<T = any, B = any> {
  type: T;
  payload?: B;
}

export type ReducersMapObject<S = any, A extends Action = Action> = {
  [K in keyof S]: Reducer<S[K], A>;
};

export interface EffectsCommandMap {
  put: <A extends Action>(action: A) => any;
  call: Function;
  select: Function;
  take: Function;
  cancel: Function;
  [key: string]: any;
}

export interface EffectsMapObject {
  [key: string]: Effect | EffectWithType;
}

export interface ReducerEnhancer {
  (reducer: Reducer<any>): void;
}

export interface SubscriptionAPI {
  dispatch: Dispatch<any>;
}

export type ActionWithPayload = { action: Action; payload: any };

export type EffectType = "takeEvery" | "takeLatest" | "watcher" | "throttle";

export type EffectWithType = [Effect, { type: EffectType }];

export type Effect = (
  action: ActionWithPayload,
  effects: EffectsCommandMap
) => void;

export type ReducersMapObjectWithEnhancer = [
  ReducersMapObject,
  ReducerEnhancer
];

export type Subscription = (api: SubscriptionAPI, done: Function) => void;

export interface SubscriptionsMapObject {
  [key: string]: Subscription;
}

export interface Model {
  namespace: string;
  state?: any;
  reducers?: ReducersMapObject | ReducersMapObjectWithEnhancer;
  effects?: EffectsMapObject;
  subscriptions?: SubscriptionsMapObject;
}
