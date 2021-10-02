import { useState, useEffect } from 'react';
import CommentDisplay from './CommentDisplay';

const CommentContainer = ({post}) => {
  const [filteredComments, setFilteredComments] = useState([]);
  const [replyComment, setReplyComment] = useState([]);

  useEffect(() => {
    const newComments = post.comments.filter(comm => !comm.reply);
    setFilteredComments(newComments);
  }, [post.comments]);

  useEffect(() => {
    const newComments = post.comments.filter(comm => comm.reply);
    setReplyComment(newComments);
  }, [post.comments]);

  return (
    <>
      {
        filteredComments.map(comm => (
          <CommentDisplay key={comm._id} comment={comm} post={post} replyComment={replyComment.filter(item => item.reply === comm._id)} />
        ))
      }
    </>
  )
}

export default CommentContainer;