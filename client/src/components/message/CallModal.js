import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdCall, MdCallEnd, MdVideocam } from 'react-icons/md';
import { GLOBALTYPES } from './../../redux/constants/globalTypes';
import { createMessage } from './../../redux/actions/messageActions';
import Avatar from './../Avatar';
import CallAudio from './../../audio/ringtone.mp3';

const CallModal = () => {
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [total, setTotal] = useState(0);
  const [answer, setAnswer] = useState(false);
  const [tracks, setTracks] = useState([]);

  const yourVideo = useRef();
  const otherVideo = useRef();
  const audioRef = useRef();

  const {auth, call, socket, peer} = useSelector(state => state);
  const dispatch = useDispatch();

  const addCallMessage = useCallback((call, times, disconnect) => {
    if (call.recipient !== auth.user._id || disconnect) {
      const msg = {
        sender: {
          _id: call.sender
        },
        recipient: {
          user: {
            _id: call.recipient
          }
        },
        text: '',
        media: [],
        call: {
          times,
          video: call.video
        },
        createdAt: new Date().toISOString()
      };
      
      dispatch(createMessage({msg, auth, socket}));
    }
  }, [dispatch, socket, auth]);

  const handleEndCall = () => {
    tracks && tracks.forEach(track => track.stop());
    let times = answer ? total : 0;
    addCallMessage(call, times);
    setAnswer(false);
    dispatch({
      type: GLOBALTYPES.CALL,
      payload: null
    });
    socket.emit('endCall', {...call, times});
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
    openStream(call.video).then(stream => {
      setAnswer(true);
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
    if (!answer) {
      const endCall = setTimeout(() => {
        socket.emit('endCall', {...call, times: 0});
        addCallMessage(call, 0);
        dispatch({
          type: GLOBALTYPES.CALL,
          payload: null
        })
      }, 15000);

      return () => clearTimeout(endCall);
    }
  }, [dispatch, answer, call, socket, addCallMessage]);

  useEffect(() => {
    if (answer) {
      setTotal(0);
    }
  }, [answer]);

  useEffect(() => {
    socket.on('endCallToClient', data => {
      tracks && tracks.forEach(track => track.stop());
      addCallMessage(data, data.times);
      dispatch({
        type: GLOBALTYPES.CALL,
        payload: null
      })
    });

    return () => socket.off('endCallToClient');
  }, [socket, dispatch, tracks, addCallMessage]);

  useEffect(() => {
    socket.on('callerDisconnect', () => {
      tracks && tracks.forEach(track => track.stop());
      const times = answer ? total : 0;
      addCallMessage(call, times, true);
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
  }, [socket, dispatch, tracks, addCallMessage, answer, call, total]);

  useEffect(() => {
    if (answer) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }
  }, [answer]);

  return (
    <div className='callModal'>
      <audio controls ref={audioRef} style={{display: 'none'}} loop>
        <source src={CallAudio} type='audio/mp3' />
      </audio>
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