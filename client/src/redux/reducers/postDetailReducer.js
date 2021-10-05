import { POST_TYPES } from "./../constants/postTypes";

const postDetailReducer = (state = [], action) => {
  switch (action.type) {
    case POST_TYPES.GET_POST:
      return [...state, action.payload]
    case POST_TYPES.EDIT_POST:
      return state.map(item => item._id === action.payload._id ? action.payload : item)
    default:
      return state;
  }
}

export default postDetailReducer;