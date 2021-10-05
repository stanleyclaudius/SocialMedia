import { useState, useEffect, useCallback, useRef } from 'react';
import { MdRefresh } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './../redux/actions/postActions';
import { POST_TYPES } from './../redux/constants/postTypes';
import { getSuggestion } from './../redux/actions/suggestionActions';
import { getDataAPI } from './../utils/fetchData';
import PostCard from './../components/post/PostCard';
import Avatar from './../components/Avatar';
import UserCard from '../components/UserCard';
import PostModal from './../components/post/PostModal';
import HeadInfo from './../utils/HeadInfo';
import Loading from './../components/Loading';

const Home = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [load, setLoad] = useState(false);

  const pageEnd = useRef();

  const dispatch = useDispatch();
  const {homePost, auth, suggestion} = useSelector(state => state);

  const handleLoadMore = useCallback(async() => {
    setLoad(true);
    const res = await getDataAPI(`post?limit=${homePost.page * 9}`, auth.token);
    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: {
        ...res.data,
        page: homePost.page + 1
      }
    });
    setLoad(false);
  }, [dispatch, homePost.page, auth.token]);

  useEffect(() => {
    dispatch(getPosts(auth.token));
  }, [dispatch, auth.token]);

  useEffect(() => {
    dispatch(getSuggestion(auth.token));
  }, [dispatch, auth.token]);

  useEffect(() => {
    const observer = new IntersectionObserver(async entries => {
      if (entries[0].isIntersecting) {
        await handleLoadMore();
      }
    }, {
      threshold: 1
    });

    if (!homePost.loading && homePost.result === 9 * (homePost.page - 1) && !load) {
      observer.observe(pageEnd.current);
    }
  }, [homePost.loading, homePost.result, homePost.page, load, handleLoadMore]);

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

                      {
                        load &&
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                          <Loading />
                        </div>
                      }

                      {
                        homePost.result < 9 * (homePost.page - 1)
                        ? ''
                        : !load && <button style={{opacity: '0'}} onClick={handleLoadMore} ref={pageEnd}>Load More</button>
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
            <MdRefresh onClick={() => dispatch(getSuggestion(auth.token))} />
          </div>
          <div className="homeRight__suggestions">
            {
              suggestion.loading
              ? (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Loading />
                </div>
              )
              : (
                <>
                  {
                    suggestion.users.map(user => (
                      <UserCard key={user._id} user={user} />
                    ))
                  }
                </>
              )
            }
          </div>
        </div>
      </div>

      {isOpenModal && <PostModal setIsOpenModal={setIsOpenModal} />}
    </>
  )
}

export default Home;