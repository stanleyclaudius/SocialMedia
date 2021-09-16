import Avatar from "./Avatar";

const Notification = () => {
  return (
    <div className='singleNotification'>
      <div className="singleNotification__left">
        <Avatar size='small' />
        <div></div>
      </div>
      <div className="singleNotification__right">
        <p>
          <span>username01</span> just liked your post.
        </p>
      </div>
    </div>
  )
}

export default Notification;