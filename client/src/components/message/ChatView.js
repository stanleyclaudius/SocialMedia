import { useState } from 'react';
import { IoPaperPlaneOutline, IoVideocam } from 'react-icons/io5';
import { MdCall } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import SingleMessage from './SingleMessage';
import Avatar from './../Avatar';

const ChatView = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
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
        <div className="chatView__body--message chatView__body--otherMessage">
          <SingleMessage otherMessage={true} text='Lorem ipsum dolor sit amet.' />
        </div>
        <div className="chatView__body--message chatView__body--yourMessage">
          <SingleMessage text='Dolor ipsum lorem amtet sit test lorem.' />
        </div>
        <div className="clear"></div>
        <div className="chatView__body--message chatView__body--yourMessage">
          <SingleMessage text='Dolor ipsum lorem.' />
        </div>
        <div className="clear"></div>
        <div className="chatView__body--message chatView__body--yourMessage">
          <SingleMessage text='Hi' />
        </div>
        <div className="clear"></div>
        <div className="chatView__body--message chatView__body--otherMessage">
          <SingleMessage otherMessage={true} text='Hi.' />
        </div>
        <div className="chatView__body--message chatView__body--otherMessage">
          <SingleMessage otherMessage={true} text='Hi.' />
        </div>
        <div className="chatView__body--message chatView__body--otherMessage">
          <SingleMessage otherMessage={true} text='Hi.' />
        </div>
        <div className="chatView__body--message chatView__body--otherMessage">
          <SingleMessage otherMessage={true} text='Hi.' />
        </div>
        <div className="chatView__body--message chatView__body--otherMessage">
          <SingleMessage otherMessage={true} text='Hi.' />
        </div>
      </div>
      <div className="chatView__footer">
        <form onSubmit={handleSubmit}>
          <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder='Your message here ...' />
          <button type='submit'>
            <IoPaperPlaneOutline />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatView;