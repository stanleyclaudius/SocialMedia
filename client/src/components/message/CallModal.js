import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdCall, MdCallEnd, MdVideocam } from 'react-icons/md';
import { GLOBALTYPES } from './../../redux/actions/globalTypes';
import Avatar from './../Avatar';

const CallModal = () => {
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [total, setTotal] = useState(0);
  const [answer, setAnswer] = useState(false);
  const [tracks, setTracks] = useState([]);

  const yourVideo = useRef();
  const otherVideo = useRef();

  const {auth, call, socket, peer} = useSelector(state => state);
  const dispatch = useDispatch();

  const handleEndCall = () => {
    tracks && tracks.forEach(track => track.stop());
    setAnswer(false);
    dispatch({
      type: GLOBALTYPES.CALL,
      payload: null
    });

    socket.emit('endCall', call);
  }

  const openStream = (video) => {
    const config = {audio: true, video};
    return navigator.mediaDevices.getUserMedia(config);
  }

  const playStream = (tag, stream) => {
    let video =  tag;
    video.srcObject = stream;
    video.play();
  }

  const handleAnswerCall = () => {
    setAnswer(true);
    openStream(call.video).then(stream => {
      playStream(yourVideo.current, stream);
      const track = stream.getTracks();
      setTracks(track);

      const newCall = peer.call(call.peerId, stream);
      newCall.on('stream', function(remoteStream) {
        playStream(otherVideo.current, remoteStream);
      });
    })
  }

  useEffect(() => {
    peer.on('call', newCall => {
      setAnswer(true);
      openStream(call.video).then(stream => {
        if (yourVideo.current) {
          playStream(yourVideo.current, stream);
        }

        const track = stream.getTracks();
        setTracks(track);

        newCall.answer(stream);

        newCall.on('stream', function(remoteStream) {
          if (otherVideo.current) {
            playStream(otherVideo.current, remoteStream);
          } 
        });
      })
    })

    return () => peer.removeListener('call');
  }, [peer, call.video]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTotal(t => t + 1);
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    setSecs(total % 60);
    setMins(parseInt(total / 60));
    setHours(parseInt(total / 3600));
  }, [total]);
  
  useEffect(() => {
    const endCall = setTimeout(() => {
      if (!answer) {
        socket.emit('endCall', call);
        dispatch({
          type: GLOBALTYPES.CALL,
          payload: null
        })
      }
    }, 15000);

    return () => clearTimeout(endCall);
  }, [dispatch, answer, call, socket]);

  useEffect(() => {
    if (answer) {
      setTotal(0);
    }
  }, [answer]);

  useEffect(() => {
    socket.on('endCallToClient', data => {
      tracks && tracks.forEach(track => track.stop());
      dispatch({
        type: GLOBALTYPES.CALL,
        payload: null
      })
    });

    return () => socket.off('endCallToClient');
  }, [socket, dispatch, tracks]);

  useEffect(() => {
    socket.on('callerDisconnect', () => {
      tracks && tracks.forEach(track => track.stop());
      dispatch({
        type: GLOBALTYPES.CALL,
        payload: null
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: 'User disconnect'
        }
      });
    });

    return () => socket.off('callerDisconnect');
  }, [socket, dispatch, tracks]);

  return (
    <div className='callModal'>
      <div className="callModal__box" style={{display: (answer && call.video) ? 'none' : 'block'}}>
        <Avatar src={call.avatar} size='big' />
        <p className='username'>{call.username}</p>
        <p className='name'>{call.name}</p>

        {
          !answer &&
          <>
            <small>{hours.toString().length < 2 ? '0' + hours : hours}</small>
            <small> : </small>
            <small>{mins.toString().length < 2 ? '0' + mins : mins}</small>
            <small> : </small>
            <small>{secs.toString().length < 2 ? '0' + secs : secs}</small>
          </>
        }

        {
          answer 
          ? (
            <div style={{marginBottom: '25px'}}>
              <small>{hours.toString().length < 2 ? '0' + hours : hours}</small>
              <small> : </small>
              <small>{mins.toString().length < 2 ? '0' + mins : mins}</small>
              <small> : </small>
              <small>{secs.toString().length < 2 ? '0' + secs : secs}</small>
            </div>
          )
          : <p className='calling'>Calling {call.video ? 'video' : 'audio'} ...</p>
        }

        <div className='callModal__icon'>
          {
            (call.recipient === auth.user._id && !answer) &&
            <>
              {call.video ? <MdVideocam onClick={handleAnswerCall} /> : <MdCall onClick={handleAnswerCall} />}
            </>
          }
          <MdCallEnd onClick={handleEndCall} />
        </div>
      </div>

      <div className="show__video" style={{display: (answer && call.video) ? 'block' : 'none'}}>
        <video ref={yourVideo} className='your__video' />
        <video ref={otherVideo} className='other__video' />

        <div className='videoCallTimespan'>
          <small>{hours.toString().length < 2 ? '0' + hours : hours}</small>
          <small> : </small>
          <small>{mins.toString().length < 2 ? '0' + mins : mins}</small>
          <small> : </small>
          <small>{secs.toString().length < 2 ? '0' + secs : secs}</small>

          <MdCallEnd onClick={handleEndCall} className='endVideoCallButton' />
        </div>
      </div>
    </div>
  )
}

export default CallModal;