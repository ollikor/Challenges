import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

export function Settings(props) {

    const { setToastText, showToast } = props;

    let history = useHistory();

    const [confirmError, setConfirmError] = useState(false);
    const [confirm, sentConfirm] = useState(false);

    let { username } = useParams();

    function sendConfirmCode() {
        Auth.forgotPassword(username)
            .then(() =>
                setToastText('Confirm code sent to email'),
                showToast(true),
                sentConfirm(true))
            .catch(err => setConfirmError(err.message));
    }

    function changePassword() {
        const code = document.getElementById("code").value;
        const new_password = document.getElementById("pwd").value;

        if (new_password.length < 8) {
            setConfirmError('Password not long enough');
        } else {
            Auth.forgotPasswordSubmit(username, code, new_password)
                .then(() =>
                    setToastText('Password changed'),
                    showToast(true),
                    history.push('/user'))
                .catch(err => setConfirmError(err.message.split(':').pop()));
        }
    }

    return (
        <div className="Confirm-content">
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