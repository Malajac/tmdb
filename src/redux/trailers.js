import * as ActionTypes from "./ActionTypes";

export const Trailers = (
  state = {
    isLoading: true,
    errMess: null,
    items: {}
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_TRAILERS_BEGIN:
      return { ...state, isLoading: true, errMess: null };

    case ActionTypes.FETCH_TRAILERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        items: { ...state.items, [action.payload.id]: action.payload }
      };

    case ActionTypes.FETCH_TRAILERS_FAILURE:
      return { ...state, isLoading: false, errMess: action.payload };

    // Clear YouTube video key cache
    case ActionTypes.FETCH_MOVIES_BEGIN:
    case ActionTypes.FETCH_TVSHOWS_BEGIN:
      return { ...state, items: {} };

    default:
      return state;
  }
};
