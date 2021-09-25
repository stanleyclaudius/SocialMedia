import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PeopleList from "./../../components/message/PeopleList";
import ChatView from './../../components/message/ChatView';
import HeadInfo from './../../utils/HeadInfo';

const Message = () => {
  const {id} = useParams();
  const [currentUser, setCurrentUser] = useState({});

  const {message} = useSelector(state => state);

  useEffect(() => {
    const findUser = message.users.find(user => user.user?._id === id);
    if (findUser)
      setCurrentUser(findUser);
  }, [message.users, id]);

  return (
    <>
      <HeadInfo title={`SR Social - Message ${currentUser.user?.name}`} />
      <div className='container message'>
        <div className="message__left">
          <PeopleList id={id} />
        </div>
        <div className="message__right">
          <ChatView id={id} />
        </div>
      </div>
    </>
  )
}

export default Message;