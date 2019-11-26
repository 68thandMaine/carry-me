import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './login/LoginForm';
import SignUpForm from './signup/SignUpForm';


function Forms(props) {
const [formToShow, setFormToShow] = useState("");

useEffect(() => {
  setFormToShow(props.formType);
});

 
  return (
    <div>
    {{
      login: <LoginForm
        login={props.login}
      />,
      signup: <SignUpForm
        signUp={props.signUp}
      />
    }[formToShow]}
    </div>
  )
}

Forms.propTypes = {
  formType: PropTypes.string.isRequired,
  login: PropTypes.func,
  signUp: PropTypes.func,
};

export default Forms;