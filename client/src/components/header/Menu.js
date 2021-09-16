import { useState } from 'react';
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
import Avatar from './../Avatar';
import Notification from './../Notification';

const Menu = () => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
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
  
  const isLinkActive = path => {
    if (path === pathname) return true;
    return false;
  }

  return (
    <div className='menu'>
      {
        links.map(link => (
          <Link to={link.path} key={link.path}>
            {isLinkActive(link.path) ? <link.ActiveIcon /> : <link.Icon />}
          </Link>
        ))
      }

      <div className='notification'>
        <AiOutlineHeart onClick={() => setIsOpenNotification(!isOpenNotification)} />

        <div className={`notification__dropdown ${isOpenNotification ? 'active' : ''}`}>
          <Notification />
          <Notification />
          <Notification />
          <Notification />
        </div>
      </div>

      <div className='profile'>
        <div onClick={() => setIsOpenProfile(!isOpenProfile)}>
          <Avatar size='xs' />
        </div>

        <div className={`profile__dropdown ${isOpenProfile ? 'active' : ''}`}>
          <Link to='/profile/dsdf' onClick={() => setIsOpenProfile(false)}>
            <FaUserAlt />
            Profile
          </Link>
          <div className='separator'></div>
          <Link to='/login' onClick={() => setIsOpenProfile(false)}>
            <IoLogOut />
            Logout
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Menu;