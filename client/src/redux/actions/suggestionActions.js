import { GLOBALTYPES } from './../constants/globalTypes';
import { SUGGESTION_TYPES } from './../constants/suggestionTypes';
import { getDataAPI } from './../../utils/fetchData';

export const getSuggestion = (token) => async(dispatch) => {
  try {
    dispatch({
      type: SUGGESTION_TYPES.LOADING,
      payload: true
    });

    const res = await getDataAPI('user/suggestion', token);
    dispatch({
      type: SUGGESTION_TYPES.GET_SUGGESTION,
      payload: res.data.users
    });

    dispatch({
      type: SUGGESTION_TYPES.LOADING,
      payload: false
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