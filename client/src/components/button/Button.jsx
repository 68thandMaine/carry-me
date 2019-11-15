import React from 'react';
import './Button.css';

function Button(props) {
    
    return (
        <button 
            className={props.style}
            onClick={()=>console.log(props)}>{props.text}
        </button>
    );
}
export default Button;


