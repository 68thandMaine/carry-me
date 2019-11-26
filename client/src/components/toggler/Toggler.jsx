import React from 'react';
import PropTypes from 'prop-types';

import './Toggler.scss';

const Toggler = (props) => {

const handlToggle = () => {
  console.log(props)
  props.toggle(!props.value);
};

  return (
    <div className='togglerWrapper'>
      <p className='' onClick={handlToggle}></p>
      <input 
        className='toggler' type='checkbox' 
        name='toggler' 
        value={props.value} 
        onClick={handlToggle}/>
      <p  className='' onClick={handlToggle}></p>
    </div>
  )
}

Toggler.propTypes = {
  value: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Toggler;