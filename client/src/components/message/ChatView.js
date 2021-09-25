import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoPaperPlaneOutline, IoVideocam } from 'react-icons/io5';
import { MdCall, MdPhotoSizeSelectActual } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { uploadImage } from './../../utils/imageHelper';
import { createMessage, getMessage } from './../../redux/actions/messageActions';
import SingleMessage from './SingleMessage';
import Avatar from './../Avatar';

const ChatView = ({id}) => {
  const [text, setText] = useState('');
  const [info, setInfo] = useState({});
  const [images, setImages] = useState([]);
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();
  const {auth, message} = useSelector(state => state);

  const handleImageChange = e => {
    const newImages = [...e.target.files];

    setImages([...images, ...newImages]);
  }

  const handleSubmit = async e => {
    e.preventDefault();

    setLoad(true);
    let newMedia = [];
    if (images.length > 0) {
      newMedia = await uploadImage(images, 'post');
    }

    const msg = {
      sender: auth.user,
      recipient: info,
      text,
      media: newMedia,
      createdAt: new Date().toISOString()
    };

    setText('');
    images.length > 0 && setImages([]);

    dispatch(createMessage({msg, auth}));
    setLoad(false);
  }

  useEffect(() => {
    dispatch(getMessage({id, auth}));
  }, [dispatch, id, auth]);

  useEffect(() => {
    const findUser = message.users.find(user => user.user?._id === id);
    if (findUser)
      setInfo(findUser);
  }, [message.users, id]);

  return (
    <div className='chatView'>
      <div className="chatView__header">
        <div className="chatView__header--left">
          <Avatar size='small' src={info.user?.avatar} />
          <p>{info.user?.username}</p>
        </div>
        <div className="chatView__header--right">
          <MdCall />
          <IoVideocam />
          <FaTrash style={{color: 'red'}} />
        </div>
      </div>
      <div className="chatView__body">
        {
          message.data.map((chat, index) => (
            <div key={index}>
              {
                chat.sender._id === auth.user._id ? (
                    <>
                      <div className={`chatView__body--message chatView__body--yourMessage`}>
                        <SingleMessage otherMessage={false} text={chat.text} avatar={auth.user.avatar} media={chat.media} />
                      </div>
                      <div className="clear"></div>
                    </>
                ) : (
                  <>
                    <div className={`chatView__body--message chatView__body--otherMessage`} style={{marginTop: '8px'}}>
                      <SingleMessage otherMessage={true} text={chat.text} avatar={info.user?.avatar} media={chat.media} />
                    </div>
                  </>
                )
              }
            </div>
          ))
        }
      </div>

      {
        images.length > 0 &&
        <div className='chatView__imageHolder'>
          {
            images.map(img => (
              <>
                {
                  img.type.match(/video/i)
                  ? <video src={URL.createObjectURL(img)} controls />
                  : <img src={URL.createObjectURL(img)} alt='Message' />
                }
              </>
            ))
          }
        </div>
      }
      
      <div className="chatView__footer">
        <form onSubmit={handleSubmit}>
          <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder='Your message here ...' />
          <div className='chatView__footerRight'>
            <div>
              <input type="file" accept="image/*,video/*" multiple onChange={handleImageChange} />
              <MdPhotoSizeSelectActual />
            </div>
            <button type='submit' disabled={load ? true : false}>
              <IoPaperPlaneOutline />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatView;