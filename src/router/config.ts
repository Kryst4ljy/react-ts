export interface RouteConf {
  path: string;
  component: Function;
  name?: string;
  models?: Function;
  loadingComponent?: Function;
}

export const routes: RouteConf[] = [
  {
    path: "/home",
    component: () => import("../page/home"),
    models: () => [import("../models/home")],
  },
];
