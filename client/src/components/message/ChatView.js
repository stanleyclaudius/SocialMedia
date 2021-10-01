import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoPaperPlaneOutline, IoVideocam } from 'react-icons/io5';
import { MdCall, MdPhotoSizeSelectActual } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { uploadImage } from './../../utils/imageHelper';
import { GLOBALTYPES } from './../../redux/actions/globalTypes';
import {createMessage, deleteConversation, getMessage } from './../../redux/actions/messageActions';
import SingleMessage from './SingleMessage';
import Avatar from './../Avatar';
import LoadingGif from './../../images/loading.gif';

const ChatView = ({id}) => {
  const emojiArr = [
    '😀', '😫', '😄', '😁', '😆', '😅', '😂', '🤣',
    '😊', '😇', '🙂', '🙃', '😍', '🥰', '😘', '😗',
    '😚', '😋', '😛', '😝', '😜', '🤪', '😭', '😤',
    '😠', '😡', '🥱', '😴', '🤤', '😪', '🤮', '🤧',
    '😷', '🤒', '👋', '👌', '✌️', '👍', '👎', '🤐'
  ];
  
  const [text, setText] = useState('');
  const [info, setInfo] = useState({});
  const [images, setImages] = useState([]);
  const [load, setLoad] = useState(false);
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [messages, setMessages] = useState([]);

  const history = useHistory();
  const messageEndRef = useRef();

  const dispatch = useDispatch();
  const {auth, message, socket, peer} = useSelector(state => state);

  const handleClickEmoji = emoji => {
    setText(t => t + emoji);
    setIsOpenEmoji(false);
  }

  const handleDeleteConversation = () => {
    dispatch(deleteConversation({id, auth}));
    history.push('/message');
  }

  const handleImageChange = e => {
    const newImages = [...e.target.files];

    setImages([...images, ...newImages]);
  }

  const deleteImage = index => {
    const imgCopy = [...images];
    imgCopy.splice(index, 1);
    setImages(imgCopy);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!text.trim() && images.length === 0) return;

    setText('');
    setImages([]);

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

    setLoad(false);
    dispatch(createMessage({msg, auth, socket}));
  }

  const caller = ({video}) => {
    const {_id, avatar, username, name} = info.user;
    const msg = {
      sender: auth.user._id,
      recipient: _id,
      avatar,
      username,
      name,
      video
    };

    dispatch({
      type: GLOBALTYPES.CALL,
      payload: msg
    });
  }

  const callUser = ({video}) => {
    const {_id, avatar, username, name} = auth.user;
    const msg = {
      sender: _id,
      recipient: info.user._id,
      avatar, username, name, video
    };

    if (peer.open) {
      msg.peerId = peer._id;
    }

    socket.emit('callUser', msg);
  }

  const handleAudioCall = () => {
    caller({video: false});
    callUser({video: false});
  }

  const handleVideoCall = () => {
    caller({video: true});
    callUser({video: true});
  }

  useEffect(() => {
    if (message.data.every(item => item._id !== id)) {
      dispatch(getMessage({id, auth}));
    }
  }, [dispatch, id, message.data, auth]);

  useEffect(() => {
    const newMsg = message.data.find(item => item._id === id);
    if (newMsg) {
      setMessages(newMsg.messages);
    }
  }, [message.data, id]);

  useEffect(() => {
    const findUser = message.users.find(user => user.user?._id === id);
    if (findUser)
      setInfo(findUser);
  }, [message.users, id]);

  useEffect(() => {
    if (messageEndRef) {
      messageEndRef.current.addEventListener('DOMNodeInserted', event => {
        const {currentTarget: target} = event;
        target.scroll({top: target.scrollHeight, behavior: 'smooth'});
      })
    }
  }, []);

  return (
    <div className='chatView'>
      <div className="chatView__header">
        <div className="chatView__header--left">
          <Avatar size='small' src={info.user?.avatar} />
          <p>{info.user?.username}</p>
        </div>
        <div className="chatView__header--right">
          <MdCall onClick={handleAudioCall} />
          <IoVideocam onClick={handleVideoCall} />
          <FaTrash onClick={handleDeleteConversation} style={{color: 'red'}} />
        </div>
      </div>
      <div className="chatView__body" ref={messageEndRef}>
        {
          messages.map((chat, index) => (
            <div key={index}>
              {
                chat.sender._id === auth.user._id 
                ? (
                    <>
                      <div className={`chatView__body--message chatView__body--yourMessage`}>
                        <SingleMessage otherMessage={false} text={chat.text} avatar={auth.user.avatar} media={chat.media} datetime={chat.createdAt} />
                      </div>
                    </>
                ) : (
                  <>
                    <div className={`chatView__body--message chatView__body--otherMessage`} style={{marginTop: '8px'}}>
                      <SingleMessage otherMessage={true} text={chat.text} avatar={info.user?.avatar} media={chat.media} datetime={chat.createdAt} />
                    </div>
                  </>
                )
              }
            </div>
          ))
        }

        {
          load &&
          <div className='chatView__body--message chatView__body--yourMessage'>
            <img src={LoadingGif} alt='loading' />
          </div>
        }
      </div>

      {
        images.length > 0 &&
        <div className='chatView__imageHolder'>
          {
            images.map((img, index) => (
              <div key={index}>
                {
                  img.type.match(/video/i)
                  ? (
                    <div className='chatView__imageHolder--single'>
                      <video src={URL.createObjectURL(img)} controls />
                      <p onClick={() => deleteImage(index)}>&times;</p>
                    </div>
                  )
                  : (
                    <div className='chatView__imageHolder--single'>
                      <img src={URL.createObjectURL(img)} alt='Message' />
                      <p onClick={() => deleteImage(index)}>&times;</p>
                    </div>
                  )
                }
              </div>
            ))
          }
        </div>
      }
      
      <div className="chatView__footer">
        <form onSubmit={handleSubmit}>
          <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder='Your message here ...' />
          <div className='chatView__footerRight'>
            <div className='emoji'>
              <p className='emoji__first' onClick={() => setIsOpenEmoji(!isOpenEmoji)}>😀</p>
              <div className={`emoji__container ${isOpenEmoji ? 'active' : ''}`}>
                {
                  emojiArr.map((emoji, index) => (
                    <p key={index} onClick={() => handleClickEmoji(emoji)}>{emoji}</p>
                  ))
                }
              </div>
            </div>
            <div className='fileSelector'>
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