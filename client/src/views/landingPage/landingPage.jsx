import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './landingPage.css';

function LandingPage () {
    return (
        <div className="landingPageWrapper"> 
            <div className="icon">
                <p>lol</p></div>
            <div className="phoneInput">
                <input type="Text"
                className="phoneNumber"/>
                
            </div>
            <div className="iconBars">
             <FontAwesomeIcon icon={['fab', 'facebook']} />
             <FontAwesomeIcon icon={['fab', 'google']} />

            </div>
            
        </div>
    )
}

export default LandingPage;
