import { Effect } from "../dva";
import { Reducer } from "redux";

//定义state 结构
export interface commonState {
  txt: string;
  txt2: string;
}

interface oneType {
  namespace: string;
  state: commonState;
  reducers: {
    setState: Reducer<any, any>;
    clearState: Reducer<any, any>;
  };
  effects: {
    initState: Effect;
  };
}

const one: oneType = {
  namespace: "one",
  state: {
    txt: "1",
    txt2: "2",
  },

  reducers: {
    setState(state, action) {
      const { payload } = action;
      return Object.assign({}, state, payload);
    },
    clearState(state) {
      return {
        ...state,
      };
    },
  },

  effects: {
    *initState({ payload }: any, { put }: any) {
      yield put({
        type: "setState",
        payload: { txt: payload.txt },
      });
    },
  },
};

export default one;
