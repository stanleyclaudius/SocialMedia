import UserCard from './../UserCard';
import { AiOutlineClose } from 'react-icons/ai';

const Followers = ({followers, active, setIsOpenFollowers}) => {

  return (
    <div className={`followModal ${active ? 'active' : ''}`}>
      <div className={`followModal__box ${active ? 'active' : ''}`}>
        <div className="followModal__header">
          <h3>{followers?.length > 1 ? 'Followers' : 'Follower'}</h3>
          <AiOutlineClose onClick={() => setIsOpenFollowers(false)} />
        </div>
        <div className="followModal__body">
          {
            followers?.length === 0
            ? (
              <div style={{color: 'red', textAlign: 'center'}}>
                <h3>No Follower Found.</h3>
              </div>
            )
            : (
              <>
                {
                  followers?.map(item => (
                    <UserCard key={item._id} user={item} setIsOpenFollowers={setIsOpenFollowers} />
                  ))
                }
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Followers;