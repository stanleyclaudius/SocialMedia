import { useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrash, FaCopy } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Avatar from './../Avatar';

const PostHeader = ({user}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const {auth} = useSelector(state => state);

  return (
    <div className='postHeader'>
      <div className="postHeader__user">
        <Avatar src={user.avatar} size='small' />
        <p>{user.username}</p>
      </div>
      <div className="postHeader__menu">
        <FiMoreHorizontal onClick={() => setIsOpenMenu(!isOpenMenu)} />
        <div className={`postHeader__menuDropdown ${isOpenMenu ? 'active' : ''}`}>
          {
            auth.user?._id === user._id &&
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
          <div className="postHeader__menuDropdown--single">
            <FaCopy />
            Copy Link
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostHeader;