import { MESSAGE_TYPES } from "./../actions/messageActions";

const initialState = {
  users: [],
  userResult: 0,
  data: []
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_TYPES.ADD_USER:
      if (state.users.every(item => item._id !== action.payload._id)) {
        return {
          ...state,
          users: [action.payload, ...state.users]
        }
      }
      return state;
    case MESSAGE_TYPES.ADD_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.payload]
      };
    case MESSAGE_TYPES.GET_CONVERSATION:
      return {
        ...state,
        users: action.payload
      }
    default:
      return state;
  }
}

export default messageReducer;