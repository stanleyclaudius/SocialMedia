import { GLOBALTYPES } from './globalTypes';
import { POST_TYPES } from './postActions';
import { postDataAPI } from './../../utils/fetchData';

export const createComment = ({comment, post, auth}) => async(dispatch) => {
  const newPost = {
    ...post,
    comments: [...post.comments, comment]
  };

  dispatch({
    type: POST_TYPES.EDIT_POST,
    payload: newPost
  });

  try {
    const res = await postDataAPI('comment', {
      ...comment,
      postId: post._id
    }, auth.token);

    const newPost = {
      ...post,
      comments: [
        ...post.comments, 
        {
          ...res.data.newComment,
          user: auth.user
        }
      ]
    }
    
    dispatch({
      type: POST_TYPES.EDIT_POST,
      payload: newPost
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