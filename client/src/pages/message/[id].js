import PeopleList from "./../../components/message/PeopleList";
import ChatView from './../../components/message/ChatView';

const Message = () => {
  return (
    <div className='container message'>
      <div className="message__left">
        <PeopleList />
      </div>
      <div className="message__right">
        <ChatView />
      </div>
    </div>
  )
}

export default Message;