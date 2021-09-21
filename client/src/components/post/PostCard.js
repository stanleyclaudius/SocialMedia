import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';

const PostCard = ({post}) => {
  return (
    <div className='postCard'>
      <PostHeader post={post} />
      <PostBody post={post} />
      <PostFooter />
    </div>
  )
}

export default PostCard;