import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const Search = () => {
  const [search, setSearch] = useState('');

  return (
    <form className='search'>
      <input type='text' value={search} onChange={e => setSearch(e.target.value)} autoComplete='off' />
      {
        !search && (
          <span>
            <AiOutlineSearch />
            Search username ...
          </span>
        )
      }
    </form>
  )
}

export default Search;