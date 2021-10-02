import Avatar from './Avatar';
import FollowBtn from './FollowBtn';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdPhotoSizeSelectActual } from 'react-icons/md';
import { FaVideoSlash, FaVideo, FaPhoneSlash, FaPhone } from 'react-icons/fa';
import { BsCircleFill } from 'react-icons/bs';

const UserCard = ({user, msg, setIsOpenFollowers, setIsOpenFollowings, onMessage, status}) => {
  const {auth} = useSelector(state => state);
  
  const handleCloseAll = () => {
    if (setIsOpenFollowings) setIsOpenFollowings(false);
    if (setIsOpenFollowers) setIsOpenFollowers(false);
  }

  return (
    <div className='userCard' onClick={handleCloseAll}>
      {
        onMessage
        ? (
          <div>
            <div className="userCard__left">
              <Avatar src={msg.user?.avatar} size='small' />
              <div>
                <p>{msg.user?.username}</p>
                {
                  msg.media.length > 0 
                  ? (
                    <small style={{display: 'flex', marginTop: '4px', alignItems: 'center'}}>
                      {msg.media.length}
                      <MdPhotoSizeSelectActual style={{marginLeft: '5px', transform: 'translateY(-1px)'}} />
                    </small>
                  )
                  : msg.call
                    ? (
                      <div style={{display: 'flex', alignItems: 'center', margin: '0', color: '#aaa'}}>
                        {
                          msg.call.times > 0
                          ? msg.call.video
                            ? (
                              <>
                                <FaVideo style={{fontSize: '14px'}} />
                                <div style={{marginLeft: '5px'}}>
                                  <small>{(parseInt(msg.call.times/3600)).toString().length < 2 ? '0' + (parseInt(msg.call.times/3600)) : (parseInt(msg.call.times/3600))}</small>
                                  <small> : </small>

                                  <small>{(parseInt(msg.call.times/60)).toString().length < 2 ? '0' + (parseInt(msg.call.times/60)) : (parseInt(msg.call.times/60))}</small>
                                  <small> : </small>

                                  <small>{(msg.call.times%60).toString().length < 2 ? '0' + (msg.call.times%60) : (msg.call.times%60)}</small>
                                </div>
                              </>
                            )
                            : (
                              <>
                                <FaPhone style={{fontSize: '14px'}} />
                                <div style={{marginLeft: '5px'}}>
                                  <small>{(parseInt(msg.call.times/3600)).toString().length < 2 ? '0' + (parseInt(msg.call.times/3600)) : (parseInt(msg.call.times/3600))}</small>
                                  <small> : </small>

                                  <small>{(parseInt(msg.call.times/60)).toString().length < 2 ? '0' + (parseInt(msg.call.times/60)) : (parseInt(msg.call.times/60))}</small>
                                  <small> : </small>

                                  <small>{(msg.call.times%60).toString().length < 2 ? '0' + (msg.call.times%60) : (msg.call.times%60)}</small>
                                </div>
                              </>
                            )
                          : msg.call.video
                            ? (
                              <>
                                <FaVideoSlash />
                              </>
                            )
                            : (
                              <>
                                <FaPhoneSlash />
                              </>
                            )
                        }
                      </div>
                    )
                    : (
                      <small>
                        {
                          msg.text.length > 25
                          ? msg.text.slice(0, 25) + ' ...'
                          : msg.text
                        }
                      </small>
                    )
                }
              </div>
            </div>
          </div>
        )
        : (
          <Link style={{color: '#000', textDecoration: 'none'}} to={`/profile/${user?._id}`}>
            <div className="userCard__left">
              <Avatar src={user?.avatar} size='small' />
              <div>
                <p>{user?.username}</p>
              </div>
            </div>
          </Link>
        )
      }
      
      {
        <div className="userCard__right">
          {
            status === 'online'
            ? <BsCircleFill style={{color: 'green', fontSize: '11px'}} />
            : (status === 'offline' && auth.user.followings.find(item => item._id === user?._id)) && <BsCircleFill style={{color: '#aaa', fontSize: '11px'}} />
          }
        </div>
      }
      
      {
        !msg && (
          <div className="userCard__right">
            <FollowBtn user={user} />
          </div>
        )
      }
    </div>
  )
}

export default UserCard;