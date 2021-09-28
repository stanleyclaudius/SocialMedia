import Avatar from './Avatar';
import FollowBtn from './FollowBtn';
import { Link } from 'react-router-dom';
import { MdPhotoSizeSelectActual } from 'react-icons/md';
import { BsCircleFill } from 'react-icons/bs';

const UserCard = ({user, msg, setIsOpenFollowers, setIsOpenFollowings, onMessage, status}) => {
  const handleCloseAll = () => {
    if (setIsOpenFollowings) setIsOpenFollowings(false);
    if (setIsOpenFollowers) setIsOpenFollowers(false);
  }

  return (
    <div className='userCard' onClick={handleCloseAll}>
      {
        onMessage
        ? (
          <div>
            <div className="userCard__left">
              <Avatar src={msg.user?.avatar} size='small' />
              <div>
                <p>{msg.user?.username}</p>
                {
                  msg.media.length > 0 
                  ? (
                    <small style={{display: 'flex', marginTop: '4px', alignItems: 'center'}}>
                      {msg.media.length}
                      <MdPhotoSizeSelectActual style={{marginLeft: '5px', transform: 'translateY(-1px)'}} />
                    </small>
                  )
                  : <small>{msg.text}</small>
                }
              </div>
            </div>
          </div>
        )
        : (
          <Link style={{color: '#000', textDecoration: 'none'}} to={`/profile/${user?._id}`}>
            <div className="userCard__left">
              <Avatar src={user?.avatar} size='small' />
              <div>
                <p>{user?.username}</p>
              </div>
            </div>
          </Link>
        )
      }
      
      {
        <div className="userCard__right">
          {
            status === 'online'
            ? <BsCircleFill style={{color: 'green', fontSize: '11px'}} />
            : <BsCircleFill style={{color: '#aaa', fontSize: '11px'}} />
          }
        </div>
      }
      
      {
        !msg && (
          <div className="userCard__right">
            <FollowBtn user={user} />
          </div>
        )
      }
    </div>
  )
}

export default UserCard;