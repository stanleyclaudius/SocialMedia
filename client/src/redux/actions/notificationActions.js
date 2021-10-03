import { GLOBALTYPES } from './globalTypes';
import { getDataAPI, postDataAPI } from './../../utils/fetchData';

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

export const getNotification = (token) => async(dispatch) => {
  try {
    const res = await getDataAPI('notification', token);

    dispatch({
      type: NOTIFICATION_TYPES.GET_NOTIFICATION,
      payload: res.data.notifications
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}