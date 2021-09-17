import PeopleList from "./../../components/message/PeopleList";
import ChatView from './../../components/message/ChatView';
import HeadInfo from './../../utils/HeadInfo';

const Message = () => {
  return (
    <>
      <HeadInfo title={`SR Social - Message User 1`} />
      <div className='container message'>
        <div className="message__left">
          <PeopleList />
        </div>
        <div className="message__right">
          <ChatView />
        </div>
      </div>
    </>
  )
}

export default Message;