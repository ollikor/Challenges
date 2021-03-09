import { useState } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";
export function SignIn(props) {

    let history = useHistory();

    const [signUpInError, setsignUpInError] = useState(false);

    async function signIn() {
        const username = document.getElementById("username").value;
        const pwd = document.getElementById("pwd").value;
        try {
            await Auth.signIn(username, pwd);
            props.isAuthenticated(true);
            props.setToastText('Signed in');
            props.showToast(true);
            history.push(`/user/${username}`);
        } catch (error) {
            setsignUpInError('Invalid username or password');
        }
        // const error = await props.signIn(username, pwd);
        // console.log(error)
        // if (error !== undefined) {
        //     setsignUpInError(error);
        // }
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
            <button className="Save-button" onClick={() => signIn()}>
                Sign in
            </button>
            <Link to="/signup">Create account</Link>
            {/* <Link to="/confirm">Confirm account</Link> */}
        </div>
    );
}
