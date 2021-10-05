import { GLOBALTYPES } from "./../constants/globalTypes";
import { MESSAGE_TYPES } from './../constants/messageTypes';
import { deleteDataAPI, getDataAPI, postDataAPI } from './../../utils/fetchData';

export const createMessage = ({msg, auth, socket}) => async(dispatch) => {
  dispatch({type: MESSAGE_TYPES.ADD_MESSAGE, payload: msg});

  socket.emit('createMessage', msg);
  
  try {
    await postDataAPI('message', {
      ...msg,
      sender: msg.sender._id,
      recipient: msg.recipient.user._id
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

export const getConversation = ({auth}) => async(dispatch) => {
  try {
    const res = await getDataAPI('conversation', auth.token);

    const newArr = [];
    res.data.conversation.forEach(item => {
      item.recipients.forEach(user => {
        if (user._id !== auth.user._id) {
          newArr.push({...item, user})
        }
      })
    });

    dispatch({
      type: MESSAGE_TYPES.GET_CONVERSATION,
      payload: newArr
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

export const getMessage = ({id, auth}) => async(dispatch) => {
  const res = await getDataAPI(`message/${id}`, auth.token);
  
  dispatch({
    type: MESSAGE_TYPES.GET_MESSAGE,
    payload: {
      ...res.data,
      messages: res.data.messages,
      _id: id,
    }
  });
}

export const deleteConversation = ({id, auth}) => async(dispatch) => {
  dispatch({
    type: MESSAGE_TYPES.DELETE_CONVERSATION,
    payload: id
  })
  
  try {
    await deleteDataAPI(`message/${id}`, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}