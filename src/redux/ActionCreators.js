import * as ActionTypes from "./ActionTypes";
import { getMovies, getTvShows, getTrailers } from "../shared/api";

const NUM_TOP_ITEMS = 10;

// Movies
export const fetchMovies = query => dispatch => {
  dispatch(fetchMoviesBegin(true));
  const numItems = query ? null : NUM_TOP_ITEMS;

  return getMovies(query)
    .then(data => (numItems ? data.slice(0, numItems) : data))
    .then(movies => dispatch(fetchMoviesSuccess(movies)))
    .catch(error => dispatch(fetchMoviesFailure(error.message)));
};

export const fetchMoviesBegin = () => ({
  type: ActionTypes.FETCH_MOVIES_BEGIN
});

export const fetchMoviesSuccess = items => ({
  type: ActionTypes.FETCH_MOVIES_SUCCESS,
  payload: items
});

export const fetchMoviesFailure = errmess => ({
  type: ActionTypes.FETCH_MOVIES_FAILURE,
  payload: errmess
});

// TV Shows
export const fetchTvShows = query => dispatch => {
  dispatch(fetchTvShowsBegin(true));
  const numItems = query ? null : NUM_TOP_ITEMS;

  return getTvShows(query)
    .then(data => (numItems ? data.slice(0, numItems) : data))
    .then(tvShows => dispatch(fetchTvShowsSuccess(tvShows)))
    .catch(error => dispatch(fetchTvShowsFailure(error.message)));
};

export const fetchTvShowsBegin = () => ({
  type: ActionTypes.FETCH_TVSHOWS_BEGIN
});

export const fetchTvShowsSuccess = items => ({
  type: ActionTypes.FETCH_TVSHOWS_SUCCESS,
  payload: items
});

export const fetchTvShowsFailure = errmess => ({
  type: ActionTypes.FETCH_TVSHOWS_FAILURE,
  payload: errmess
});

// YouTube trailers
export const fetchTrailers = (id, type) => dispatch => {
  dispatch(fetchTrailersBegin(true));

  return getTrailers(id, type)
    .then(trailers => dispatch(fetchTrailersSuccess(trailers)))
    .catch(error => dispatch(fetchTrailersFailure(error.message)));
};

export const fetchTrailersBegin = () => ({
  type: ActionTypes.FETCH_TRAILERS_BEGIN
});

export const fetchTrailersSuccess = items => ({
  type: ActionTypes.FETCH_TRAILERS_SUCCESS,
  payload: items
});

export const fetchTrailersFailure = errmess => ({
  type: ActionTypes.FETCH_TRAILERS_FAILURE,
  payload: errmess
});
