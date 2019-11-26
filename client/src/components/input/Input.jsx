import React from 'react';
import PropTypes from 'prop-types';


function Input(props) {

  return (
    <div>
    <input type={props.type} name={props.name} value={props.value} onChange={props.handleChange}/>
    </div>
  )
}

Input.propType = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
}
export default Input;