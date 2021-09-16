import Avatar from './Avatar';
import FollowBtn from './FollowBtn';

const UserCard = ({message}) => {
  return (
    <div className='userCard'>
      <div className="userCard__left">
        <Avatar size='small' />
        <div>
          <p>username02</p>
          <small>{message}</small>
        </div>
      </div>
      
      {
        !message && (
          <div className="userCard__right">
            <FollowBtn />
          </div>
        )
      }
    </div>
  )
}

export default UserCard;