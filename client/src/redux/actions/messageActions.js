import { GLOBALTYPES } from "./globalTypes";
import { postDataAPI } from './../../utils/fetchData';

export const MESSAGE_TYPES = {
  ADD_USER: 'ADD_USER',
  ADD_MESSAGE: 'ADD_MESSAGE',
  GET_CONVERSATION: 'GET_CONVERSATION',
  GET_MESSAGE: 'GET_MESSAGE'
};

export const createMessage = ({msg, auth}) => async(dispatch) => {
  dispatch({type: MESSAGE_TYPES.ADD_MESSAGE, payload: msg});
  
  try {
    await postDataAPI('message', msg, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}