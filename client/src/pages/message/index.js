import { AiFillWechat } from 'react-icons/ai';
import PeopleList from "./../../components/message/PeopleList";

const Message = () => {
  return (
    <div className='container message'>
      <div className="message__left">
        <PeopleList />
      </div>
      <div className="message__right">
        <div className="placeholder">
          <AiFillWechat />
          <h2>Start Chatting</h2>
        </div>
      </div>
    </div>
  )
}

export default Message;