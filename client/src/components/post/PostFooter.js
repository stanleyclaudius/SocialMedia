import { useState } from 'react';

const PostFooter = ({onReply, children}) => {
  const [comment, setComment] = useState('');

  return (
    <form className='postFooter__form' style={{
      marginTop: onReply ? '-16px' : '20px',
      borderTop: onReply ? 'none' : '1px solid #ccc',
      marginBottom: onReply ? '15px' : '',
      background: onReply ? 'rgb(220, 220, 220)' : '',
      borderRadius: '0 0 5px 5px'
    }}>
      {children}
      <input placeholder='Your comment here' type="text" value={comment} onChange={e => setComment(e.target.value)} style={{
        marginLeft: onReply ? '5px' : '',
        background: onReply ? 'rgb(220, 220, 220)' : ''
      }}/>
      <button>Send</button>
    </form>
  )
}

export default PostFooter;