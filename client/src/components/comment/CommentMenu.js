import { FiMoreVertical } from 'react-icons/fi';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';

const CommentMenu = ({isOpenMenu, setIsOpenMenu, setOnEdit}) => {
  const handleOnEdit = () => {
    setOnEdit(true);
    setIsOpenMenu(false);
  }

  return (
    <div className='commentMenu'>
      <FiMoreVertical onClick={() => setIsOpenMenu(!isOpenMenu)} />
      <div className={`commentMenu__dropdown ${isOpenMenu ? 'active' : ''}`}>
        <span onClick={handleOnEdit}>
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