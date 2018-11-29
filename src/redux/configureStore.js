import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Movies } from "./movies";
import { TvShows } from "./tvshows";
import { Trailers } from "./trailers";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      movies: Movies,
      tvShows: TvShows,
      trailers: Trailers
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
