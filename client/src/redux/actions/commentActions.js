import { GLOBALTYPES } from './globalTypes';
import { POST_TYPES } from './postActions';
import { createNotification } from './notificationActions';
import { postDataAPI, patchDataAPI, deleteDataAPI } from './../../utils/fetchData';

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

    // Create Notification
    if (comment.reply) {
      const recipients = [
        post.user,
        comment.commentUser
      ];

      const contents = [
        `just commented on your post "${comment.content}".`,
        `just reply your comment "${comment.content}."`
      ];

      for (let i = 0; i < 2; i++) {
        const msg = {
          user: recipients[i],
          from: auth.user,
          content: contents[i],
          url: `/post/${post._id}`,
          image: post.images[0].secure_url
        };

        if (recipients[i]._id !== auth.user._id) {
          msg.special = true;
        }
        
        dispatch(createNotification({msg, auth, socket}));
      }
    } else {
      const msg = {
        user: post.user,
        from: auth.user,
        content: `just commented on your post "${comment.content}"."`,
        url: `/post/${post._id}`,
        image: post.images[0].secure_url
      };
  
      if (post.user._id !== auth.user._id) {
        msg.special = true;
      }
  
      dispatch(createNotification({msg, auth, socket}));
    }

    socket.emit('createComment', newPost);
    
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

    // Create Notification
    const msg = {
      from: auth.user,
      user: comment.user,
      url: `post/${post._id}`,
      content: `just liked your comment "${comment.content}"`,
    };

    if (post.user._id !== auth.user._id) {
      msg.special = true;
    }

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