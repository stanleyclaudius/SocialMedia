import UserCard from './../UserCard';
import { AiOutlineClose } from 'react-icons/ai';

const Followers = ({followers, active, setIsOpenFollowers}) => {

  return (
    <div className={`followModal ${active ? 'active' : ''}`}>
      <div className={`followModal__box ${active ? 'active' : ''}`}>
        <div className="followModal__header">
          <h3>Followers</h3>
          <AiOutlineClose onClick={() => setIsOpenFollowers(false)} />
        </div>
        <div className="followModal__body">
          {
            followers?.map(item => (
              <UserCard key={item._id} user={item} setIsOpenFollowers={setIsOpenFollowers} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Followers;