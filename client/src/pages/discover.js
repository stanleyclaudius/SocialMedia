import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscoverPost } from './../redux/actions/discoverActions';
import PostThumbnail from './../components/PostThumbnail';
import HeadInfo from './../utils/HeadInfo';
import Loading from './../components/Loading';

const Discover = () => {
  const dispatch = useDispatch();
  const {auth, discover} = useSelector(state => state);

  useEffect(() => {
    dispatch(getDiscoverPost(auth.token));
  }, [dispatch, auth.token]);

  return (
    <>
      <HeadInfo title='SR Social - Discover' />
        {
          discover.loading
          ? (
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
              <Loading />
            </div>
          )
          : (
            <div className='container discover'>
              {
                discover?.posts.map(post => (
                  <PostThumbnail key={post._id} post={post} />
                ))
              }
            </div>
          )
        }
    </>
  )
}

export default Discover;