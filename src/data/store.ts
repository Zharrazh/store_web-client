import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { AuthReducer, AuthState } from "./auth/reducer";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./epic";
import { FormStateMap, reducer as formReducer } from "redux-form";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { initReducer, InitState } from "./init/reducer";
import { CategoriesReducer, CategoriesState } from "./categories/reducer";
import { ProductsReducer, ProductsState } from "./products/reducer";

export type AppStore = {
  init: InitState;
  form: FormStateMap;
  auth: AuthState;
  categories: CategoriesState;
  products: ProductsState;
};
export type AppThunkReturn = Promise<ResponseType>;
export type ResponseType = {
  isError: boolean;
  data?: any;
  code?: number;
};

export type AppDispatch = ThunkDispatch<AppStore, null, AnyAction>;

export type AppThunk<ReturnType = AppThunkReturn> = ThunkAction<
  ReturnType,
  AppStore,
  unknown,
  AnyAction
>;

const epicMiddleware = createEpicMiddleware();

export const store = createStore(
  combineReducers({
    auth: AuthReducer,
    form: formReducer,
    init: initReducer,
    categories: CategoriesReducer,
    products: ProductsReducer,
  }),
  composeWithDevTools(applyMiddleware(epicMiddleware, thunk))
);

epicMiddleware.run(rootEpic);
