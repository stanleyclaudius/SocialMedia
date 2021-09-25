import { useParams } from 'react-router-dom';
import PeopleList from "./../../components/message/PeopleList";
import ChatView from './../../components/message/ChatView';
import HeadInfo from './../../utils/HeadInfo';

const Message = () => {
  const {id} = useParams();

  return (
    <>
      <HeadInfo title={`SR Social - Message User 1`} />
      <div className='container message'>
        <div className="message__left">
          <PeopleList />
        </div>
        <div className="message__right">
          <ChatView id={id} />
        </div>
      </div>
    </>
  )
}

export default Message;