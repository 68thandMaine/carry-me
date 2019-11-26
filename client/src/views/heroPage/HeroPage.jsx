import React from 'react';
import Button from '../../components/button/Button';
import Form from '../../components/forms/';
import './HeroPage.scss';

function HeroPage(props) {

    function handleLogin(creds) {
        console.log('Login Credentials: ', creds);
    }

    function handleSignUp(creds) {
        console.log('Signup Credentials: ', creds);
    }

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
                        formType='login'
                        login={handleLogin} />
                </div>
                <div className="signUpWrapper">
                    <h1>Sign Up</h1>
                    <Form
                        formType='signup'
                        signUp={handleSignUp} />
                </div>
            </div>
        </div>
    )
}
export default HeroPage;

