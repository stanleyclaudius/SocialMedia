import { GLOBALTYPES } from './../constants/globalTypes';
import { PROFILE_TYPES } from './../constants/profileTypes';
import { uploadImage } from './../../utils/imageHelper';
import { getDataAPI, patchDataAPI } from './../../utils/fetchData';
import { createNotification } from './../actions/notificationActions';

export const getUserProfile = ({id, token}) => async(dispatch) => {
  try {
    dispatch({
      type: PROFILE_TYPES.LOADING,
      payload: true
    });

    const infoRes = await getDataAPI(`profile/${id}`, token);
    dispatch({
      type: PROFILE_TYPES.GET_USER_PROFILE,
      payload: infoRes.data.user
    });

    const postRes = await getDataAPI(`post/user/${id}`, token);
    dispatch({
      type: PROFILE_TYPES.GET_POST,
      payload: {
        userPosts: postRes.data.posts,
        result:  postRes.data.result,
        _id: id,
        page: 2
      }
    })

    dispatch({
      type: PROFILE_TYPES.LOADING,
      payload: false
    });
  } catch (err) {
    dispatch({
      type: PROFILE_TYPES.LOADING,
      payload: false
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

export const followUser = ({user, auth, socket}) => async(dispatch) => {
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
    const res = await patchDataAPI(`follow/${user._id}`, null, auth.token);

    // Create Notification
    const msg = {
      user: user,
      from: auth.user,
      content: 'just follow you.',
      url: `/profile/${auth.user._id}`,
      special: true
    }

    dispatch(createNotification({msg, auth, socket}));

    socket.emit('follow', res.data.newUser);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}

export const unfollowUser = ({user, auth, socket}) => async(dispatch) => {
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
    const res = await patchDataAPI(`unfollow/${user._id}`, null, auth.token);
    socket.emit('unfollow', res.data.newUser);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}