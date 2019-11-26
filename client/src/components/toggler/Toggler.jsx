import React from 'react';
import PropTypes from 'prop-types';

import './Toggler.scss';

const Toggler = (props) => {

const handleToggle = () => {
  props.toggle(!props.value);
};

  return (
    <div className='togglerWrapper'>
      {/* <p className='' onClick={handlToggle}></p> */}
      <input 
        className='toggler' 
        type='checkbox' 
        name='toggler' 
        value={props.value} 
        data-cy={props.testingId}
        onClick={handleToggle}/>
      {/* <p  className='' onClick={handlToggle}></p> */}
    </div>
  )
}

Toggler.propTypes = {
  value: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  testingId: PropTypes.string,
};

export default Toggler;