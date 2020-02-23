import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { compact } from "lodash/fp";
import { middleware as apiReactionMiddleware } from "../middlewares/api-reaction";
import { middleware as apiMiddleware } from "redux-api-call";

import apiPrefix from "../middlewares/api-prefix";
import rootReducer from "./rootReducer";

const makeStore = initialState => {
  const base = process.env.API_SERVER_URL || "http://localhost:3003";
  const enhancers = compact([
    applyMiddleware(
      reduxThunk,
      apiPrefix(base),
      apiMiddleware,
      apiReactionMiddleware
    ),
    typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
  ]);
  const store = createStore(rootReducer, initialState, compose(...enhancers));

  if (module.hot) {
    module.hot.accept("./rootReducer", () => {
      const newReducer = require("./rootReducer").default;

      store.replaceReducer(newReducer);
    });
  }

  return store;
};

export default makeStore;
