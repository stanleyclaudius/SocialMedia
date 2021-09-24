import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POST_TYPES } from './redux/actions/postActions';

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
  }, [dispatch, socket]);

  return (
    <></>
  );
}

export default SocketClient;