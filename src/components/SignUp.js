import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

export function SignUp() {

    const history = useHistory();

    const [signUpInError, setsignUpInError] = useState(false);

    async function signUp() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("pwd").value;
        const email = document.getElementById("email").value;

        if (password.length < 8) {
            setsignUpInError('Password not long enough');
        } else if (email === undefined || email === '') {
            setsignUpInError("Email can't be empty");
        } else {
            try {
                await Auth.signUp({
                    username,
                    password,
                    attributes: { email }
                });
                history.push(`/confirm/${username}`);
            } catch (error) {
                setsignUpInError(error.message.split(':').pop());
            }
        }
    }

    return (
        <div className="SignUp-content">
            <div className="Modal-title">Sign up</div>
            {signUpInError ? <p className="LogInError">{signUpInError}</p> : null}
            <input
                onFocus={(e) => e.target.select()}
                className="SignInInput"
                type="text"
                id="username"
                placeholder="Username" />
            <input
                onFocus={(e) => e.target.select()}
                className="SignInInput"
                type="password"
                id="pwd"
                placeholder="Password" />
            <input
                onFocus={(e) => e.target.select()}
                className="SignInInput"
                type="email"
                id="email"
                placeholder="Email" />
            <button
                className="Save-button"
                onClick={() => signUp()}>Sign Up</button>
        </div>
    );
}