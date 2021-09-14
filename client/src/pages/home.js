import React from 'react';
import PostCard from './../components/post/PostCard';

const Home = () => {
  return (
    <div className='container home'>
      <div className="homeLeft">
        <PostCard />
      </div>
      <div className="homeRight">
        Suggestion user here
      </div>
    </div>
  )
}

export default Home;