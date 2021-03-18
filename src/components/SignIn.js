import { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

import { Loader } from './Loader';

export function SignIn(props) {

    useEffect(() => showLoader(false),[]);

    const { isAuthenticated, setToastText, showToast, user } = props;
    
    let history = useHistory();
    
    const [signUpInError, setsignUpInError] = useState(false);
    const [loader, showLoader] = useState(false);

    async function signIn() {
        showLoader(true);
        
        const username = document.getElementById("username").value;
        const pwd = document.getElementById("pwd").value;
        
        try {
            await Auth.signIn(username, pwd);
            isAuthenticated(true);
            user(username);
            setToastText('Signed in');
            showToast(true);
            history.push(`/user`);
        } catch (error) {
            setsignUpInError('Invalid username or password');
        }
    }

    return (
        <div className="SignIn-content">
            <div className="Modal-title">Sign In</div>
            {signUpInError ? <p className="LogInError">{signUpInError}</p> : null}
            <input onFocus={(e) => e.target.select()}
                className="SignInInput"
                type="text"
                id="username"
                placeholder="Username"
            />
            <input onFocus={(e) => e.target.select()}
                className="SignInInput"
                type="password"
                id="pwd"
                placeholder="Password"
            />
            <button type="button" className="Save-button" onClick={() => signIn()}>
                {loader ? <Loader /> :'Sign in'}
            </button>
            <Link to="/signup">Create account</Link>
        </div>
    );
}
