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

  const {call} = useSelector(state => state);
  const dispatch = useDispatch();

  const handleEndCall = () => {
    dispatch({
      type: GLOBALTYPES.CALL,
      payload: null
    });
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
  }, [total])

  return (
    <div className='callModal'>
      <div className="callModal__box">
        <Avatar src={call.avatar} size='big' />
        <p className='username'>{call.username}</p>
        <p className='name'>{call.name}</p>

        <small>{hours.toString().length < 2 ? '0' + hours : hours}</small>
        <small>:</small>
        <small>{mins.toString().length < 2 ? '0' + mins : mins}</small>
        <small>:</small>
        <small>{secs.toString().length < 2 ? '0' + secs : secs}</small>

        <p className='calling'>Calling {call.video ? 'video' : 'audio'} ...</p>

        <div className='callModal__icon'>
          {call.video ? <MdVideocam /> : <MdCall />}
          <MdCallEnd onClick={handleEndCall} />
        </div>
      </div>
    </div>
  )
}

export default CallModal;