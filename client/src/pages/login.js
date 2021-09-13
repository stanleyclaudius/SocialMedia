import { useState } from 'react';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = e => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value});
  }

  const handleFormSubmit = e => {
    e.preventDefault();

    setUserData({email: '', password: ''});
  }

  return (
    <div>
      login
    </div>
  )
}

export default Login;