import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './login/LoginForm';


function Forms(props) {
const [formToShow, setFormToShow] = useState("");

useEffect(() => {
  setFormToShow(props.formType);
});

 
  return (
    <div>
    {{
      login: <LoginForm

      />,
    }[formToShow]}
    </div>
  )
}

Forms.propTypes = {
  formType: PropTypes.string
};

export default Forms;