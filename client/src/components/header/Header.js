import React from 'react';
import Search from './Search';
import Menu from './Menu';

const Header = () => {
  return (
    <div className='header'>
      <h2>SR Social</h2>
      <Search />
      <Menu />
    </div>
  )
}

export default Header;