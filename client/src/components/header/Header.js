import Search from './Search';
import Menu from './Menu';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
      <Link to='/'>
        <h2 onClick={() => window.scrollTo({top: 0})}>SR Social</h2>
      </Link>
      <Search />
      <Menu />
    </div>
  )
}

export default Header;