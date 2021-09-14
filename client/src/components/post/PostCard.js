import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';

const PostCard = () => {
  return (
    <div className='postCard'>
      <PostHeader />
      <PostBody />
      <PostFooter />
    </div>
  )
}

export default PostCard;