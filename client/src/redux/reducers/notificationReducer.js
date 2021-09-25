import { NOTIFICATION_TYPES } from "./../actions/notificationActions";

const initialState = {
  loading: false,
  data: []
};

const notificationReducer = (state=initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_TYPES.GET_NOTIFICATION:
      return {
        ...state,
        data: action.payload
      }
    case NOTIFICATION_TYPES.CREATE_NOTIFICATION:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    case NOTIFICATION_TYPES.DELETE_NOTIFICATION:
      return {
        ...state,
        data: state.data.filter(item => item.id !== action.payload.id || item.url !== action.payload.url)
      }
    default:
      return state;
  }
};

export default notificationReducer;