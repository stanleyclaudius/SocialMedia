import UserCard from './../UserCard';
import { AiOutlineClose } from 'react-icons/ai';

const Followers = ({active, setIsOpenFollowings}) => {
  return (
    <div className={`followModal ${active ? 'active' : ''}`}>
      <div className={`followModal__box ${active ? 'active' : ''}`}>
        <div className="followModal__header">
          <h3>Followings</h3>
          <AiOutlineClose onClick={() => setIsOpenFollowings(false)} />
        </div>
        <div className="followModal__body">
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </div>
    </div>
  )
}

export default Followers;