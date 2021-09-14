import { useState } from 'react';

const PostFooter = ({onReply, children}) => {
  const [comment, setComment] = useState('');

  return (
    <form className='postFooter__form' style={{
      marginTop: onReply ? '-15px' : '20px',
      borderTop: onReply ? 'none' : '1px solid #ccc',
      marginBottom: onReply ? '15px' : '',
      borderBottom: onReply ? '1px solid #ccc' : '',
      borderLeft: onReply ? '1px solid #ccc' : '',
      borderRight: onReply ? '1px solid #ccc' : '',
    }}>
      {children}
      <input placeholder='Your comment here' type="text" value={comment} onChange={e => setComment(e.target.value)} style={{marginLeft: onReply ? '5px' : ''}}/>
      <button>Send</button>
    </form>
  )
}

export default PostFooter;