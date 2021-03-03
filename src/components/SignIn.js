import { useState } from 'react';

export function SignIn(props) {

    const [signUpInError, setsignUpInError] = useState(false);
    const [signUpControls, showSignUpControls] = useState(false);
    const [confirmControls, showConfirmControls] = useState(false);

    async function signIn() {
        const username = document.getElementById("username").value;
        const pwd = document.getElementById("pwd").value;
        const error = await props.signIn(username, pwd);
        console.log(error)
        if (error !== undefined) {
            setsignUpInError(error);
        }
    }

    async function signUp() {
        const username = document.getElementById("username").value;
        const pwd = document.getElementById("pwd").value;
        const email = document.getElementById("email").value;
        if (pwd.length < 8) {
            setsignUpInError('Password not long enough');
        } else if (email === undefined || email === '') {
            setsignUpInError("Email can't be empty");
        } else {
            const error = await props.signUp(username, pwd, email);
            console.log(error)
            if (error !== undefined) {
                setsignUpInError(error.split(':').pop());
            } else {
                setsignUpInError(false);
                showConfirmControls(true);
            }
        }
    }

    async function confirm() {
        const username = document.getElementById("username").value;
        const code = document.getElementById("code").value;
        const error = await props.confirm(username, code);
        if (error !== undefined) {
            setsignUpInError(error.split(':').pop());
        }
    }

    return (
        <div onClick={() => props.modal()} className="Modal-container">
            <div onClick={(e) => e.stopPropagation()} className="Modal-content">
                <div className="Modal-title">{props.title}</div>
                {signUpInError ? <p className="LogInError">{signUpInError}</p> : null}
                {confirmControls ?
                    <div className="SignUpIn-content">
                        <input onFocus={(e) => e.target.select()}
                            className="SignInInput"
                            type="text" id="username"
                            placeholder="Username"
                        />
                        <input onFocus={(e) => e.target.select()}
                            className="SignInInput"
                            type="number" 
                            id="code"
                            placeholder="Confirm code"
                        />
                        <button className="Save-button" onClick={() => confirm()}>Confirm</button>
                    </div>
                    :
                    <div className="Modal-content">
                        <input onFocus={(e) => e.target.select()} className="SignInInput" type="text" id="username" placeholder="Username" />
                        <input onFocus={(e) => e.target.select()} className="SignInInput" type="password" id="pwd" placeholder="Password" />
                        {signUpControls ?
                            <div className="SignUpIn-content">
                                <input onFocus={(e) => e.target.select()} className="SignInInput" type="email" id="email" placeholder="Email" />
                                <button className="Save-button" onClick={() => signUp()}>Sign Up</button>
                                <a href="#" onClick={() => showSignUpControls(false)}>You already have an account?</a>
                            </div>
                            :
                            <div className="SignUpIn-content">
                                <button className="Save-button" onClick={() => signIn()}>
                                    Sign in
                                </button>
                                <a href="#" onClick={() => showSignUpControls(true)}>Create account</a>
                                <a href="#" onClick={() => showConfirmControls(true)}>Confirm account</a>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
}
{/* <button className="Save-button" onClick={() => props.changePassword()}>Change password</button> */ }
// {
//     confirmButton ?
//         <div>
//             <input className="SignInInput" type="text" id="code" placeholder="Confirm code" />
//             <button className="Save-button" onClick={() => confirm()}>Confirm</button>
//         </div>
//         : null
// }
