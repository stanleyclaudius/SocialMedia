import { useState, useEffect } from 'react';
import Comment from './Comment';

const CommentDisplay = ({comment, post, replyComment}) => {
  const [newReply, setNewReply] = useState([]);
  const [showReply, setShowReply] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    const newComments = post.comments.filter(comm => comm.reply);
    setNewReply(newComments);
  }, [post.comments]);

  useEffect(() => {
    setShowReply(replyComment.slice(replyComment.length - next));
  }, [replyComment, next]);

  return (
    <Comment post={post} comment={comment}>
      <div style={{marginLeft: '20px'}}>
        {
          showReply.map(item => (
            <CommentDisplay
              key={item._id}
              comment={item}
              post={post}
              replyComment={newReply.filter(nr => nr.reply === item._id)}
            />
          ))
        }

        {
          replyComment.length - next > 0
          ? (
            <div
              style={{
                cursor: 'pointer',
                color: 'blue',
                fontSize: '13px',
                marginTop: '-9px',
                marginBottom: '13px'
              }}
              onClick={() => setNext(replyComment.length)}
            >
              See more comments ...
            </div>
          )
          : (
            <>
              {
                replyComment.length > 1 &&
                <div
                  style={{
                    cursor: 'pointer',
                    color: 'blue',
                    fontSize: '13px',
                    marginTop: '-9px',
                    marginBottom: '13px'
                  }}
                  onClick={() => setNext(1)}
                >
                  Hide comments
                </div>
              }
            </>
          )
        }
      </div>
    </Comment>
  );
}

export default CommentDisplay;