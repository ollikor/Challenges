import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

export function Settings(props) {

    const { setToastText, showToast } = props;

    let history = useHistory();

    const [confirmError, setConfirmError] = useState(false);
    const [confirm, sentConfirm] = useState(false);

    let { username } = useParams();

    function sentConfirmCode() {
        sentConfirm(true);
        setConfirmError("Confirm code has been sent to your email");
    }

    function sendConfirmCode() {
        Auth.forgotPassword(username)
            .then(() => sentConfirmCode())
            .catch(err => setConfirmError(err.message));
    }

    function passwordChanged() {
        setToastText('Password changed');
        showToast(true);
        history.push('/user');
    }


    function changePassword() {
        const code = document.getElementById("code").value;
        console.log(code);
        const new_password = document.getElementById("pwd").value;

        if (new_password.length < 8) {
            setConfirmError('Password not long enough');
        } else {
            if(code !== "" && code !== undefined) {
                Auth.forgotPasswordSubmit(username, code, new_password)
                .then(() => passwordChanged())
                .catch(err => setConfirmError(err.message.split(':').pop()));
                setConfirmError("");
            }
            else {
                setConfirmError("Get confirm code from email");
            }
        }   
    }

    return (
        <div className="Confirm-container">
            {confirmError ? <p className="LogInError">{confirmError}</p> : null}
            {confirm === false ?
                <button type="button" className="Save-button" onClick={() => sendConfirmCode()}>Change password</button>
                :
                <div className="Confirm-content">
                    <input
                        value={username}
                        disabled={true}
                        className="SignInInput"
                        type="text" id="username"
                        placeholder="Username"
                    />
                    <input onFocus={(e) => e.target.select()}
                        className="SignInInput"
                        type="password"
                        id="pwd"
                        placeholder="New password"
                    />
                    <input onFocus={(e) => e.target.select()}
                        className="SignInInput"
                        type="number"
                        id="code"
                        placeholder="Confirm code"
                    />
                    <button type="button" className="Save-button" onClick={() => changePassword()}>Save</button>
                </div>
            }
        </div>
    );
}