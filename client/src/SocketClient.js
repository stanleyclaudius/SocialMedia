import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POST_TYPES } from './redux/actions/postActions';
import { NOTIFICATION_TYPES } from './redux/actions/notificationActions';
import { GLOBALTYPES } from './redux/actions/globalTypes';
import notificationSound from './audio/got-it-done-613.mp3'

const spawnNotification = (body, icon, url, title) => {
  let options = {
    body, icon
  };

  let n = new Notification(title, options);

  n.onClick = e => {
    e.preventDefault();
    window.open(url, '_blank');
  }
};

const SocketClient = () => {
  const dispatch = useDispatch();
  const {auth, socket} = useSelector(state => state);

  const audioRef = useRef();

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

      audioRef.current.play();
      spawnNotification(
        data.content,
        data.user.avatar,
        data.url,
        'SR-Social'
      );
    });

    return () => socket.off('createNotificationToClient');
  }, [dispatch, socket]);


  // Delete Notification
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
    <div>
      <audio controls ref={audioRef} style={{display: 'none'}}>
        <source src={notificationSound} type='audio/mp3' />
      </audio>
    </div>
  );
}

export default SocketClient;