import { Model } from "../dva";

//定义state 结构
export interface commonState {
  txt: string;
  txt2: string;
}

export default {
  namespace: "one",
  state: {
    txt: "1",
    txt2: "2",
  } as commonState,

  effects: {},

  reducers: {
    //state 之前的 action 传进来的
    default(state: commonState, action: any) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
} as Model;
