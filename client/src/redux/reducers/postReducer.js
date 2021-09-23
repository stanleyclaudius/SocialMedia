import { POST_TYPES } from "./../actions/postActions";

const initialState = {
  loading: false,
  posts: [],
  result: 0,
  page: 2
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
        posts: [action.payload, ...state.posts],
        result: state.result + 1
      }
    case POST_TYPES.GET_POSTS:
      return {
        ...state,
        result: action.payload.result,
        posts: action.payload.posts,
        page: action.payload.page
      }
    case POST_TYPES.EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
      }
    case POST_TYPES.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload._id),
        result: state.result - 1
      }
    default:
      return state;
  }
}

export default postReducer;