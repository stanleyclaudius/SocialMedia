import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POST_TYPES } from './redux/actions/postActions';
import { MESSAGE_TYPES } from './redux/actions/messageActions';
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
  const {auth, socket, status} = useSelector(state => state);

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

  // Create Message
  useEffect(() => {
    socket.on('createMessageToClient', data => {
      dispatch({
        type: MESSAGE_TYPES.ADD_MESSAGE,
        payload: data
      });

      dispatch({
        type: MESSAGE_TYPES.ADD_USER,
        payload: {
          text: data.text,
          media: data.media,
          call: data.call,
          user: data.sender
        }
      })
    });

    return () => socket.off('createMessageToClient');
  }, [dispatch, socket]);

  // Check User Online
  useEffect(() => {
    socket.emit('checkUserOnline', auth.user);
  }, [socket, auth.user]);

  useEffect(() => {
    socket.on('checkUserOnlineToMe', data => {
      data.forEach(item => {
        if (!status.includes(item.id)) {
          dispatch({
            type: GLOBALTYPES.ONLINE,
            payload: item.id
          })
        }
      })
    });
    
    return () => socket.off('checkUserOnlineToMe');
  }, [socket, dispatch, status]);

  useEffect(() => {
    socket.on('checkUserOnlineToClient', id => {
      if (!status.includes(id)) {
        dispatch({
          type: GLOBALTYPES.ONLINE,
          payload: id
        })
      }
    });

    return () => socket.off('chekUserOnlineToClient');
  }, [socket, dispatch, status]);

  // Check User Offline
  useEffect(() => {
    socket.on('checkUserOffline', id => {
      dispatch({
        type: GLOBALTYPES.OFFLINE,
        payload: id
      })
    });

    return () => socket.off('checkUserOffline');
  }, [socket, dispatch]);

  // Call User
  useEffect(() => {
    socket.on('callUserToClient', data => {
      dispatch({
        type: GLOBALTYPES.CALL,
        payload: data
      })
    });

    return () => socket.off('callUserToClient');
  }, [socket, dispatch]);

  // User Busy
  useEffect(() => {
    socket.on('userBusy', data => {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: 'User is on another call.'
        }
      })
    });

    return () => socket.off('userBusy');
  }, [socket, dispatch]);

  return (
    <div>
      <audio controls ref={audioRef} style={{display: 'none'}}>
        <source src={notificationSound} type='audio/mp3' />
      </audio>
    </div>
  );
}

export default SocketClient;