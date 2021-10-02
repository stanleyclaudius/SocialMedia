import { useState, useEffect } from 'react';
import CommentDisplay from './CommentDisplay';

const CommentContainer = ({post}) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [replyComment, setReplyComment] = useState([]);
  const [next, setNext] = useState(2);

  useEffect(() => {
    const newComments = post.comments.filter(comm => comm.reply);
    setReplyComment(newComments);
  }, [post.comments]);

  useEffect(() => {
    const newComments = post.comments.filter(comm => !comm.reply);
    setComments(newComments);
    setShowComments(newComments.slice(newComments.length - next));
  }, [post.comments, next]);

  return (
    <>
      {
        showComments.map(comm => (
          <CommentDisplay key={comm._id} comment={comm} post={post} replyComment={replyComment.filter(item => item.reply === comm._id)} />
        ))
      }
      
      {
        comments.length - next > 0
        ? (
          <div
            style={{
              cursor: 'pointer',
              color: 'blue',
              fontSize: '13px',
              width: 'fit-content'
            }}
            onClick={() => setNext(comments.length)}
          >
            See more comments ...
          </div>
        )
        : (
          <>
            {
              comments.length > 2 &&
              <div
                style={{
                  cursor: 'pointer',
                  color: 'blue',
                  fontSize: '13px',
                  width: 'fit-content'
                }}
                onClick={() => setNext(2)}
              >
                Hide comments
              </div>
            }
          </>
        )
      }
    </>
  )
}

export default CommentContainer;