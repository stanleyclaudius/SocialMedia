import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POST_TYPES } from './redux/actions/postActions';
import { NOTIFICATION_TYPES } from './redux/actions/notificationActions';
import { GLOBALTYPES } from './redux/actions/globalTypes';

const SocketClient = () => {
  const dispatch = useDispatch();
  const {auth, socket} = useSelector(state => state);

  // Connect
  useEffect(() => {
    socket.emit('joinUser', auth.user);
  }, [socket, auth.user]);

  // Like Post
  useEffect(() => {
    socket.on('likePostToClient', data => {
      dispatch({
        type: POST_TYPES.EDIT_POST,
        payload: data
      })
    });

    return () => socket.off('likePostToClient');
  }, [dispatch, socket]);

  // Unlike Post
  useEffect(() => {
    socket.on('unlikePostToClient', data => {
      dispatch({
        type: POST_TYPES.EDIT_POST,
        payload: data
      })
    });

    return () => socket.off('unlikePostToClient');
  }, [dispatch, socket]);

  // Create Comment
  useEffect(() => {
    socket.on('createCommentToClient', data => {
      dispatch({
        type: POST_TYPES.EDIT_POST,
        payload: data
      });
    });

    return () => socket.off('createCommentToClient');
  }, [dispatch, socket]);

  // Delete Comment
  useEffect(() => {
    socket.on('deleteCommentToClient', data => {
      dispatch({
        type: POST_TYPES.EDIT_POST,
        payload: data
      })
    });
    
    return () => socket.off('deleteCommentToClient');
  }, [dispatch, socket]);

  // Like Comment
  useEffect(() => {
    socket.on('likeCommentToClient', data => {
      dispatch({
        type: POST_TYPES.EDIT_POST,
        payload: data
      })
    });

    return () => socket.off('likeCommentToClient');
  }, [dispatch, socket]);

  // Unlike Comment
  useEffect(() => {
    socket.on('unlikeCommentToClient', data => {
      dispatch({
        type: POST_TYPES.EDIT_POST,
        payload: data
      })
    });

    return () => socket.off('unlikeCommentToClient');
  }, [dispatch, socket]);

  // Edit Comment
  useEffect(() => {
    socket.on('editCommentToClient', data => {
      dispatch({
        type: POST_TYPES.EDIT_POST,
        payload: data
      })
    });

    return () => socket.off('editCommentToClient');
  }, [dispatch, socket]);

  // Follow User
  useEffect(() => {
    socket.on('followToClient', data => {
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: data
        }
      });
    });

    return () => socket.off('followToClient');
  }, [dispatch, auth, socket]);

  // Unfollow User
  useEffect(() => {
    socket.on('unfollowToClient', data => {
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: data
        }
      });
    });

    return () => socket.off('unfollowToClient');
  }, [dispatch, socket, auth]);

  // Create Notification
  useEffect(() => {
    socket.on('createNotificationToClient', data => {
      dispatch({
        type: NOTIFICATION_TYPES.CREATE_NOTIFICATION,
        payload: data
      });
    });

    return () => socket.off('createNotificationToClient');
  }, [dispatch, socket]);

  useEffect(() => {
    socket.on('deleteNotificationToClient', data => {
      dispatch({
        type: NOTIFICATION_TYPES.DELETE_NOTIFICATION,
        payload: data
      })
    });

    return () => socket.off('deleteNotificationToClient');
  }, [dispatch, socket]);

  return (
    <></>
  );
}

export default SocketClient;