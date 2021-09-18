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
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
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

  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  
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
          ? <AiFillHeart onClick={handleClickNotification} />
          : <AiOutlineHeart onClick={handleClickNotification} />
        }

        <div className={`notification__dropdown ${isOpenNotification ? 'active' : ''}`}>
          <Notification />
          <Notification />
          <Notification />
          <Notification />
        </div>
      </div>

      <div className='profile'>
        <div onClick={handleClickProfile}>
          <Avatar src={auth.user?.avatar} size='xs' />
        </div>

        <div className={`profile__dropdown ${isOpenProfile ? 'active' : ''}`}>
          <Link to='/profile/dsdf' onClick={() => setIsOpenProfile(false)}>
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