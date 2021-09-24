import { useDispatch, useSelector } from 'react-redux';
import { FiMoreVertical } from 'react-icons/fi';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { deleteComment } from './../../redux/actions/commentActions';

const CommentMenu = ({post, comment, isOpenMenu, setIsOpenMenu, setOnEdit}) => {
  const dispatch = useDispatch();
  const {auth, socket} = useSelector(state => state);

  const showMenu = () => {
    return (
      <>
        <span onClick={handleOnEdit}>
          <AiFillEdit />
          Edit
        </span>
        <span onClick={handleDelete}>
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
  
  const handleDelete = () => {
    dispatch(deleteComment({post, comment, auth, socket}));
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
                    <span onClick={handleDelete}>
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