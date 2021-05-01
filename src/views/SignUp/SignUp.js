import React, { useState } from 'react';
import { Input, Select } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import EcommerceImage from '../../assets/ecommerce5.png';
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState('Male');

  document.title = 'HandelX | Create an account';

  const { Option } = Select;
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      password,
      userType,
    };
    const refData = JSON.parse(sessionStorage.getItem('customer'));
    let isNewUser = true;
    for (let i = 0; i < refData.length; i++) {
      if (refData[i].email === email) {
        toast.error('An account with this email already exists', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        isNewUser = false;
      }
    }

    if (isNewUser) {
      refData.push(data);
      sessionStorage.setItem('customer', JSON.stringify(refData));
      history.push('/');
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className='register-root'>
        <h1 style={{ paddingTop: '3%' }}>Welcome to HandelX</h1>
        <h4>“Ecommerce isn’t the cherry on the cake, it’s the new cake”</h4>
        <img
          src={EcommerceImage}
          className='register-img-ref'
          alt='Shopping logo'
        />
        <div className='register-form'>
          <h3>Create an account</h3>
          <form onSubmit={handleSubmit}>
            <div className='input-field'>
              <Input
                type='text'
                prefix={<UserOutlined />}
                name='firstName'
                id='firstName'
                value={firstName}
                required
                pattern={`^[A-Za-z]+`}
                title='Enter only alphabets'
                placeholder='First Name'
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className='input-field'>
              <Input
                type='text'
                prefix={<UserOutlined />}
                name='lastName'
                id='lastName'
                value={lastName}
                required
                pattern={`^[A-Za-z]+`}
                title='Enter only alphabets'
                placeholder='Last Name'
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className='input-field'>
              <Input
                type='text'
                prefix={<MailOutlined />}
                name='email'
                id='email'
                value={email}
                required
                pattern={`^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-z]{2}$`}
                title='Ex: John.Doe@abc.com'
                placeholder='Email Address'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='input-field'>
              <Input
                type='password'
                name='password'
                prefix={<LockOutlined />}
                id='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='input-field'>
              <Select
                name='gender'
                onChange={(e) => setUserType(e)}
                showSearch={false}
                value={userType}
                style={{ width: '100%' }}
                placeholder='Please select gender'
                optionFilterProp='children'
              >
                <Option value='Male'>Male</Option>
                <Option value='Female'>Female</Option>
                <Option value='Others'>Do not specify</Option>
              </Select>
            </div>
            <p style={{ fontSize: '12px' }}>
              <Link to='/sign-in'>Already having account? Login here</Link>
            </p>
            <Input
              style={{
                width: '25%',
                backgroundColor: '#1890ff',
                color: '#fff',
              }}
              type='submit'
              value='Register'
            />
          </form>
        </div>
        <footer className='footer'>
          &copy; 2020 HandelX | All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default SignUp;
