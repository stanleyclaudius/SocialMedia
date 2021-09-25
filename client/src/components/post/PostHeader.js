import { useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiFillEdit } from 'react-icons/ai';
import { FaTrash, FaCopy } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { GLOBALTYPES } from './../../redux/actions/globalTypes';
import { deletePost } from './../../redux/actions/postActions';
import ConfirmAlert from './../ConfirmAlert';
import PostModal from './PostModal';
import Avatar from './../Avatar';

const PostHeader = ({post}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const dispatch = useDispatch();
  const {auth, socket} = useSelector(state => state);

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

  const handleDelete = () => {
    setOpenConfirm(true);
  }

  return (
    <>
      <div className='postHeader'>
        <Link to={`/profile/${post.user?._id}`} className="postHeader__user" style={{textDecoration: 'none', color: '#000'}}>
          <Avatar src={post.user?.avatar} size='small' />
          <p>{post.user?.username}</p>
        </Link>
        <div className="postHeader__menu">
          <FiMoreHorizontal onClick={() => setIsOpenMenu(!isOpenMenu)} />
          <div className={`postHeader__menuDropdown ${isOpenMenu ? 'active' : ''}`}>
            {
              auth.user?._id === post.user?._id &&
              <>
                <div className="postHeader__menuDropdown--single" onClick={() => setIsOpenModal(true)}>
                  <AiFillEdit />
                  Edit
                </div>
                <div className="postHeader__menuDropdown--single" onClick={handleDelete}>
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

      {isOpenModal && <PostModal setIsOpenModal={setIsOpenModal} setIsOpenMenu={setIsOpenMenu} post={post} />}

      <ConfirmAlert
        active={openConfirm}
        title='Delete Post?'
        text="Once you confirm, there's no way to recover it." 
        onConfirm={() => {
          dispatch(deletePost({id: post._id, auth, socket}));
        }}
        onCancel={() => {
          setOpenConfirm(false);
        }}
      />
    </>
  )
}

export default PostHeader;