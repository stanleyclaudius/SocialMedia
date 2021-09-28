import { useState, useEffect } from 'react';
import { BiFemaleSign, BiMaleSign } from 'react-icons/bi';
import { getDataAPI } from './../../utils/fetchData';
import Avatar from './../../components/Avatar';
import FollowBtn from './../../components/FollowBtn';
import EditProfile from './../../components/profile/EditProfile';
import Followers from './../../components/profile/Followers';
import Followings from './../../components/profile/Followings';

const Info = ({id, auth, profile}) => {
  const [userData, setUserData] = useState([]);
  const [isOpenFollowers, setIsOpenFollowers] = useState(false);
  const [isOpenFollowings, setIsOpenFollowings] = useState(false);
  const [isShowStoryMore, setIsShowStoryMore] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [totalPost, setTotalPost] = useState(0);
  
  useEffect(() => {
    if (auth.user?._id === id) {
      setUserData(auth.user);
    } else {
      const user = profile.users.find(user => user._id === id);
      setUserData(user);
    }
  }, [profile.users, id, auth.user]);

  useEffect(() => {
    const fetchTotalPost = async() => {
      const res = await getDataAPI(`post/total/${id}`, auth.token);
      setTotalPost(res.data.result);
    };

    fetchTotalPost();
  }, [auth.token, id]);

  return (
    <>
      <div className="userProfile__left">
        <Avatar src={userData.avatar} size='supper' />
      </div>
      <div className="userProfile__right">
        <div className="userProfile__right--username">
          <div className="userProfile__right--usernameInfo">
            <h3>{userData.username}</h3>
            {
              userData.gender === 'male' ? <BiMaleSign style={{color: 'blue'}} /> : userData.gender === 'female' ? <BiFemaleSign style={{color: 'rgb(255, 156, 172)'}} /> : ''
            }
          </div>
          {userData._id === auth.user?._id ? <button onClick={() => setIsEditProfile(true)}>Edit Profile</button> : <FollowBtn user={userData} />}
        </div>
        <div className="userProfile__right--info">
          <div className='postCount'>
            {totalPost} Post
          </div>
          <div className="followerCount" onClick={() => setIsOpenFollowers(true)}>
            {userData.followers?.length} {userData.followers?.length > 1 ? 'Followers' : 'Follower'}
          </div>
          <div className="followingCount" onClick={() => setIsOpenFollowings(true)}>
            {userData.followings?.length} {userData.followings?.length > 1 ? 'Followings' : 'Following'}
          </div>
        </div>
        <p className='fullname'>{userData.name} <span style={{marginLeft: '15px', fontWeight: '500'}}>{userData.mobile}</span></p>
        <p className='email'>{userData.email}</p>
        <p className='address'>{userData.address}</p>
        {userData.website && <a href={userData.website} target='_blank' rel='noreferrer'>{userData.website}</a>}

        {
          userData.story?.length < 100
          ? <p className='story'>{userData.story}</p>
          : isShowStoryMore
            ? (
                <div style={{marginTop: '5px'}}>
                  <span>{userData.story}</span>
                  <span onClick={() => setIsShowStoryMore(false)} style={{color: '#aaa', cursor: 'pointer', fontSize: '15px'}}> See less</span>
                </div>
              )
            : (
                <div style={{marginTop: '5px'}}>
                  <span>{userData.story?.slice(0, 100)}</span>
                  <span onClick={() => setIsShowStoryMore(true)} style={{color: '#aaa', cursor: 'pointer', fontSize: '15px'}}> See more</span>
                </div>
              )
        }
      </div>
      
      <Followers
        followers={userData.followers}
        active={isOpenFollowers}
        setIsOpenFollowers={setIsOpenFollowers}
      />

      <Followings
        followings={userData.followings}
        active={isOpenFollowings}
        setIsOpenFollowings={setIsOpenFollowings}
      />
      
      {isEditProfile && <EditProfile setIsEditProfile={setIsEditProfile} />}
    </>
  )
}

export default Info;