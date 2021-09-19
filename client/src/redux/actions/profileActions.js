import { GLOBALTYPES } from './globalTypes';
import { uploadImage } from './../../utils/imageHelper';
import { getDataAPI, patchDataAPI } from './../../utils/fetchData';

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

export const editProfile = ({userData, avatar, auth}) => async(dispatch) => {
  try {
    dispatch({
      type: PROFILE_TYPES.LOADING,
      payload: true
    });

    let media;
    if (avatar)
      media = await uploadImage([avatar], 'avatar');

    const res = await patchDataAPI('profile', {
      ...userData,
      avatar: avatar ? media[0].secure_url : auth.user.avatar
    }, auth.token);
    
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    });

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          ...userData,
          avatar: avatar ? media[0].secure_url : auth.user.avatar
        }
      }
    });

    dispatch({
      type: PROFILE_TYPES.LOADING,
      payload: false
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.stack
      }
    });
  }
}