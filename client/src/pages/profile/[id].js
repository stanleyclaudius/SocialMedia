import { useState } from 'react';
import { BiFemaleSign, BiMaleSign } from 'react-icons/bi';
import Avatar from './../../components/Avatar';
// import FollowBtn from './../../components/FollowBtn';
import EditProfile from './../../components/profile/EditProfile';
import Post from './../../components/profile/Post';
import Followers from './../../components/profile/Followers';
import Followings from './../../components/profile/Followings';

const Profile = () => {
  const [isOpenSaved, setIsOpenSaved] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isOpenFollowers, setIsOpenFollowers] = useState(false);
  const [isOpenFollowings, setIsOpenFollowings] = useState(false);

  return (
    <>
      <div className='container userProfile'>
        <div className="userProfile__top">
          <div className="userProfile__left">
            <Avatar size='big' />
          </div>
          <div className="userProfile__right">
          <div className="userProfile__right--username">
            <div className="userProfile__right--usernameInfo">
              <h3>username01</h3>
              <BiFemaleSign style={{color: 'rgb(255, 156, 172)'}} />
            </div>
            {/* <FollowBtn /> */}
            <button onClick={() => setIsEditProfile(true)}>Edit Profile</button>
          </div>
          <div className="userProfile__right--info">
            <div className='postCount'>
              101 Post
            </div>
            <div className="followerCount" onClick={() => setIsOpenFollowers(true)}>
              101 Followers
            </div>
            <div className="followingCount" onClick={() => setIsOpenFollowings(true)}>
              101 Followings
            </div>
          </div>
          <p className='fullname'>User01 <span>+61 829283 38934</span></p>
          <p className='story'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem, est!
          </p>
          <p className='email'>user01@gmail.com</p>
        </div>
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