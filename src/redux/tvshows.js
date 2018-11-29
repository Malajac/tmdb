import * as ActionTypes from "./ActionTypes";

export const TvShows = (
  state = {
    isLoading: false,
    errMess: null,
    items: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_TVSHOWS_BEGIN:
      return { ...state, isLoading: true, errMess: null, items: [] };

    case ActionTypes.FETCH_TVSHOWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        items: action.payload
      };

    case ActionTypes.FETCH_TVSHOWS_FAILURE:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
