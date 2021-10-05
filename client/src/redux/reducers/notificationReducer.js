import { NOTIFICATION_TYPES } from './../constants/notificationActions';

const initialState = {
  loading: false,
  data: []
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_TYPES.NOTIFICATION_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case NOTIFICATION_TYPES.GET_NOTIFICATION:
      return {
        ...state,
        data: action.payload.reverse()
      };
    case NOTIFICATION_TYPES.CREATE_NOTIFICATION:
      return {
        ...state,
        data: [action.payload, ...state.data]
      };
    case NOTIFICATION_TYPES.READ_NOTIFICATION:
      return {
        ...state,
        data: state.data.map(item => item._id === action.payload ? {...item, isRead: true} : item)
      };
    case NOTIFICATION_TYPES.DELETE_NOTIFICATION:
      return {
        ...state,
        data: state.data.filter(item => item._id !== action.payload)
      };
    default:
      return state;
  }
}

export default notificationReducer;