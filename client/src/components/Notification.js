import Avatar from "./Avatar";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { readNotification } from './../redux/actions/notificationActions';

const Notification = ({id, avatar, content, url, isRead, setIsOpenNotification}) => {
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  const handleClick = () => {
    setIsOpenNotification(false);
    dispatch(readNotification({id, auth}));
  }

  return (
    <Link to={url} className='singleNotification' onClick={handleClick}>
      <div className="singleNotification__left">
        <Avatar size='small' src={avatar} />
        {!isRead && <div className='readIcon'></div>}
      </div>
      <div className="singleNotification__right">
        <p>
          {content}
        </p>
      </div>
    </Link>
  )
}

export default Notification;