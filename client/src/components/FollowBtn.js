import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from './../redux/actions/profileActions';

const FollowBtn = ({user}) => {
  const [isFollowed, setIsFollowed] = useState(false);

  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  const handleFollow = () => {
    setIsFollowed(true);
    dispatch(followUser({user, auth}));
  }

  const handleUnfollow = () => {
    setIsFollowed(false);
    dispatch(unfollowUser({user, auth}));
  }

  // useEffect(() => {
  //   if (auth.user?.followings.find(item => item._id === user._id)) {
  //     setIsFollowed(true);
  //   }
  //   return () => setIsFollowed(false);
  // }, [auth.user.followings, user._id]);

  return (
    <>
      {
        isFollowed
        ? (
          <button className='followBtn active' onClick={handleUnfollow}>
            Unfollow
          </button>
        )
        : (
          <button className='followBtn' onClick={handleFollow}>
            Follow
          </button>
        )
      }
    </>
  )
}

export default FollowBtn;