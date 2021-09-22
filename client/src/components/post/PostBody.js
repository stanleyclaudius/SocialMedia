import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { IoPaperPlaneOutline, IoChatbubbleOutline } from 'react-icons/io5';
import { BsBookmark } from 'react-icons/bs';
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { likePost, unlikePost } from './../../redux/actions/postActions';
import CommentDisplay from './../comment/CommentDisplay';
import ShareModal from './ShareModal';

const PostBody = ({post}) => {
  const [images, setImages] = useState([]);
  const [curImage, setCurImage] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const [filteredComments, setFilteredComments] = useState([]);
  const [replyComment, setReplyComment] = useState([]);

  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  const imageToLeft = () => {
    const newPos = curImage - 1;
    if (newPos < 0) setCurImage(0);
    else setCurImage(newPos);
  }

  const imageToRight = () => {
    const length = images.length;
    const newPos = curImage + 1;
    if (newPos >= (length - 1)) setCurImage(length - 1);
    else setCurImage(newPos)
  }

  const handleLikePost = () => {
    setIsLike(true);
    dispatch(likePost({post, auth}));
  }

  const handleUnlikePost = () => {
    setIsLike(false);
    dispatch(unlikePost({post, auth}));
  }

  useEffect(() => {
    setImages(post.images);
  }, [post]);

  useEffect(() => {
    if (post.likes.find(like => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user]);

  useEffect(() => {
    const newComments = post.comments.filter(comm => !comm.reply);
    setFilteredComments(newComments);
  }, [post.comments]);

  useEffect(() => {
    const newComments = post.comments.filter(comm => comm.reply);
    setReplyComment(newComments);
  }, [post.comments]);

  return (
    <div className='postBody'>
      <div className="postBody__image">
        {
          images.length > 1 && (
            <>
              {
                (curImage !== 0) && 
                <RiArrowLeftCircleFill onClick={imageToLeft} />
              }
            </>
          )
        }

        {
          images[curImage]?.secure_url.match(/video/i)
          ? <video src={images[curImage]?.secure_url} controls />
          : <img src={images[curImage]?.secure_url} alt='Post' />
        }

        {
          images.length > 1 && (
            <>
              {
                (curImage !== (images.length - 1)) && 
                <RiArrowRightCircleFill onClick={imageToRight} />
              }
            </>
          )
        }
      </div>
      <div className="postBody__menu">
        <div className="postBody__menu--left" style={{marginLeft: '9px'}}>
          {
            isLike ? <AiFillHeart style={{color: 'red'}} onClick={handleUnlikePost} /> : <AiOutlineHeart onClick={handleLikePost} />
          }
          <Link to={`/post/${post._id}`} style={{color: '#000'}}>
            <IoChatbubbleOutline />
          </Link>
          <IoPaperPlaneOutline onClick={() => setIsOpenShareModal(!isOpenShareModal)} />
        </div>
        <div className="postBody__menu--right">
          <BsBookmark />
        </div>
      </div>
      {isOpenShareModal && <ShareModal url={`http://localhost:3000/post/${post._id}`} />}
      <div className="postBody__info">
        <p className='likeCount' style={{paddingLeft: '10px'}}>{post.likes?.length} {post.likes?.length > 1 ? 'likes' : 'like'}</p>
        <div className="postBody__info--comments">
          <div className="caption">
            <p>
              <span>{post.user?.username}</span>
              {post.content}
            </p>
          </div>
          
          {
            filteredComments.map(comm => (
              <CommentDisplay key={comm._id} comment={comm} post={post} replyComment={replyComment.filter(item => item.reply === comm._id)} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default PostBody;