import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { register } from './../redux/actions/authActions';
import validateEmail from './../utils/checkEmail';
import HeadInfo from './../utils/HeadInfo';
import Loading from './../components/Loading';
import { GLOBALTYPES } from '../redux/constants/globalTypes';

const checkErr = ({name, username, email, password, confirmPassword}) => {
  let err = {};

  if (!name) {
    err.name = 'Name can\'t be empty.';
  }

  if (!username) {
    err.username = 'Username can\'t be empty.';
  } else if (username.length > 40) {
    err.username = 'Username maximum length is 40 characters.';
  }

  if (!email) {
    err.email = 'Email address can\'t be empty.';
  } else if (!validateEmail(email)) {
    err.email = 'Email format is incorrect.';
  }

  if (!password) {
    err.password = 'Password can\'t be empty.';
  } else if (password.length < 6) {
    err.password = 'Password should be at least 6 characters.';
  }

  if (!confirmPassword) {
    err.confirmPassword = 'Password confirmation can\'t be empty.'
  }

  return err;
}

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const {auth, alert} = useSelector(state => state);

  const handleInputChange = e => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value});
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    const err = checkErr({...userData});
    if (Object.keys(err).length !== 0) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: err
      })
    } else {
      dispatch(register(userData));
    }
  }

  useEffect(() => {
    if (auth.token)
      history.push('/');
  }, [auth.token, history]);

  return (
    <>
      {
        alert.loading &&
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          bottom: '0',
          right: '0',
          background: 'rgba(0, 0, 0, .8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '999'
        }}>
          <Loading />
        </div>
      }
      <HeadInfo title='SR Social - Register' />
      <div className='auth'>
        <div className="auth__box">
          <h1>SR Social</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="inputGroup">
              <label htmlFor="name">Name</label>
              <input type="text" id='name' name='name' autoComplete='off' value={userData.name} onChange={handleInputChange} style={{background: alert.name ? '#ffd1d1' : ''}} />
              {alert.name && <small style={{color: 'red'}}>{alert.name}</small>}
            </div>
            <div className="inputGroup">
              <label htmlFor="username">Username</label>
              <input type="text" id='username' name='username' autoComplete='off' value={userData.username.replace(/ /g, '').toLowerCase()} onChange={handleInputChange} style={{background: alert.username ? '#ffd1d1' : ''}} />
              {alert.username && <small style={{color: 'red'}}>{alert.username}</small>}
            </div>
            <div className="inputGroup">
              <label htmlFor="email">Email address</label>
              <input type="text" id='email' name='email' autoComplete='off' value={userData.email} onChange={handleInputChange} style={{background: alert.email ? '#ffd1d1' : ''}} />
              {alert.email && <small style={{color: 'red'}}>{alert.email}</small>}
            </div>
            <div className="inputGroup">
              <label htmlFor="password">Password</label>
              <div className="inputGroup--password">
                <input type={isShowPassword ? 'text' : 'password'} name="password" id="password" value={userData.password} onChange={handleInputChange} style={{background: alert.password ? '#ffd1d1' : ''}} />
                {isShowPassword ? <AiFillEyeInvisible onClick={() => setIsShowPassword(false)} /> : <AiFillEye onClick={() => setIsShowPassword(true)} />}
              </div>
              {alert.password && <small style={{color: 'red'}}>{alert.password}</small>}
            </div>
            <div className="inputGroup">
              <label htmlFor="confirmPassword">Password Confirmation</label>
              <div className="inputGroup--password">
                <input type={isShowConfirmPassword ? 'text' : 'password'} id='confirmPassword' name='confirmPassword' autoComplete='off' value={userData.confirmPassword} onChange={handleInputChange} style={{background: alert.confirmPassword ? '#ffd1d1' : ''}} />
                {isShowConfirmPassword ? <AiFillEyeInvisible onClick={() => setIsShowConfirmPassword(false)} /> : <AiFillEye onClick={() => setIsShowConfirmPassword(true)} />}
              </div>
              {alert.confirmPassword && <small style={{color: 'red'}}>{alert.confirmPassword}</small>}
            </div>
            <button>Register</button>
          </form>
          <p to='/register'>
            Already have an account? Click <Link to='/login'>here</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register;