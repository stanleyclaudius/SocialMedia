import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';

const PostThumbnail = ({post}) => {
  return (
    <div className='postThumbnail'>
      <Link to={`/post/${post._id}`}>
        <img src={post.images[0].secure_url} alt='Post' />
        <div className="postThumbnail--overlay">
          <div>
            <AiOutlineHeart />
            {post.likes.length}
          </div>
          <div>
            <IoChatbubbleOutline />
            {post.comments.length}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PostThumbnail;