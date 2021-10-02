import { MESSAGE_TYPES } from "./../actions/messageActions";

const initialState = {
  users: [],
  data: [],
  firstLoad: false
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_TYPES.ADD_USER:
      if (state.users.every(item => item.user._id !== action.payload.user._id)) {
        return {
          ...state,
          users: [action.payload, ...state.users]
        }
      }
      return state;
    case MESSAGE_TYPES.ADD_MESSAGE:
      return {
        ...state,
        data: state.data.map(item => 
          item._id === action.payload.sender._id || item._id === action.payload.recipient.user._id
          ? {
            ...item,
            messages: [...item.messages, action.payload],
            result: item.result + 1
          }
          : item
        ),
        users: state.users.map(item => 
          item.user._id === action.payload.recipient.user._id || item.user._id === action.payload.sender._id
          ? {
            ...item,
            text: action.payload.text,
            media: action.payload.media,
            call: action.payload.call
          }
          : item
        )
      };
    case MESSAGE_TYPES.GET_CONVERSATION:
      return {
        ...state,
        users: action.payload,
        firstLoad: true
      }
    case MESSAGE_TYPES.GET_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.payload]
      }
    case MESSAGE_TYPES.DELETE_CONVERSATION:
      return {
        ...state,
        data: state.data.filter(item => item._id !== action.payload),
        users: state.users.filter(item => item.user._id !== action.payload)
      }
    default:
      return state;
  }
}

export default messageReducer;