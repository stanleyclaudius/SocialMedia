import { GLOBALTYPES } from './globalTypes';
import { getDataAPI, postDataAPI, deleteDataAPI, patchDataAPI } from './../../utils/fetchData';

export const NOTIFICATION_TYPES = {
  GET_NOTIFICATION: 'GET_NOTIFICATION',
  CREATE_NOTIFICATION: 'CREATE_NOTIFICATION',
  DELETE_NOTIFICATION: 'DELETE_NOTIFICATION',
  EDIT_NOTIFICATION: 'EDIT_NOTIFICATION'
};

export const createNotification = ({msg, auth}) => async(dispatch) => {
  try {
    await postDataAPI('notification', msg, auth.token);
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

export const deleteNotification = ({msg, auth}) => async(dispatch) => {
  try {
    await deleteDataAPI(`notification/${msg.id}?url=${msg.url}`, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}