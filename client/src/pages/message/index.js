import { AiFillWechat } from 'react-icons/ai';
import PeopleList from "./../../components/message/PeopleList";
import HeadInfo from './../../utils/HeadInfo';

const Message = () => {
  return (
    <>
      <HeadInfo title='SR Social - Message' />
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
    </>
  )
}

export default Message;