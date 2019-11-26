import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from '../../button/Button';
import Input from '../../input/Input';

import './Login.scss';

function LoginForm(props) {
  const [loginFormInputs, setLoginFormInputs]= useState({});

  function handleInputChange(e) {
    e.persist();
    setLoginFormInputs(loginFormInputs => ({...loginFormInputs, [e.target.name]: e.target.value}));
  }

  function handleLogin(e) {
    e.preventDefault();
    console.log(loginFormInputs);
  }

  return (
    <form className='loginForm' id='loginForm' data-cy='loginForm'>
      <div className='inputWrapper'>
        <label 
          htmlFor="email"
          className="label"
          >Email</label>
        <Input 
          type='text'
          name='email'
          placeholder='example@gmail.com'
          handleChange={handleInputChange}/>
        </div>
        <div>
          <label 
            htmlFor="password">Password</label>
        <Input
          type='text'
          name='password'
          placeholder='**********'
          handleChange={handleInputChange} />
        
      </div>
      <div className='loginActionWrapper'>
        <Button
          style='submit'
          text='submit'
          testingId='subtmitButton'
          clickEvent={handleLogin}
          />
          <div className='loginOptions'>
            <a>Forget User Id / Password</a>
            <a>Regiseter Your Account</a>
          </div>
      </div>
    </form>
  )
}

LoginForm.propType = {

}

export default LoginForm;