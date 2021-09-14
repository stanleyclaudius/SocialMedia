import Avatar from './Avatar';
import FollowBtn from './FollowBtn';

const UserCard = () => {
  return (
    <div className='userCard'>
      <div className="userCard__left">
        <Avatar size='small' />
        <p>username02</p>
      </div>
      <div className="userCard__right">
        <FollowBtn />
      </div>
    </div>
  )
}

export default UserCard;