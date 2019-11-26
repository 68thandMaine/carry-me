import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

function Button(props) {
    
    return (
        <button 
            className={props.style}
            data-cy={props.testingId}
            onClick={props.clickEvent}>{props.text}
        </button>
    );
}

Button.propTypes = {
    style: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    clickEvent: PropTypes.func.isRequired,
    testingId: PropTypes.string,
}

export default Button;


