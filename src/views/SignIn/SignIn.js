import React, { useState, useContext } from 'react';
import { Input } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import EcommerceImage from '../../assets/ecommerce2.png';
import { DispatchContext } from '../../context/userContext';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('abc@abc.com');
  const [password, setPassword] = useState('qwerty');
  const dispatch = useContext(DispatchContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const refData = JSON.parse(sessionStorage.getItem('customer'));
    let errorExist = false;
    for (let i = 0; i < refData.length; i++) {
      console.log(email, password, 'outer before here');
      if (refData[i].email === email && refData[i].password === password) {
        console.log(email, password, 'entered before here');
        console.log(history, 'history obj');
        dispatch({ type: 'LOGIN_SUCCESS', payload: refData[i] });
        console.log('entered here');
        console.log(history, 'history obj');
        errorExist = false;
        history.push('/');
      } else if (refData[i].email === email) {
        toast.error('Incorrect password', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        errorExist = false;
      } else {
        errorExist = true;
      }
    }

    if (errorExist) {
      toast.error('No user found with this details', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  document.title = 'HandelX | Login';

  return (
    <div className='login-root'>
      <ToastContainer />
      <h1>Welcome to HandelX</h1>
      <h4>“Ecommerce isn’t the cherry on the cake, it’s the new cake”</h4>
      <img src={EcommerceImage} className='login-img-ref' alt='Shopping logo' />
      <div className='login-form'>
        <h3>Please Login to continue</h3>
        <form onSubmit={handleSubmit}>
          <div className='input-field'>
            <label htmlFor='email'></label>
            <Input
              type='text'
              prefix={<UserOutlined />}
              name='email'
              id='email'
              value={email}
              required
              pattern={`^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-z]{2}$`}
              placeholder='Email Address'
              title='Ex: John.Doe@abc.com'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='input-field'>
            <label htmlFor='password'></label>
            <Input
              type='password'
              name='password'
              prefix={<LockOutlined />}
              id='password'
              placeholder='Password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p style={{ fontSize: '12px' }}>
            <Link to='/sign-up'>New here? Register to HandelX</Link>
          </p>
          <Input
            style={{ width: '25%', backgroundColor: '#1890ff', color: '#fff' }}
            type='submit'
            value='Login'
          />
        </form>
      </div>
      <footer className='footer'>
        &copy; 2020 HandelX | All rights reserved.
      </footer>
    </div>
  );
};

export default SignIn;
