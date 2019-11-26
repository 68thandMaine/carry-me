import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Components
import Button from '../../button/Button';
import Input from '../../input/Input';
import Toggler from '../../toggler/Toggler';
// Styles
import './SignUpForm.scss';

function SignUpForm(props) {
let [ accountType, setAccountType ] = useState(true);
const [ signUpInputs, setSignUpInputs ] = useState({});

useEffect(() => {
  translateAccountType();
}, []);

function translateAccountType() {
  if (accountType === true) {
    return 'Driver';
  } else return 'Owner';
}

function handleChangeAccountType(e) {
  setAccountType(e);
}

function handleInputChange(e) {
  e.persist();
  setSignUpInputs(signUpInputs => ({...signUpInputs, [e.target.name]: e.target.value}));
}
function signUp(e) {
  e.preventDefault();
  props.signUp(signUpInputs);
}
  return (
    <div className='signUpFormWrapper' data-cy='signupForm'>
      {{
        true:
          <div className='driverinfo'>
            <h3>Have some spare time and a trailer</h3>
            <p>As a driver you can help people on your time by transporting their cars from a to b.</p>          
          </div>,
        false:
          <div className='ownerinfo'>
            <h3>Do you have vehicles that need to be moved</h3>
            <p>An Owner account will put your inventory in the sights of every user of Carry-Me. Let help come to you. It's easy as that.</p>
          </div>,
      }[accountType]}
    <form>
    <div>
      <label htmlFor="toggler" data-cy='accountTypeLabel'>{translateAccountType()}</label>
      <Toggler 
        value={accountType}s
        toggle={handleChangeAccountType}
        testingId='account_toggler'
        />
        <label htmlFor='email'>Email</label>
        <Input
          type='string'
          name='email'
          testingId='email_signup'
          handleChange={handleInputChange}
          />
        <label htmlFor='address'>What's your address</label>
        <Input
          type='string'
          name='address'
          testingId='address_signup'
          handleChange={handleInputChange}
          />  
      </div>
      <Button
        style='submit'
        text='Sign Up'
        clickEvent={signUp}
        testingId="signup_button" />
      </form>
    </div>
  )
}

SignUpForm.propTypes = {
  // signUp: PropTypes.func.isRequired,
}

export default SignUpForm;
