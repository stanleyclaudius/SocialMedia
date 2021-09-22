import { SUGGESTION_TYPES } from './../actions/suggestionActions';

const initialState = {
  loading: false,
  users: []
};

const suggestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUGGESTION_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case SUGGESTION_TYPES.GET_SUGGESTION:
      return {
        ...state,
        users: action.payload
      }
    default:
      return state;
  }
};

export default suggestionReducer;