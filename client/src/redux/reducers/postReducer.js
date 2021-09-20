import { POST_TYPES } from "./../actions/postActions";

const initialState = {
  loading: false,
  posts: [],
  result: 0
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case POST_TYPES.CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    default:
      return state;
  }
}

export default postReducer;