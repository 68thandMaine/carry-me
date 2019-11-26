import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Components
import Button from '../../button/Button';
import Input from '../../input/Input';
import Toggler from '../../toggler/Toggler';
// Styles
import './SignUpForm.scss';

function SignUpForm(props) {
let [accountType, setAccountType] = useState(true);

useEffect(() => {
  translateAccountType();
}, []);

function handleChangeAccountType(e) {
  console.log('change account type value', e);
  setAccountType(e)
}

function translateAccountType() {
  if (accountType === true) {
    return 'Driver';
  } else return 'Owner';
}
  return (
  <div>
    <div></div>
    <div></div>
    <div>
  <label htmlFor="accountType">{translateAccountType()}</label>
  <Toggler 
    value={accountType}
    toggle={handleChangeAccountType}
    />
    </div>
  </div>
  )
}

SignUpForm.propTypes = {

}

export default SignUpForm;
