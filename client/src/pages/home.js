import { useState, useEffect } from 'react';
import { MdRefresh } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './../redux/actions/postActions';
import PostCard from './../components/post/PostCard';
import Avatar from './../components/Avatar';
import UserCard from '../components/UserCard';
import PostModal from './../components/post/PostModal';
import HeadInfo from './../utils/HeadInfo';
import Loading from './../components/Loading';

const Home = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatch = useDispatch();
  const {homePost, auth} = useSelector(state => state);

  useEffect(() => {
    dispatch(getPosts(auth.token));
  }, [dispatch, auth.token]);

  return (
    <>
      <HeadInfo title='SR Social - Home' />
      <div className='container home'>
        <div className="homeLeft">
          {
            homePost.loading
            ? (
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <Loading />
              </div>
            )
            : (
              <>
                {
                  homePost.result === 0
                  ? (
                    <div style={{textAlign: 'center', color: 'red'}}>
                      <h2>No Post</h2>
                    </div>
                  )
                  : (
                    <>
                      {
                        homePost.posts.map(post => (
                          <PostCard key={post._id} post={post} />
                        ))
                      }
                    </>
                  )
                }
              </>
            )
          }
        </div>
        <div className="homeRight">
          <div className="homeRight__user">
            <div>
              <Avatar src={auth.user.avatar} size='medium' />
              <div>
                <p style={{marginBottom: '5px'}}><strong>{auth.user.username}</strong></p>
                <p>{auth.user.name}</p>
              </div>
            </div>
            <div>
              <button onClick={() => setIsOpenModal(true)}>Create Post</button>
            </div>
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

      {isOpenModal && <PostModal setIsOpenModal={setIsOpenModal} />}
    </>
  )
}

export default Home;