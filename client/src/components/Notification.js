import Avatar from "./Avatar";
import { Link } from 'react-router-dom';

const Notification = ({avatar, content, url, isRead, setIsOpenNotification}) => {
  return (
    <Link to={url} className='singleNotification' onClick={() => setIsOpenNotification(false)}>
      <div className="singleNotification__left">
        <Avatar size='small' src={avatar} />
        {!isRead && <div className='readIcon'></div>}
      </div>
      <div className="singleNotification__right">
        <p>
          {/* <span>username01</span> just liked your post. */}
          {content}
        </p>
      </div>
    </Link>
  )
}

export default Notification;