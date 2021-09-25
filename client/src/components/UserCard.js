import Avatar from './Avatar';
import FollowBtn from './FollowBtn';
import { Link } from 'react-router-dom';

const UserCard = ({user, message, setIsOpenFollowers, setIsOpenFollowings, onMessage}) => {
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
              <Avatar src={user?.avatar} size='small' />
              <div>
                <p>{user?.username}</p>
                <small>{message}</small>
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
                <small>{message}</small>
              </div>
            </div>
          </Link>
        )
      }
      
      
      {
        !message && (
          <div className="userCard__right">
            <FollowBtn user={user} />
          </div>
        )
      }
    </div>
  )
}

export default UserCard;