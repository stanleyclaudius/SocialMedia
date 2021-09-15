import PostCard from './../components/post/PostCard';
import Avatar from './../components/Avatar';
import UserCard from '../components/UserCard';
import { MdRefresh } from 'react-icons/md';

const Home = () => {
  return (
    <div className='container home'>
      <div className="homeLeft">
        <PostCard />
      </div>
      <div className="homeRight">
        <div className="homeRight__user">
          <Avatar size='medium' />
          <p>username01</p>
        </div>
        <div className='reloadGroup'>
          <h4>Suggestions For You</h4>
          <MdRefresh />
        </div>
        <div className="homeRight__suggestions">
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </div>
    </div>
  )
}

export default Home;