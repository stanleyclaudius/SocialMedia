import UserCard from './../UserCard';
import { AiOutlineClose } from 'react-icons/ai';

const Followers = ({followings, active, setIsOpenFollowings}) => {
  return (
    <div className={`followModal ${active ? 'active' : ''}`}>
      <div className={`followModal__box ${active ? 'active' : ''}`}>
        <div className="followModal__header">
          <h3>{followings?.length > 1 ? 'Followings' : 'Following'}</h3>
          <AiOutlineClose onClick={() => setIsOpenFollowings(false)} />
        </div>
        <div className="followModal__body">
          {
            followings?.length === 0
            ? (
              <div style={{color: 'red', textAlign: 'center'}}>
                <h3>No Following Found.</h3>
              </div>
            )
            : (
              <>
                {
                  followings?.map(item => (
                    <UserCard key={item._id} user={item} setIsOpenFollowings={setIsOpenFollowings} />
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