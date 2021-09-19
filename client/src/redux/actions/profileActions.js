import { GLOBALTYPES } from './globalTypes';
import { getDataAPI } from './../../utils/fetchData';

export const PROFILE_TYPES = {
  LOADING: 'PROFILE_LOADING',
  GET_USER_PROFILE: 'GET_USER_PROFILE'
};

export const getUserProfile = ({id, token}) => async(dispatch) => {
  try {
    dispatch({
      type: PROFILE_TYPES.LOADING,
      payload: true
    });

    const res = await getDataAPI(`profile/${id}`, token);
    dispatch({
      type: PROFILE_TYPES.GET_USER_PROFILE,
      payload: res.data.user
    });

    dispatch({
      type: PROFILE_TYPES.LOADING,
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