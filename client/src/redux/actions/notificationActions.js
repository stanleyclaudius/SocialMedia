import { GLOBALTYPES } from './globalTypes';
import { postDataAPI } from './../../utils/fetchData';

export const NOTIFICATION_TYPES = {
  CREATE_NOTIFICATION: 'CREATE_NOTIFICATION'
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