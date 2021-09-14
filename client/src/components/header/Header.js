import React from 'react';
import Search from './Search';
import Menu from './Menu';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
      <Link to='/'><h2>SR Social</h2></Link>
      <Search />
      <Menu />
    </div>
  )
}

export default Header;