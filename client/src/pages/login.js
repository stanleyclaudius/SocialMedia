import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import HeadInfo from './../utils/HeadInfo';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleInputChange = e => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value});
  }

  const handleFormSubmit = e => {
    e.preventDefault();

    setUserData({email: '', password: ''});
  }

  return (
    <>
      <HeadInfo title='SR Social - Login' />
      <div className='auth'>
        <div className="auth__box">
          <h1>SR Social</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="inputGroup">
              <label htmlFor="email">Email address</label>
              <input type="text" id='email' name='email' autoComplete='off' value={userData.email} onChange={handleInputChange} />
            </div>
            <div className="inputGroup">
              <label htmlFor="password">Password</label>
              <div className="inputGroup--password">
                <input type={isShowPassword ? 'text' : 'password'} name="password" id="password" value={userData.password} onChange={handleInputChange} />
                {isShowPassword ? <AiFillEyeInvisible onClick={() => setIsShowPassword(false)} /> : <AiFillEye onClick={() => setIsShowPassword(true)} />}
              </div>
            </div>
            <button>Login</button>
          </form>
          <p to='/register'>
            Don't have an account? Click <Link to='/register'>here</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login;