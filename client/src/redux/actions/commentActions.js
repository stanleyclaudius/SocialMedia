import { GLOBALTYPES } from './globalTypes';
import { POST_TYPES } from './postActions';
import { postDataAPI, patchDataAPI, deleteDataAPI } from './../../utils/fetchData';
import { createNotification, deleteNotification } from './notificationActions';

export const createComment = ({comment, post, auth, socket}) => async(dispatch) => {
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

    socket.emit('createComment', newPost);
    
    dispatch({
      type: POST_TYPES.EDIT_POST,
      payload: newPost
    });

    const msg = {
      id: res.data.newComment._id,
      content: comment.reply ? `${auth.user.username} reply your comment "${comment.content}"` : `${auth.user.username} commented on your post "${comment.content}".`,
      url: `/post/${post._id}`,
      image: post.images[0].secure_url,
      recipients: comment.reply ? [{user: comment.tag}] : [{user: post.user._id}]
    };

    dispatch(createNotification({msg, auth, socket}));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}

export const editComment = ({comment, post, auth, socket}) => async(dispatch) => {
  const newPost = {
    ...post,
    comments: post.comments.map(comm => comm._id === comment._id ? comment : comm)
  };

  dispatch({
    type: POST_TYPES.EDIT_POST,
    payload: newPost
  });

  socket.emit('editComment', newPost);

  try {
    await patchDataAPI(`comment/${comment._id}`, {content: comment.content}, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}

export const likeComment = ({comment, post, auth, socket}) => async(dispatch) => {
  const newComment = {
    ...comment,
    likes: [...comment.likes, auth.user]
  };

  const newPost = {
    ...post,
    comments: post.comments.map(comm => comm._id === newComment._id ? newComment : comm)
  };

  dispatch({
    type: POST_TYPES.EDIT_POST,
    payload: newPost
  });

  socket.emit('likeComment', newPost);

  try {
    await patchDataAPI(`comment/like/${comment._id}`, null, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}

export const unlikeComment = ({comment, post, auth, socket}) => async(dispatch) => {
  const newComment = {
    ...comment,
    likes: comment.likes.filter(comm => comm._id !== auth.user._id)
  };

  const newPost = {
    ...post,
    comments: post.comments.map(comm => comm._id === newComment._id ? newComment : comm)
  };

  dispatch({
    type: POST_TYPES.EDIT_POST,
    payload: newPost
  });

  socket.emit('unlikeComment', newPost);

  try {
    await patchDataAPI(`comment/unlike/${comment._id}`, null, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}

export const deleteComment = ({post, comment, auth, socket}) => async(dispatch) => {
  const deletedId = findAllRelatedComment(post.comments, comment._id, [comment._id]);
  const newComments = post.comments.filter(comm => !deletedId.includes(comm._id));

  const newPost = {
    ...post,
    comments: newComments
  }

  dispatch({
    type: POST_TYPES.EDIT_POST,
    payload: newPost
  });

  socket.emit('deleteComment', newPost);

  try {
    deletedId.forEach(async item => {
      await deleteDataAPI(`/comment/${item}`, auth.token);
    })
    
    const msg = {
      id: comment._id,
      url: `/post/${post._id}`,
    };

    dispatch(deleteNotification({msg, auth, socket}));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}

const findAllRelatedComment = (data, id, result) => {
  const arr = data.filter(item => item.reply === id);
  if (arr.length === 0) return result;

  arr.forEach(item => {
    result.push(item._id);
    findAllRelatedComment(data, item._id, result);
  })

  return result;
}