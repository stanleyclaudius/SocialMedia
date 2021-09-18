import { useState, useEffect } from 'react';
import { BiFemaleSign, BiMaleSign } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserProfile } from './../../redux/actions/profileActions';
import Avatar from './../../components/Avatar';
import FollowBtn from './../../components/FollowBtn';
import EditProfile from './../../components/profile/EditProfile';
import Post from './../../components/profile/Post';
import Followers from './../../components/profile/Followers';
import Followings from './../../components/profile/Followings';
import HeadInfo from './../../utils/HeadInfo';
import Loading from './../../components/Loading';

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [isOpenSaved, setIsOpenSaved] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isOpenFollowers, setIsOpenFollowers] = useState(false);
  const [isOpenFollowings, setIsOpenFollowings] = useState(false);

  const {id} = useParams();
  const dispatch = useDispatch();
  const {auth, profile} = useSelector(state => state);

  useEffect(() => {
    if (profile.users.every(item => item._id !== id)) {
      dispatch(getUserProfile({id}));
    }
  }, [dispatch, id, profile.users]);

  useEffect(() => {
    const user = profile.users.find(user => user._id === id);
    setUserData(user);
  }, [profile.users, id]);

  return (
    <>
      <HeadInfo title='SR Social - Profile' />
      <div className='container userProfile'>
        <div className="userProfile__top">
          {
            profile.loading
            ? (
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '15px'}}>
                <Loading />
              </div>
            )
            : (
              <>
                <div className="userProfile__left">
                  <Avatar src={userData.avatar} size='big' />
                </div>
                <div className="userProfile__right">
                  <div className="userProfile__right--username">
                    <div className="userProfile__right--usernameInfo">
                      <h3>{userData.username}</h3>
                      {
                        userData.gender === 'male' ? <BiMaleSign /> : userData.gender === 'female' ? <BiFemaleSign style={{color: 'rgb(255, 156, 172)'}} /> : ''
                      }
                    </div>
                    {userData._id === auth.user?._id ? <button onClick={() => setIsEditProfile(true)}>Edit Profile</button> : <FollowBtn />}
                  </div>
                  <div className="userProfile__right--info">
                    <div className='postCount'>
                      101 Post
                    </div>
                    <div className="followerCount" onClick={() => setIsOpenFollowers(true)}>
                      {userData.followers?.length} Followers
                    </div>
                    <div className="followingCount" onClick={() => setIsOpenFollowings(true)}>
                      {userData.followings?.length} Followings
                    </div>
                  </div>
                  <p className='fullname'>{userData.name} <span>{userData.mobile}</span></p>
                  <p className='story'>
                    {userData.story}
                  </p>
                  <p className='email'>{userData.email}</p>
                </div>
              </>
            )
          }
        </div>
      
        <div className="userProfile__bottom">
          <div className="userProfile__bottom--header">
            <div onClick={() => setIsOpenSaved(false)} className={`${isOpenSaved ? '' : 'active'}`}>
              POSTS
            </div>
            <div onClick={() => setIsOpenSaved(true)} className={`${isOpenSaved ? 'active' : ''}`}>
              SAVED
            </div>
          </div>

          <div className="userProfile__bottom--content">
            <Post />
          </div>
        </div>
      </div>

      {isEditProfile && <EditProfile setIsEditProfile={setIsEditProfile} />}

      <Followers
        active={isOpenFollowers}
        setIsOpenFollowers={setIsOpenFollowers}
      />

      <Followings
        active={isOpenFollowings}
        setIsOpenFollowings={setIsOpenFollowings}
      />
    </>
  )
}

export default Profile;