import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from './../../redux/actions/commentActions';

const PostFooter = ({post, setOnReply, onReply, children, commentUser, commentId, tag}) => {
  const emojiArr = [
    '😀', '😫', '😄', '😁', '😆', '😅', '😂', '🤣',
    '😊', '😇', '🙂', '🙃', '😍', '🥰', '😘', '😗',
    '😚', '😋', '😛', '😝', '😜', '🤪', '😭', '😤',
    '😠', '😡', '🥱', '😴', '🤤', '😪', '🤮', '🤧',
    '😷', '🤒', '👋', '👌', '✌️', '👍', '👎', '🤐'
  ];

  const [content, setContent] = useState('');
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);

  const dispatch = useDispatch();
  const {auth, socket} = useSelector(state => state);

  const handleClickEmoji = emoji => {
    setContent(t => t + emoji);
    setIsOpenEmoji(false);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const comment = {
      content,
      user: auth.user,
      likes: [],
      createdAt: new Date().toISOString(),
      reply: onReply && commentId,
      tag: onReply && tag,
      commentUser: onReply && commentUser
    };
    dispatch(createComment({comment, post, auth, socket}));
    setContent('');
    if (setOnReply) setOnReply(false);
  }

  return (
    <form onSubmit={handleSubmit} className='postFooter__form' style={{
      marginTop: onReply ? '-16px' : '20px',
      borderTop: onReply ? 'none' : '1px solid #ccc',
      marginBottom: onReply ? '15px' : '',
      background: onReply ? 'rgb(220, 220, 220)' : '',
      borderRadius: '0 0 5px 5px'
    }}>
      <div className='postFooter__form--left'>
        {children}
        <input placeholder='Your comment here' type="text" value={content} onChange={e => setContent(e.target.value)} style={{
          marginLeft: onReply ? '5px' : '',
          background: onReply ? 'rgb(220, 220, 220)' : ''
        }}/>
      </div>
      <div className='postFooter__form--right'>
        <div className='emoji'>
          <p className='emoji__first' onClick={() => setIsOpenEmoji(!isOpenEmoji)}>😀</p>
          <div className={`emoji__container ${isOpenEmoji ? 'active' : ''}`}>
            {
              emojiArr.map((emoji, index) => (
                <p key={index} onClick={() => handleClickEmoji(emoji)}>{emoji}</p>
              ))
            }
          </div>
        </div>
        <button type='submit'>Send</button>
      </div>
    </form>
  )
}

export default PostFooter;