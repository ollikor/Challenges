import { useState } from 'react';

export function SignUp(props) {

    const [confirmButton, showConfirmButton] = useState(false);

    function signUp() {
        const username = document.getElementById("username").value;
        const pwd = document.getElementById("pwd").value;
        const email = document.getElementById("email").value;
        props.signUp(username, pwd, email);

    }

    function confirm() {
        const code = document.getElementById("code").value;
        props.verify(code);
    }
    return (
        <div onClick={() => props.modal()} className="Modal-container">
            <div onClick={(e) => e.stopPropagation()} className="Modal-content">
                <div className="Modal-title">{props.title}</div>
                {props.signUpInError ? <p className="LogInError">{props.signUpInError}</p> : null}
                <input className="SignInInput" type="text" id="username" placeholder="Username" />
                <input className="SignInInput" type="password" id="pwd" placeholder="Password" />
                <input className="SignInInput" type="email" id="email" placeholder="Email" />
                {confirmButton ?
                    <div>
                        <input className="SignInInput" type="text" id="code" placeholder="Confirm code" />
                        <button className="Save-button" onClick={() => confirm()}>Confirm</button>
                    </div>
                    : null}
                <button className="Save-button" onClick={() => signUp()}>Sign Up</button>
            </div>
        </div>
    );
}