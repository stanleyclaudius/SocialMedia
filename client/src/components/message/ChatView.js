import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoPaperPlaneOutline, IoVideocam } from 'react-icons/io5';
import { MdCall } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { createMessage, getMessage } from './../../redux/actions/messageActions';
import SingleMessage from './SingleMessage';
import Avatar from './../Avatar';

const ChatView = ({id}) => {
  const [text, setText] = useState('');
  const [info, setInfo] = useState({});

  const dispatch = useDispatch();
  const {auth, message} = useSelector(state => state);

  const handleSubmit = e => {
    e.preventDefault();

    const msg = {
      sender: auth.user,
      recipient: info,
      text,
      media: [],
      createdAt: new Date().toISOString()
    };

    dispatch(createMessage({msg, auth}));
    setText('');
  }

  useEffect(() => {
    dispatch(getMessage({id, auth}));
  }, [dispatch, id, auth]);

  useEffect(() => {
    const findUser = message.users.find(user => user.user._id === id);
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
                      <SingleMessage otherMessage={false} text={chat.text} avatar={auth.user.avatar} />
                    </div>
                    <div className="clear"></div>
                  </>
                ) : (
                  <>
                    <div className={`chatView__body--message chatView__body--otherMessage`} style={{marginTop: '8px'}}>
                      <SingleMessage otherMessage={true} text={chat.text} avatar={info.user?.avatar} />
                    </div>
                  </>
                )
              }
            </div>
          ))
        }
      </div>
      <div className="chatView__footer">
        <form onSubmit={handleSubmit}>
          <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder='Your message here ...' />
          <button type='submit'>
            <IoPaperPlaneOutline />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatView;