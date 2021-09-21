import { useSelector } from 'react-redux';
import { FiMoreVertical } from 'react-icons/fi';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';

const CommentMenu = ({post, comment, isOpenMenu, setIsOpenMenu, setOnEdit}) => {
  const {auth} = useSelector(state => state);

  const showMenu = () => {
    return (
      <>
        <span onClick={handleOnEdit}>
          <AiFillEdit />
          Edit
        </span>
        <span>
          <FaTrash />
          Delete
        </span>
      </>
    );
  }

  const handleOnEdit = () => {
    setOnEdit(true);
    setIsOpenMenu(false);
  }

  return (
    <div className='commentMenu'>
      {
        (auth.user?._id === post.user?._id || auth.user?._id === comment.user?._id) && (
          <>
            <FiMoreVertical onClick={() => setIsOpenMenu(!isOpenMenu)} />
            <div className={`commentMenu__dropdown ${isOpenMenu ? 'active' : ''}`}>
              {
                (auth.user?._id === post.user?._id || auth.user?._id === comment.user?._id)
                && (comment.user?._id === auth.user?._id)
                  ? showMenu()
                  : auth.user?._id === post.user?._id && (
                    <span>
                      <FaTrash />
                      Delete
                    </span>
                  )
              }
            </div>
          </>
        )
      }
    </div>
  )
}

export default CommentMenu;