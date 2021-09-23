import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserProfile } from './../../redux/actions/profileActions';
import Post from './../../components/profile/Post';
import HeadInfo from './../../utils/HeadInfo';
import Loading from './../../components/Loading';
import Info from './../../components/profile/Info';
import Saved from './../../components/profile/Saved';

const Profile = () => {
  const [isOpenSaved, setIsOpenSaved] = useState(false);
  const [userPost, setUserPost] = useState([]);

  const {id} = useParams();
  const dispatch = useDispatch();
  const {auth, profile} = useSelector(state => state);

  useEffect(() => {
    if (profile.users.every(item => item._id !== id)) {
      dispatch(getUserProfile({id, token: auth.token}));
    }
  }, [dispatch, id, profile.users, auth.token]);

  useEffect(() => {
    const findUserPost = profile.posts.find(post => post._id === id);
    if (findUserPost)
      setUserPost(findUserPost.userPosts);
  }, [profile.posts, id]);

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
                    : <Post userPost={userPost} />
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