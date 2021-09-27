import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DISCOVER_TYPES, getDiscoverPost } from './../redux/actions/discoverActions';
import { getDataAPI } from './../utils/fetchData';
import PostThumbnail from './../components/PostThumbnail';
import HeadInfo from './../utils/HeadInfo';
import Loading from './../components/Loading';

const Discover = () => {
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();
  const {auth, discover} = useSelector(state => state);

  const pageEnd = useRef();

  const handleLoadMore = useCallback(async() => {
    setLoad(true);
    const res = await getDataAPI(`post/discover?num=${discover.page * 9}`, auth.token);
    dispatch({
      type: DISCOVER_TYPES.GET_DISCOVER_POSTS,
      payload: {
        ...res.data,
        page: discover.page + 1
      }
    })
    setLoad(false);
  }, [dispatch, discover.page, auth.token]);

  useEffect(() => {
    dispatch(getDiscoverPost(auth.token));
  }, [dispatch, auth.token]);

  useEffect(() => {
    const observer = new IntersectionObserver(async entries => {
      if (entries[0].isIntersecting) {
        await handleLoadMore();
      }
    }, {
      threshold: 1
    });

    if (!discover.loading && !load && discover.result === 9 * (discover.page - 1))
      observer.observe(pageEnd.current);
  }, [discover.loading, load, discover.result, discover.page, handleLoadMore]);

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
            <>
              {
                discover.posts.length === 0
                ? (
                  <div style={{color: 'red', textAlign: 'center', marginTop: '50px'}}>
                    <h2>No Post</h2>
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

              {
                load &&
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Loading />
                </div>
              }

              {
                discover.result < 9 * (discover.page - 1)
                ? ''
                : !load && <button style={{opacity: '0'}} ref={pageEnd} onClick={handleLoadMore}>Load More</button>
              }
            </>
          )
        }
    </>
  )
}

export default Discover;