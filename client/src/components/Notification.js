import Avatar from "./Avatar";
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
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
    <div className='singleNotification'>
      <Link to={url} className='singleNotification__content' onClick={handleClick}>
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
      <div className='singleNotification__delete'>
        <FaTrash />
      </div>
    </div>
  )
}

export default Notification;