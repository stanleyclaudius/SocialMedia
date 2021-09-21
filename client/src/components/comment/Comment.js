import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import moment from 'moment';
import CommentMenu from './CommentMenu';
import PostFooter from './../post/PostFooter';

const Comment = ({comment}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [onReply, setOnReply] = useState(false);

  return (
    <>
      <div className="comment" style={{opacity: comment._id ? '1' : '.5', pointerEvents: comment._id ? 'all' : 'none'}}>
        <div className="comment--left">
          <p>
            <span>{comment.user.username}</span>
            {comment.content}
          </p>
          <small style={{fontWeight: 'normal'}}>{moment(comment.createdAt).fromNow()}</small>
          <small>1 like</small>
          <small style={{cursor: 'pointer'}} onClick={() => setOnReply(!onReply)}>{onReply ? 'Cancel' : 'Reply'}</small>
        </div>
        <div className="comment--right">
          <CommentMenu
            isOpenMenu={isOpenMenu}
            setIsOpenMenu={setIsOpenMenu}
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