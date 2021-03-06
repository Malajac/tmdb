import * as ActionTypes from "./ActionTypes";

export const Movies = (
  state = {
    isLoading: false,
    errMess: null,
    items: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_MOVIES_BEGIN:
      return { ...state, isLoading: true, errMess: null, items: [] };

    case ActionTypes.FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        items: action.payload
      };

    case ActionTypes.FETCH_MOVIES_FAILURE:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
