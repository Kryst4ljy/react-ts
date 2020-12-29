import React, { Component } from "react";

import { Model } from "./index";

//缓存已注册的module
interface Cached {
  [key: string]: number;
}
const cached: Cached = {};

function registerModel(app: any, model: Model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

let defaultLoadingComponent = () => null;

function asyncComponent(config: any) {
  const { resolve } = config;

  return class DynamicComponent extends Component {
    state: any = {
      AsyncComponent: null,
    };

    loadingComponent: Function;
    mounted: boolean;
    constructor(props: any) {
      super(props);
      this.load();
      this.loadingComponent =
        config.loadingComponent || defaultLoadingComponent;
      this.mounted = false;
    }

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    load() {
      resolve().then((m: any) => {
        const AsyncComponent = m.default || m;
        if (this.mounted) {
          this.setState({ AsyncComponent });
        } else {
          this.state.AsyncComponent = AsyncComponent; // eslint-disable-line
        }
      });
    }

    render() {
      const { AsyncComponent }: any = this.state;
      const LoadingComponent: Function = this.loadingComponent;
      if (AsyncComponent) return <AsyncComponent {...this.props} />;
      return <LoadingComponent {...this.props} />;
    }
  };
}

export default function dynamic(config: any) {
  const { app, models: resolveModels, component: resolveComponent } = config;
  return asyncComponent({
    resolve:
      config.resolve ||
      function () {
        const models =
          typeof resolveModels === "function" ? resolveModels() : [];
        const component = resolveComponent();
        return new Promise((resolve) => {
          Promise.all([...models, component]).then((ret) => {
            if (!models || !models.length) {
              return resolve(ret[0]);
            } else {
              const len = models.length;
              ret.slice(0, len).forEach((m) => {
                m = m.default || m;
                if (!Array.isArray(m)) {
                  m = [m];
                }
                m.map((model: Model) => registerModel(app, model));
              });
              resolve(ret[len]);
            }
          });
        });
      },
    ...config,
  });
}
