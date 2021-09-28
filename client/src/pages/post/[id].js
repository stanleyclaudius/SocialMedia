import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from './../../redux/actions/postActions';
import PostCard from './../../components/post/PostCard';
import Loading from './../../components/Loading';
import HeadInfo from './../../utils/HeadInfo';
import NotFoundId from './../../components/NotFoundId';

const Post = () => {
  const [postInfo, setPostInfo] = useState([]);

  const {id} = useParams();

  const dispatch = useDispatch();
  const {auth, homePost, postDetail} = useSelector(state => state);

  useEffect(() => {
    dispatch(getPost({postDetail, id, auth}));

    if (postDetail?.length > 0) {
      const post = postDetail.filter(item => item?._id === id);
      setPostInfo(post);
    }
  }, [dispatch, id, auth, postDetail]);

  return (
    <>
      <HeadInfo title={`SR Social - Post`} />
      <div className='container' style={{marginTop: '40px'}}>
        {
          homePost.loading
          ? (
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Loading />
            </div>
          )
          : (
            <>
              {
                postInfo.length === 0
                ? (
                  <NotFoundId
                    info='Post'
                    url='/'
                    link='Home'
                  />
                )
                : (
                  <>
                    {
                      postInfo.map(post => (
                        <PostCard key={post._id} post={post} />
                      ))
                    }
                  </>
                )
              }
            </>
          )
        }
      </div>
    </>
  )
}

export default Post;