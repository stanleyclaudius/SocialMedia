import { useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrash, FaCopy } from 'react-icons/fa';
import Avatar from './../Avatar';

const PostHeader = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <div className='postHeader'>
      <div className="postHeader__user">
        <Avatar size='small' />
        <p>username01</p>
      </div>
      <div className="postHeader__menu">
        <FiMoreHorizontal onClick={() => setIsOpenMenu(!isOpenMenu)} />
        <div className={`postHeader__menuDropdown ${isOpenMenu ? 'active' : ''}`}>
          <div className="postHeader__menuDropdown--single">
            <AiFillEdit />
            Edit
          </div>
          <div className="postHeader__menuDropdown--single">
            <FaTrash />
            Delete
          </div>
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