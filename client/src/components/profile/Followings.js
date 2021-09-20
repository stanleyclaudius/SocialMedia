import UserCard from './../UserCard';
import { AiOutlineClose } from 'react-icons/ai';

const Followers = ({followings, active, setIsOpenFollowings}) => {
  return (
    <div className={`followModal ${active ? 'active' : ''}`}>
      <div className={`followModal__box ${active ? 'active' : ''}`}>
        <div className="followModal__header">
          <h3>Followings</h3>
          <AiOutlineClose onClick={() => setIsOpenFollowings(false)} />
        </div>
        <div className="followModal__body">
          {
            followings?.map(item => (
              <UserCard key={item._id} user={item} setIsOpenFollowings={setIsOpenFollowings} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Followers;