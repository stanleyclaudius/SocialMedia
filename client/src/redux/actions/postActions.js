import { GLOBALTYPES } from './globalTypes';
import { getDataAPI, postDataAPI } from './../../utils/fetchData';
import { uploadImage } from './../../utils/imageHelper';

export const POST_TYPES = {
  LOADING: 'POST_LOADING',
  CREATE_POST: 'CREATE_POST',
  GET_POSTS: 'GET_POSTS'
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
      payload: res.data
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