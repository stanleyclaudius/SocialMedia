import { DISCOVER_TYPES } from "./../actions/discoverActions";

const initialState = {
  loading: false,
  posts: [],
  result: 0
};

const discoverReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISCOVER_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case DISCOVER_TYPES.GET_DISCOVER_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result
      }
    default:
      return state;
  }
}

export default discoverReducer;