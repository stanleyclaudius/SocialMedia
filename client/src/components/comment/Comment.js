import { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { editComment, likeComment, unlikeComment } from './../../redux/actions/commentActions';
import moment from 'moment';
import CommentMenu from './CommentMenu';
import PostFooter from './../post/PostFooter';

const Comment = ({post, comment, children}) => {
  const [content, setContent] = useState('');
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [onReply, setOnReply] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [isLike, setIsLike] = useState(false);

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

  const handleLikeComment = () => {
    setIsLike(true);
    dispatch(likeComment({comment, post, auth}));
  }

  const handleUnlikeComment = () => {
    setIsLike(false);
    dispatch(unlikeComment({comment, post, auth}));
  }

  useEffect(() => {
    setContent(comment.content);
  }, [comment.content]);

  useEffect(() => {
    if (comment.likes.find(like => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [comment.likes, auth]);

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
          <small>{comment.likes.length} {comment.likes.length > 1 ? 'likes' : 'like'}</small>

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
            post={post}
            comment={comment}
            isOpenMenu={isOpenMenu}
            setIsOpenMenu={setIsOpenMenu}
            setOnEdit={setOnEdit}
          />
          <div>
            {isLike ? <AiFillHeart style={{color: 'red'}} onClick={handleUnlikeComment} /> : <AiOutlineHeart onClick={handleLikeComment} />}
          </div>
        </div>
      </div>

      {
        onReply && (
          <PostFooter onReply={onReply} setOnReply={setOnReply} commentId={comment._id} tag={comment.user._id} post={post}>
            <small>@{comment.user.username}</small>
          </PostFooter>
        )
      }

      {children}
    </>
  )
}

export default Comment;