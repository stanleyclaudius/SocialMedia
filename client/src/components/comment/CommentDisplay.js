import { useState, useEffect } from 'react';
import Comment from './Comment';

const CommentDisplay = ({comment, post, replyComment}) => {
  const [newReply, setNewReply] = useState([]);

  useEffect(() => {
    const newComments = post.comments.filter(comm => comm.reply);
    setNewReply(newComments);
  }, [post.comments]);

  return (
    <Comment post={post} comment={comment}>
      <div style={{marginLeft: '20px'}}>
        {
          replyComment.map(item => (
            <CommentDisplay
              key={item._id}
              comment={item}
              post={post}
              replyComment={newReply.filter(nr => nr.reply === item._id)}
            />
          ))
        }
      </div>
    </Comment>
  );
}

export default CommentDisplay;