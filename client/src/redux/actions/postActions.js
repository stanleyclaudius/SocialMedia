import { GLOBALTYPES } from './globalTypes';
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from './../../utils/fetchData';
import { uploadImage } from './../../utils/imageHelper';
import { createNotification, deleteNotification } from './notificationActions';

export const POST_TYPES = {
  LOADING: 'POST_LOADING',
  CREATE_POST: 'CREATE_POST',
  GET_POSTS: 'GET_POSTS',
  EDIT_POST: 'EDIT_POST',
  DELETE_POST: 'DELETE_POST',
  GET_POST: 'GET_POST'
};

export const getPosts = (token) => async(dispatch) => {
  try {
    dispatch({
      type: POST_TYPES.LOADING,
      payload: true
    });

    const res = await getDataAPI('post', token);
    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: {
        ...res.data,
        page: 2
      }
    })

    dispatch({
      type: POST_TYPES.LOADING,
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

export const createPost = ({content, images, auth}) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        loading: true
      }
    });

    let media = await uploadImage(images, 'post');
    const res = await postDataAPI('post', {
      content,
      images: media
    }, auth.token);

    dispatch({
      type: POST_TYPES.CREATE_POST,
      payload: {
        ...res.data.post,
        user: {
          _id: auth.user._id,
          name: auth.user.name,
          username: auth.user.username,
          avatar: auth.user.avatar
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
        error: err.response.data.msg
      }
    });
  }
}

export const editPost = ({content, images, post, auth}) => async(dispatch) => {
  const oldImages = images.filter(img => img.secure_url);
  const newImages = images.filter(img => !img.secure_url);
  
  if ((content === post.content) && (newImages.length === 0) && (oldImages.length === post.images.length)) return;

  try {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        loading: true
      }
    });

    let media = [];
    if (newImages.length > 0) media = await uploadImage(newImages, 'post');

    const res = await patchDataAPI(`post/${post._id}`, {
      content,
      images: [...oldImages, ...media]
    }, auth.token);

    dispatch({
      type: POST_TYPES.EDIT_POST,
      payload: res.data.post
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
        error: err.response.data.msg
      }
    });
  }
}

export const likePost = ({post, auth, socket}) => async(dispatch) => {
  const newPost = {
    ...post,
    likes: [
      ...post.likes,
      {
        _id: auth.user._id,
        name: auth.user.name,
        username: auth.user.username,
        avatar: auth.user.avatar
      }
    ]
  };

  dispatch({
    type: POST_TYPES.EDIT_POST,
    payload: newPost
  });

  socket.emit('likePost', newPost);

  try {
    await patchDataAPI(`post/like/${post._id}`, null, auth.token);

    // Create Notification
    const msg = {
      content: `${auth.user.username} just liked your post.`,
      url: `/post/${post._id}`,
      image: post.images[0].secure_url,
      recipients: [
        {user: post.user._id}
      ]
    };

    dispatch(createNotification({msg, auth}));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}

export const unlikePost = ({post, auth, socket}) => async(dispatch) => {
  const newPost = {
    ...post,
    likes: post.likes.filter(like => like._id !== auth.user._id)
  }

  dispatch({
    type: POST_TYPES.EDIT_POST,
    payload: newPost
  });

  socket.emit('unlikePost', newPost);

  try {
    await patchDataAPI(`post/unlike/${post._id}`, null, auth.token);

    const msg = {
      user: auth.user._id,
      url: `/post/${post._id}`
    };
    dispatch(deleteNotification({msg, auth}));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}

export const deletePost = ({id, auth}) => async(dispatch) => {
  try {
    const res = await deleteDataAPI(`post/${id}`, auth.token);
    dispatch({
      type: POST_TYPES.DELETE_POST,
      payload: res.data.post
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

export const getPost = ({postDetail, id, auth}) => async(dispatch) => {
  try {
    if (postDetail.every(item => item._id !== id)) {
      dispatch({
        type: POST_TYPES.LOADING,
        payload: true
      });

      const res = await getDataAPI(`post/${id}`, auth.token);
      dispatch({
        type: POST_TYPES.GET_POST,
        payload: res.data.post
      });

      dispatch({
        type: POST_TYPES.LOADING,
        payload: false
      });
    }
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.stack
      }
    });
  }
}

export const savedPost = ({post, auth}) => async(dispatch) => {
  const newUser = {
    ...auth.user,
    saved: [...auth.user.saved, post._id]
  };

  dispatch({
    type: GLOBALTYPES.AUTH,
    payload: {
      ...auth,
      user: newUser
    }
  });

  try {
    await patchDataAPI(`user/saved/${post._id}`, null, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}

export const unsavedPost = ({post, auth}) => async(dispatch) => {
  const newUser = {
    ...auth.user,
    saved: auth.user.saved.filter(item => item !== post._id)
  }

  dispatch({
    type: GLOBALTYPES.AUTH,
    payload: {
    ...auth,
    user: newUser
    }
  });

  try {
    await patchDataAPI(`user/unsaved/${post._id}`, null, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}