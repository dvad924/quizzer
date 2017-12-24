import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";
import quizzes from "./modules/quizzes";

export const makeRootReducer = (asyncReducers, combReducers = {}) => {
  return reduceReducers(
    combineReducers({
      quizzes
    }),
    ...Object.keys(combReducers).map(x => combReducers[x])
  );
};

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers, store.combs));
};
