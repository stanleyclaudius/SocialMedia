import { PROFILE_TYPES } from "./../constants/profileActions";

const initialState = {
  loading: false,
  users: [],
  posts: []
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case PROFILE_TYPES.GET_USER_PROFILE:
      return {
        ...state,
        users: [...state.users, action.payload]
      }
    case PROFILE_TYPES.FOLLOW:
      return {
        ...state,
        users: state.users.map(user => user._id === action.payload._id ? action.payload : user)
      }
    case PROFILE_TYPES.UNFOLLOW:
      return {
        ...state,
        users: state.users.map(user => user._id === action.payload._id ? action.payload : user)
      }
    case PROFILE_TYPES.GET_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    case PROFILE_TYPES.EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
      }
    default:
      return state;
  }
}

export default profileReducer;