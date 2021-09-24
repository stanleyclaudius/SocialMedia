import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PROFILE_TYPES, getUserProfile } from './../../redux/actions/profileActions';
import { getDataAPI } from './../../utils/fetchData';
import Post from './../../components/profile/Post';
import HeadInfo from './../../utils/HeadInfo';
import Loading from './../../components/Loading';
import Info from './../../components/profile/Info';
import Saved from './../../components/profile/Saved';

const Profile = () => {
  const [isOpenSaved, setIsOpenSaved] = useState(false);
  const [userPost, setUserPost] = useState([]);
  const [load, setLoad] = useState(false);
  const [result, setResult] = useState(0);
  const [page, setPage] = useState(0);

  const pageEnd = useRef();

  const {id} = useParams();
  const dispatch = useDispatch();
  const {auth, profile} = useSelector(state => state);

  const handleLoadMorePost = useCallback(async() => {
    setLoad(true);
    const res = await getDataAPI(`post/user/${id}?limit=${9 * page}`, auth.token);
    dispatch({
      type: PROFILE_TYPES.EDIT_POST,
      payload: {
        userPosts: res.data.posts,
        result: res.data.result,
        _id: id,
        page: page + 1
      }
    });
    setLoad(false);
  }, [dispatch, page, auth.token, id]);

  useEffect(() => {
    if (profile.users.every(item => item._id !== id)) {
      dispatch(getUserProfile({id, token: auth.token}));
    }
  }, [dispatch, id, profile.users, auth.token]);

  useEffect(() => {
    const findUserPost = profile.posts.find(post => post._id === id);
    if (findUserPost) {
      setUserPost(findUserPost.userPosts);
      setResult(findUserPost.result);
      setPage(findUserPost.page);
    }
  }, [profile.posts, id]);

  useEffect(() => {
    const observer = new IntersectionObserver(async entries => {
      if (entries[0].isIntersecting) {
        await handleLoadMorePost();
      }
    }, {
      threshold: 1
    });

    if (!profile.loading && !load && result === 9 * (page - 1)) {
      observer.observe(pageEnd.current);
    }
  }, [profile.loading, load, result, page, handleLoadMorePost]);

  return (
    <>
      <HeadInfo title='SR Social - Profile' />
      <div className='container userProfile'>
        {
          profile.loading
          ? (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Loading />
            </div>
          )
          : (
            <>
              <div className="userProfile__top">
                <Info id={id} auth={auth} profile={profile} />
              </div>

              <div className="userProfile__bottom">
                {
                  auth.user._id === id &&
                  <>
                    <div className="userProfile__bottom--header">
                      <div onClick={() => setIsOpenSaved(false)} className={`${isOpenSaved ? '' : 'active'}`}>
                        POSTS
                      </div>
                      <div onClick={() => setIsOpenSaved(true)} className={`${isOpenSaved ? 'active' : ''}`}>
                        SAVED
                      </div>
                    </div>
                  </>
                }

                <div className="userProfile__bottom--content">
                  {
                    isOpenSaved 
                    ? <Saved />
                    : (
                      <>
                        <Post userPost={userPost} />
                        
                        {
                          load && 
                          <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                            <Loading />
                          </div>
                        }
                        
                        {
                          result < 9 * (page - 1)
                          ? ''
                          : !load && <button style={{opacity: '0'}} ref={pageEnd} onClick={handleLoadMorePost}>Load More</button>
                        }
                      </>
                    )
                  }
                </div>
              </div>
            </>
          )
        }
      </div>
    </>
  )
}

export default Profile;