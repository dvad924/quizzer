import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { makeRootReducer } from "./reducers";
export default (initialState = {}) => {
  // ========================
  // Add Middleware config
  // =======================

  const middleware = [thunk];
  // ========================
  // Store enhancers
  // ========================
  const enhancers = [];
  if (process.env.__DEV__) {
    const devToolsExt = window.devToolsExtension;
    if (typeof devToolsExt === "function") {
      enhancers.push(devToolsExt());
    }
  }
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
  store.asyncReducers = {};
  if (module.hot && false) {
    module.hot.accept("./reducers", () => {
      const reducers = require("./reducers").default;
      store.replaceReducers(reducers(store.asyncReducers));
    });
  }
  return store;
};
