import { GLOBALTYPES } from './globalTypes';
import { uploadImage } from './../../utils/imageHelper';
import { getDataAPI, patchDataAPI } from './../../utils/fetchData';

export const PROFILE_TYPES = {
  LOADING: 'PROFILE_LOADING',
  GET_USER_PROFILE: 'GET_USER_PROFILE',
  FOLLOW: 'FOLLOW',
  UNFOLLOW: 'UNFOLLOW'
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
      type: GLOBALTYPES.ALERT,
      payload: {
        loading: true
      }
    });

    let media;
    if (avatar)
      media = await uploadImage([avatar], 'avatar');

    const res = await patchDataAPI('profile', {
      ...userData,
      avatar: avatar ? media[0].secure_url : auth.user.avatar
    }, auth.token);

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
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.reponse.data.msg
      }
    });
  }
}

export const followUser = ({user, auth}) => async(dispatch) => {
  let newUser = {...user, followers: [...user.followers, auth.user]};

  dispatch({
    type: PROFILE_TYPES.FOLLOW,
    payload: newUser
  });

  dispatch({
    type: GLOBALTYPES.AUTH,
    payload: {
      ...auth,
      user: {
        ...auth.user,
        followings: [...auth.user.followings, newUser]
      }
    }
  });

  try {

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}

export const unfollowUser = ({user, auth}) => async(dispatch) => {
  const newUser = {...user, followers: user.followers.filter(item => item._id !== auth.user._id)};

  dispatch({
    type: PROFILE_TYPES.UNFOLLOW,
    payload: newUser
  });

  dispatch({
    type: GLOBALTYPES.AUTH,
    payload: {
      ...auth,
      user: {
        ...auth.user,
        followings: auth.user.followings.filter(item => item._id !== user._id)
      }
    }
  });

  try {

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}