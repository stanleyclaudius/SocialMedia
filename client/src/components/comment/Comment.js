import { useState, useEffect } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { editComment } from './../../redux/actions/commentActions';
import moment from 'moment';
import CommentMenu from './CommentMenu';
import PostFooter from './../post/PostFooter';

const Comment = ({post, comment}) => {
  const [content, setContent] = useState('');
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [onReply, setOnReply] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  const handleEditComment = () => {
    const newComment = {
      ...comment,
      content
    }
    dispatch(editComment({comment: newComment, post, auth}));
    setOnEdit(false);
  }

  useEffect(() => {
    setContent(comment.content);
  }, [comment.content]);

  return (
    <>
      <div className="comment" style={{opacity: comment._id ? '1' : '.5', pointerEvents: comment._id ? 'all' : 'none'}}>
        <div className="comment--left">
          {
            onEdit 
            ? (
              <div style={{width: '100%'}}>
                <textarea value={content} onChange={e => setContent(e.target.value)} style={{width: '100%'}} />
              </div>
            )
            : (
              <p>
                <span>{comment.user.username}</span>
                {comment.content}
              </p>
            )
          }
          <small style={{fontWeight: 'normal'}}>{moment(comment.createdAt).fromNow()}</small>
          <small>1 like</small>

          {
            onEdit
            ? (
              <>
                <small style={{cursor: 'pointer'}} onClick={() => setOnEdit(false)}>Cancel</small>
                <small style={{cursor: 'pointer'}} onClick={handleEditComment}>Update</small>
              </>
            )
            : <small style={{cursor: 'pointer'}} onClick={() => setOnReply(!onReply)}>{onReply ? 'Cancel' : 'Reply'}</small>
          }
          
        </div>
        <div className="comment--right">
          <CommentMenu
            isOpenMenu={isOpenMenu}
            setIsOpenMenu={setIsOpenMenu}
            setOnEdit={setOnEdit}
          />
          <div>
            <AiOutlineHeart />
          </div>
        </div>
      </div>

      {
        onReply && (
          <PostFooter onReply={onReply}>
            <small>@test</small>
          </PostFooter>
        )
      }
    </>
  )
}

export default Comment;