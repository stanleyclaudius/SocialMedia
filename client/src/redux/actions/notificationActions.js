import { GLOBALTYPES } from './globalTypes';
import { postDataAPI } from './../../utils/fetchData';

export const NOTIFICATION_TYPES = {
  NOTIFICATION_LOADING: 'NOTIFICATION_LOADING',
  GET_NOTIFICATION: 'GET_NOTIFICATION',
  CREATE_NOTIFICATION: 'CREATE_NOTIFICATION'
};

export const createNotification = ({msg, auth, socket}) => async(dispatch) => {
  try {
    await postDataAPI('notification', {
      ...msg,
      user: msg.user._id,
      from: msg.from._id
    }, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}