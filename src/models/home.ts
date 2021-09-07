import { Effect } from "dva";
import { Reducer } from "redux";

interface stateType {
  name: String;
}

interface options {
  namespace: String;
  state: stateType;
  reducers: {
    setState: Reducer<any, any>;
    clearState: Reducer<any, any>;
  };
  effects: {
    initState: Effect;
  };
}

const home: options = {
  namespace: "home",

  state: {
    name: "",
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
        payload: { name: payload.name },
      });
    },
  },
};

export default home;
