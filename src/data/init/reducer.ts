import { InitActionNames, InitActionTypes } from "./actions";

export type InitState = {
  isInit: boolean;
};
const init: InitState = {
  isInit: false,
};

export const initReducer = (
  state = init,
  action: InitActionTypes
): InitState => {
  switch (action.type) {
    case InitActionNames.INIT_SET_INIT:
      return { ...state, isInit: true };
  }
  return state;
};
