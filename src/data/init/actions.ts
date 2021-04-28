import { action } from "typesafe-actions";
import { ActionType } from "typesafe-actions/dist/type-helpers";

export enum InitActionNames {
  INIT_SET_INIT = "INIT_SET_INIT",
}

const setInit = () => action(InitActionNames.INIT_SET_INIT);

export const InitActions = {
  setInit,
};

export type InitActionTypes = ActionType<typeof InitActions>;
