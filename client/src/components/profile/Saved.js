import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from './../../redux/actions/globalTypes';
import { getDataAPI } from './../../utils/fetchData';
import PostThumbnail from './../../components/PostThumbnail';

const Saved = () => {
  const [savedPost, setSavedPost] = useState([]);
  const [result, setResult] = useState(0);

  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  useEffect(() => {
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
  }, [dispatch, auth.token]);

  return (
    <div className='profilePost'>
      {
        savedPost.map(post => (
          <PostThumbnail key={post._id} post={post} />
        ))
      }
    </div>
  )
}

export default Saved;