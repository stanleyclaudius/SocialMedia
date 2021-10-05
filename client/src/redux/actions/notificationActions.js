import { GLOBALTYPES } from './../constants/globalTypes';
import { NOTIFICATION_TYPES } from './../constants/notificationTypes';
import { getDataAPI, postDataAPI, patchDataAPI, deleteDataAPI } from './../../utils/fetchData';

export const createNotification = ({msg, auth, socket}) => async(dispatch) => {
  try {
    console.log(msg)
    const res = await postDataAPI('notification', {
      ...msg,
      user: msg.user._id,
      from: msg.from._id
    }, auth.token);

    socket.emit('createNotification', {
      ...res.data.notification,
      user: msg.user,
      from: msg.from
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

export const readNotification = ({id, auth}) => async(dispatch) => {
  dispatch({type: NOTIFICATION_TYPES.READ_NOTIFICATION, payload: id});

  try {
    await patchDataAPI(`notification/${id}`, null, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}

export const deleteNotification = ({id, auth}) => async(dispatch) => {
  dispatch({
    type: NOTIFICATION_TYPES.DELETE_NOTIFICATION,
    payload: id
  });

  try {
    await deleteDataAPI(`notification/${id}`, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}