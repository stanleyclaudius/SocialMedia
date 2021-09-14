import { FiMoreVertical } from 'react-icons/fi';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';

const CommentMenu = ({isOpenMenu, setIsOpenMenu}) => {
  return (
    <div className='commentMenu'>
      <FiMoreVertical onClick={() => setIsOpenMenu(!isOpenMenu)} />
      <div className={`commentMenu__dropdown ${isOpenMenu ? 'active' : ''}`}>
        <span>
          <AiFillEdit />
          Edit
        </span>
        <span>
          <FaTrash />
          Delete
        </span>
      </div>
    </div>
  )
}

export default CommentMenu;