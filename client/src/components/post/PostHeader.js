import { useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrash, FaCopy } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { GLOBALTYPES } from './../../redux/actions/globalTypes';
import Avatar from './../Avatar';

const PostHeader = ({post}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  const handleCopyLink = async () => {
    setIsOpenMenu(false);
    navigator.clipboard.writeText(`http://localhost:3000/post/${post._id}`);
    await dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: 'Copied to clipboard.'
      }
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {}
    });
  }

  return (
    <div className='postHeader'>
      <div className="postHeader__user">
        <Avatar src={post.user.avatar} size='small' />
        <p>{post.user.username}</p>
      </div>
      <div className="postHeader__menu">
        <FiMoreHorizontal onClick={() => setIsOpenMenu(!isOpenMenu)} />
        <div className={`postHeader__menuDropdown ${isOpenMenu ? 'active' : ''}`}>
          {
            auth.user?._id === post.user._id &&
            <>
              <div className="postHeader__menuDropdown--single">
                <AiFillEdit />
                Edit
              </div>
              <div className="postHeader__menuDropdown--single">
                <FaTrash />
                Delete
              </div>
            </>
          }
          <div className="postHeader__menuDropdown--single" onClick={handleCopyLink}>
            <FaCopy />
            Copy Link
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostHeader;