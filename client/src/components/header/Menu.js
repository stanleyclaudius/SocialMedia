import { useState, useEffect } from 'react';
import {
  AiOutlineCompass,
  AiOutlineHome,
  AiOutlineHeart,
  AiFillCompass,
  AiFillHome,
  AiFillHeart
} from 'react-icons/ai';
import { IoPaperPlaneOutline, IoPaperPlaneSharp, IoLogOut } from 'react-icons/io5';
import { FaUserAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import Avatar from './../Avatar';
import Notification from './../Notification';

const Menu = () => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [isUnread, setIsUnread] = useState(false);
  const links = [
    {
      path: '/',
      Icon: AiOutlineHome,
      ActiveIcon: AiFillHome
    },
    {
      path: '/message',
      Icon: IoPaperPlaneOutline,
      ActiveIcon: IoPaperPlaneSharp
    },
    {
      path: '/discover',
      Icon: AiOutlineCompass,
      ActiveIcon: AiFillCompass
    }
  ];
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const {auth, notification} = useSelector(state => state);
  
  const isLinkActive = path => {
    if (path === pathname) return true;
    return false;
  }

  const handleCloseAllDropdown = () => {
    setIsOpenProfile(false);
    setIsOpenNotification(false);
  }

  const handleClickProfile = () => {
    setIsOpenProfile(!isOpenProfile);
    setIsOpenNotification(false);
  }

  const handleClickNotification = () => {
    setIsOpenNotification(!isOpenNotification);
    setIsOpenProfile(false);
  }

  const handleLogout = () => {
    setIsOpenProfile(false);
    dispatch(logout());
  }

  useEffect(() => {
    const data = notification.data.filter(item => !item.isRead);
    if (data.length > 0) {
      setIsUnread(true);
    }

    return () => setIsUnread(false);
  }, [notification.data])

  return (
    <div className='menu'>
      {
        links.map(link => (
          <Link to={link.path} key={link.path} onClick={handleCloseAllDropdown}>
            {isLinkActive(link.path) ? <link.ActiveIcon /> : <link.Icon />}
          </Link>
        ))
      }

      <div className='notification'>
        {
          isOpenNotification 
          ? (
            <div className='notification__icon'>
              <AiFillHeart onClick={handleClickNotification} />
              {isUnread && <span></span>}
            </div>
          )
          : (
            <div className='notification__icon'>
              <AiOutlineHeart onClick={handleClickNotification} />
              {isUnread && <span></span>}
            </div>
          )
        }

        <div className={`notification__dropdown ${isOpenNotification ? 'active' : ''}`}>
          {
            notification.data.length === 0
            ? (
              <div style={{textAlign: 'center', lineHeight: '300px'}}>
                <h3 style={{color: '#aaa', letterSpacing: '2px'}}>Notification is Empty.</h3>
              </div>
            )
            : (
              <>
                {
                  notification.data.map(msg => (
                    <Notification 
                      key={msg._id}
                      id={msg._id}
                      avatar={msg.from.avatar}
                      content={`${msg.from.username} ${msg.content}`}
                      url={msg.url}
                      isRead={msg.isRead}
                      setIsOpenNotification={setIsOpenNotification}
                    />
                  ))
                }
              </>
            )
          }
        </div>
      </div>

      <div className='profile'>
        <div onClick={handleClickProfile}>
          <Avatar src={auth.user?.avatar} size='xs' />
        </div>

        <div className={`profile__dropdown ${isOpenProfile ? 'active' : ''}`}>
          <Link to={`/profile/${auth.user?._id}`} onClick={() => setIsOpenProfile(false)}>
            <FaUserAlt />
            Profile
          </Link>
          <div className='separator'></div>
          <Link to='/login' onClick={handleLogout}>
            <IoLogOut />
            Logout
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Menu;