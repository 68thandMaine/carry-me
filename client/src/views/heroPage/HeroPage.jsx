import React from 'react';
import Button from '../../components/button/Button';
import './HeroPage.css';

function HeroPage(props) {

    return (
        <div className= "heroPageWrapper">
            <Button
                text = "Get Started" 
                style = "main" />
            
            <div className= "firstStepsWrapper">
                
            </div>
        </div>
    )
}
export default HeroPage;

