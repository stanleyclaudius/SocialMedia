import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import CommentMenu from './CommentMenu';
import PostFooter from './../post/PostFooter';

const Comment = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [onReply, setOnReply] = useState(false);

  return (
    <>
      <div className="otherComment">
        <div className="otherComment--left">
          <p>
            <span>username02</span>
            lorem ipsum dolor.
          </p>
          <small style={{fontWeight: 'normal'}}>1d ago</small>
          <small>1 like</small>
          <small style={{cursor: 'pointer'}} onClick={() => setOnReply(!onReply)}>{onReply ? 'Cancel' : 'Reply'}</small>
        </div>
        <div className="otherComment--right">
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