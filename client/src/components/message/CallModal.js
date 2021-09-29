import { useState, useEffect } from 'react';
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

  const {auth, call, socket} = useSelector(state => state);
  const dispatch = useDispatch();

  const handleEndCall = () => {
    setAnswer(false);
    dispatch({
      type: GLOBALTYPES.CALL,
      payload: null
    });

    socket.emit('endCall', call);
  }

  const handleAnswerCall = () => {
    setAnswer(true);
    setTotal(0);
  }

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
        dispatch({
          type: GLOBALTYPES.CALL,
          payload: null
        })
      }
    }, 15000);

    return () => clearTimeout(endCall);
  }, [dispatch, answer]);

  return (
    <div className='callModal'>
      <div className="callModal__box">
        <Avatar src={call.avatar} size='big' />
        <p className='username'>{call.username}</p>
        <p className='name'>{call.name}</p>

        {
          !answer &&
          <>
            <small>{hours.toString().length < 2 ? '0' + hours : hours}</small>
            <small>:</small>
            <small>{mins.toString().length < 2 ? '0' + mins : mins}</small>
            <small>:</small>
            <small>{secs.toString().length < 2 ? '0' + secs : secs}</small>
          </>
        }

        {
          answer 
          ? (
            <div style={{marginBottom: '25px'}}>
              <small>{hours.toString().length < 2 ? '0' + hours : hours}</small>
              <small>:</small>
              <small>{mins.toString().length < 2 ? '0' + mins : mins}</small>
              <small>:</small>
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
    </div>
  )
}

export default CallModal;