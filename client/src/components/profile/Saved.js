import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from './../../redux/constants/globalTypes';
import { getDataAPI } from './../../utils/fetchData';
import PostThumbnail from './../../components/PostThumbnail';
import Loading from './../../components/Loading';

const Saved = () => {
  const [savedPost, setSavedPost] = useState([]);
  const [result, setResult] = useState(0);
  const [page, setPage] = useState(2);
  const [firstLoad, setFirstLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadMoreIcon, setLoadMoreIcon] = useState(false);

  const pageEnd = useRef();

  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  const handleLoadMore = useCallback(async() => {
    setLoadMoreIcon(true);
    const res = await getDataAPI(`post/saved?limit=${9 * page}`, auth.token);
    setSavedPost(res.data.posts);
    setResult(res.data.result);
    setPage(p => p + 1);
    setLoadMoreIcon(false);
  }, [page, auth.token]);

  useEffect(() => {
    if (!firstLoad) {
      setLoading(true);
      const fetchSavedPost = async() => {
        await getDataAPI('post/saved', auth.token)
        .then(res => {
          setSavedPost(res.data.posts);
          setResult(res.data.result);
        })
        .catch(err => {
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
              error: err.response.data.msg
            }
          })
        });
      }

      fetchSavedPost();
      setFirstLoad(true);
      setLoading(false);
    }
  }, [dispatch, auth.token, firstLoad]);

  useEffect(() => {
    const observer = new IntersectionObserver(async entries => {
      if (entries[0].isIntersecting) {
        await handleLoadMore();
      }
    }, {
      threshold: 1
    });

    if (!loading && !loadMoreIcon && result === 9 * (page - 1))
      observer.observe(pageEnd.current);
  }, [loading, loadMoreIcon, result, page, handleLoadMore]);

  return (
    <>
      {
        loading
        ? (
          <div style={{marginTop: '25px', display: 'flex', justifyContent: 'center'}}>
            <Loading />
          </div>
        )
        : (
          <>
            {
              savedPost.length === 0
              ? (
                <div style={{color: 'red', textAlign: 'center', marginTop: '30px'}}>
                  <h2>No Post</h2>
                </div>
              )
              : (
                <div className='profilePost'>
                  {
                    savedPost.map(post => (
                      <PostThumbnail key={post._id} post={post} />
                    ))
                  }
                </div>
              )
            }

            {
              loadMoreIcon &&
              <div style={{display: 'flex', justifyContent: 'center', marginTop: '25px'}}>
                <Loading />
              </div>
            }

            {
              result < 9 * (page - 1)
              ? ''
              : !loadMoreIcon && <button style={{opacity: '0'}} ref={pageEnd} onClick={handleLoadMore}>Load More</button>
            }
          </>
        )
      }
    </>
  )
}

export default Saved;