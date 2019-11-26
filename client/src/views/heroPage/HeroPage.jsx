import React from 'react';
import Button from '../../components/button/Button';
import Form from '../../components/forms/';
import './HeroPage.scss';

function HeroPage(props) {

    return (
        <div className= "heroPageWrapper">
            <div className='col'>
                <Button
                text = "Get Started" 
                style = "welcome"
                clickEvent = {(e) => console.log(props)} />
            </div>

            <div className= "firstStepsWrapper">
                <div className='loginWrapper'>
                    <h1>Login</h1>
                    <Form
                    formType='login' />
                </div>
                <div>
                    {/* Signup */}
                </div>
            </div>
        </div>
    )
}
export default HeroPage;

