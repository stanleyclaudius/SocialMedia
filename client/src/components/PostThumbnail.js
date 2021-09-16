import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';

const PostThumbnail = () => {
  return (
    <div className='postThumbnail'>
      <Link to='/'>
        <img src='https://militaryspouseafcpe.org/storage/2020/09/kitty.jpg' alt='Post' />
        <div className="postThumbnail--overlay">
          <div>
            <AiOutlineHeart />
            101
          </div>
          <div>
            <IoChatbubbleOutline />
            101
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PostThumbnail;