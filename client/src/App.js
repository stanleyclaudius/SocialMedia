import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from './redux/actions/authActions';
import { getNotification } from './redux/actions/notificationActions';
import { GLOBALTYPES } from './redux/constants/globalTypes';
import io from 'socket.io-client';
import PageRender from './custom_routes/PageRender';
import SocketClient from './SocketClient';
import PrivateRoute from './custom_routes/PrivateRoute';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Header from './components/header/Header';
import Alert from './components/Alert';
import CallModal from './components/message/CallModal';
import Peer from 'peerjs';

function App() {
  const dispatch = useDispatch();
  const {auth, call} = useSelector(state => state);

  useEffect(() => {
    dispatch(refreshToken());

    const socket = io();
    dispatch({type: GLOBALTYPES.SOCKET, payload: socket});
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token)
      dispatch(getNotification(auth.token));
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {}
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {}
      });
    }
  },[]);

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: '/',
      secure: true
    });

    dispatch({
      type: GLOBALTYPES.PEER,
      payload: newPeer
    })
  }, [dispatch]);

  return (
    <Router>
      {auth.token && <Header />}
      {auth.token && <SocketClient />}
      {call && <CallModal />}
      <Alert />
      <Routes>
        <Route path='/' element={auth.token ? <Home /> : <Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/:page' element={<PrivateRoute />}>
          <Route path='/:page' element={<PageRender />} />
        </Route>
        <Route path='/:page/:id' element={<PrivateRoute />}>
          <Route path='/:page/:id' element={<PageRender />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;