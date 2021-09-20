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
        posts: [action.payload, ...state.posts]
      }
    case POST_TYPES.GET_POSTS:
      return {
        ...state,
        result: action.payload.result,
        posts: action.payload.posts
      }
    default:
      return state;
  }
}

export default postReducer;