import { GLOBALTYPES } from './globalTypes';
import { getDataAPI, postDataAPI, deleteDataAPI } from './../../utils/fetchData';

export const NOTIFICATION_TYPES = {
  GET_NOTIFICATION: 'GET_NOTIFICATION',
  CREATE_NOTIFICATION: 'CREATE_NOTIFICATION',
  DELETE_NOTIFICATION: 'DELETE_NOTIFICATION',
  EDIT_NOTIFICATION: 'EDIT_NOTIFICATION'
};

export const createNotification = ({msg, auth, socket}) => async(dispatch) => {
  try {
    const res = await postDataAPI('notification', msg, auth.token);

    const data = {
      ...res.data.notification,
      user: auth.user
    };

    socket.emit('createNotification', data);
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
    })
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}

export const deleteNotification = ({msg, auth, socket}) => async(dispatch) => {
  try {
    const res = await deleteDataAPI(`notification/${msg.id}?url=${msg.url}`, auth.token);

    socket.emit('deleteNotification', res.data.notification);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}