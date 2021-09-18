import { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDataAPI } from './../../utils/fetchData';
import { GLOBALTYPES } from './../../redux/actions/globalTypes';
import Avatar from './../Avatar';
import Loading from './../../images/loading.gif';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoad(true);
      const res = await getDataAPI(`search?username=${search}`);
      setLoad(false);
      setUsers(res.data.users);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg
        }
      });
    }
  }

  useEffect(() => {
    if (!search)
      setUsers([]);
  }, [search]);

  return (
    <form onSubmit={handleSubmit} className='search'>
      <input type='text' value={search} onChange={e => setSearch(e.target.value)} autoComplete='off' />
      {
        !search && (
          <span>
            <AiOutlineSearch />
            Search username ...
          </span>
        )
      }

      {
        search && 
        <AiOutlineClose 
          style={{position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', color: '#a0a0a0', cursor: 'pointer'}}
          onClick={() => setSearch('')}
        />
      }

      {
        load && 
        <div style={{position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-45%)'}}>
          <img src={Loading} alt='Loading' style={{width: '20px', height: '20px'}} />
        </div>
      }

      {
        (users && search) && (
          <div className='searchResult'>
            {
              users.map(user => (
                <Link key={user._id} to={`/profile/${user._id}`} className='searchResult__single' onClick={() => setUsers([])}>
                  <Avatar src={user.avatar} size='small' />
                  <div className='searchResult__single--right'>
                    <p>{user.name}</p>
                    <h5>{user.username}</h5>
                  </div>
                </Link>
              ))
            }
          </div>
        )
      }
    </form>
  )
}

export default Search;