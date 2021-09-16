import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import UserCard from './../UserCard';

const PeopleList = () => {
  const [search, setSearch] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <div className='peopleList'>
      <form onSubmit={handleSubmit}>
        <div>
          <input type='text' value={search} onChange={e => setSearch(e.target.value)} />
          {
            !search && (
              <span>
                <AiOutlineSearch />
                Search username ...
              </span>
            )
          }
        </div>
        <button type='submit'>Search</button>
      </form>
      <div className="peopleList__container">
        <Link to='/message/dfdf' style={{color: '#000', textDecoration: 'none'}}>
          <UserCard
            message='Hello'
          />
        </Link>
        <Link to='/message/dfdf' style={{color: '#000', textDecoration: 'none'}}>
          <UserCard
            message='Hello'
          />
        </Link>
      </div>
    </div>
  )
}

export default PeopleList;