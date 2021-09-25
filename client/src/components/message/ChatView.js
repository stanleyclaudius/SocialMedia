import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoPaperPlaneOutline, IoVideocam } from 'react-icons/io5';
import { MdCall } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { createMessage } from './../../redux/actions/messageActions';
import SingleMessage from './SingleMessage';
import Avatar from './../Avatar';

const ChatView = ({id}) => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  const {auth, message} = useSelector(state => state);

  const handleSubmit = e => {
    e.preventDefault();

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: [],
      createdAt: new Date().toISOString()
    };

    dispatch(createMessage({msg, auth}));
    setText('');
  }

  return (
    <div className='chatView'>
      <div className="chatView__header">
        <div className="chatView__header--left">
          <Avatar size='small' />
          <p>username01</p>
        </div>
        <div className="chatView__header--right">
          <MdCall />
          <IoVideocam />
          <FaTrash />
        </div>
      </div>
      <div className="chatView__body">
        {
          message.data.map(chat => (
            <>
              <div className={`chatView__body--message chatView__body--${chat.sender === auth.user._id ? 'yourMessage' : 'otherMessage'}`}>
                <SingleMessage otherMessage={chat.sender === auth.user._id ? false : true} text={chat.text} />
              </div>
              {
                chat.sender === auth.user._id &&
                <div className="clear"></div>
              }
            </>
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