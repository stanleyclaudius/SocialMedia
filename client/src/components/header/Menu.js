import React from 'react';
import {
  AiOutlineCompass,
  AiOutlineHome,
  AiOutlineHeart,
  AiFillCompass,
  AiFillHome,
  AiFillHeart
} from 'react-icons/ai';
import { IoPaperPlaneOutline, IoPaperPlaneSharp } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
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
    },
    {
      path: '/notification',
      Icon: AiOutlineHeart,
      ActiveIcon: AiFillHeart
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
    </div>
  )
}

export default Menu;