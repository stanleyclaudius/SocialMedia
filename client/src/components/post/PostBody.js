import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoPaperPlaneOutline, IoChatbubbleOutline } from 'react-icons/io5';
import { BsBookmark } from 'react-icons/bs';
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from 'react-icons/ri';
import Comment from './../comment/Comment';

const PostBody = () => {
  const image = [
    'https://militaryspouseafcpe.org/storage/2020/09/kitty.jpg',
    'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y3V0ZSUyMGtpdHRlbnxlbnwwfHwwfHw%3D&w=1000&q=80',
    'https://militaryspouseafcpe.org/storage/2020/09/kitty.jpg',
  ];
  const [curImage, setCurImage] = useState(0);

  const imageToLeft = () => {
    const newPos = curImage - 1;
    if (newPos < 0) setCurImage(0);
    else setCurImage(newPos);
  }

  const imageToRight = () => {
    const length = image.length;
    const newPos = curImage + 1;
    if (newPos >= (length - 1)) setCurImage(length - 1);
    else setCurImage(newPos)
  }

  return (
    <div className='postBody'>
      <div className="postBody__image">
        {
          image.length > 1 && (
            <>
              {
                (curImage !== 0) && 
                <RiArrowLeftCircleFill onClick={imageToLeft} />
              }
            </>
          )
        }
        <img src={image[curImage]} alt='Post' />
        {
          image.length > 1 && (
            <>
              {
                (curImage !== (image.length - 1)) && 
                <RiArrowRightCircleFill onClick={imageToRight} />
              }
            </>
          )
        }
      </div>
      <div className="postBody__menu">
        <div className="postBody__menu--left" style={{marginLeft: '9px'}}>
          <AiOutlineHeart />
          <IoChatbubbleOutline />
          <IoPaperPlaneOutline />
        </div>
        <div className="postBody__menu--right">
          <BsBookmark />
        </div>
      </div>
      <div className="postBody__info">
        <p className='likeCount' style={{paddingLeft: '10px'}}>101 likes</p>
        <div className="postBody__info--comments">
          <div className="caption">
            <p>
              <span>username01</span>
              Lorem ipsum dolor sit amet.
            </p>
          </div>
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  )
}

export default PostBody;