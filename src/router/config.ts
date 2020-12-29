export interface RouteConf {
  path: string;
  component: Function;
  name?: string;
  models?: Function;
  loadingComponent?: Function;
}

export const routes: RouteConf[] = [
  {
    path: "/one",
    component: () => import("../pages/one"),
    models: () => [import("../models/one")],
  },
];
