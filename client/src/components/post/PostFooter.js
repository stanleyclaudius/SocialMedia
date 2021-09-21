import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from './../../redux/actions/commentActions';

const PostFooter = ({post, onReply, children}) => {
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  const handleSubmit = e => {
    e.preventDefault();
    const comment = {
      content,
      user: auth.user,
      likes: [],
      createdAt: new Date().toISOString()
    };
    dispatch(createComment({comment, post, auth}));
    setContent('');
  }

  return (
    <form onSubmit={handleSubmit} className='postFooter__form' style={{
      marginTop: onReply ? '-16px' : '20px',
      borderTop: onReply ? 'none' : '1px solid #ccc',
      marginBottom: onReply ? '15px' : '',
      background: onReply ? 'rgb(220, 220, 220)' : '',
      borderRadius: '0 0 5px 5px'
    }}>
      {children}
      <input placeholder='Your comment here' type="text" value={content} onChange={e => setContent(e.target.value)} style={{
        marginLeft: onReply ? '5px' : '',
        background: onReply ? 'rgb(220, 220, 220)' : ''
      }}/>
      <button type='submit'>Send</button>
    </form>
  )
}

export default PostFooter;