import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';

const PostCard = ({post}) => {
  return (
    <div className='postCard'>
      <PostHeader user={post.user} />
      <PostBody post={post} />
      <PostFooter />
    </div>
  )
}

export default PostCard;