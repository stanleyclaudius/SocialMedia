import { GLOBALTYPES } from './globalTypes';
import { postDataAPI } from './../../utils/fetchData';
import { uploadImage } from './../../utils/imageHelper';

export const POST_TYPES = {
  LOADING: 'POST_LOADING',
  CREATE_POST: 'CREATE_POST'
};

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