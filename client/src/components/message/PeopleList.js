import { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { getDataAPI } from './../../utils/fetchData';
import { GLOBALTYPES } from './../../redux/actions/globalTypes';
import { getConversation, MESSAGE_TYPES } from './../../redux/actions/messageActions';
import Avatar from './../Avatar';
import UserCard from './../UserCard';
import Loading from './../../images/loading.gif';

const PeopleList = () => {
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  const {auth, message} = useSelector(state => state);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoad(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
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

  const handleAddUser = user => {
    setSearch('');
    setUsers([]);
    dispatch({
      type: MESSAGE_TYPES.ADD_USER,
      payload: user
    });
  }

  useEffect(() => {
    dispatch(getConversation({auth}));
  }, [dispatch, auth]);

  useEffect(() => {
    if (!search)
      setUsers([]);
  }, [search]);

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
                    <div style={{cursor: 'pointer'}} key={user._id} className='searchResult__single' onClick={() => handleAddUser(user)}>
                      <Avatar src={user.avatar} size='small' />
                      <div className='searchResult__single--right'>
                        <p>{user.name}</p>
                        <h5>{user.username}</h5>
                      </div>
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
      </form>

      {
        users.length === 0 && 
        (
          <div className="peopleList__container">
            {
              message.users.map(item => (
                <Link key={item._id} to={`/message/${item.user._id}`} style={{color: '#000', textDecoration: 'none'}}>
                  <UserCard
                    onMessage={true}
                    msg={item}
                  />
                </Link>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default PeopleList;