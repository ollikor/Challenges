import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

export function Confirm(props) {

    const { setToastText, showToast } = props;

    let history = useHistory();

    const [confirmError, setConfirmError] = useState("Confirm code has been sent to your email");

    let { username } = useParams();

    async function confirm() {
        const code = document.getElementById("code").value;
        if(code !== "" && code !== undefined) {
            try {
                await Auth.confirmSignUp(username, code);
                setToastText('Confirmed');
                showToast(true);
                history.push('/signin');
            } catch (error) {
                setConfirmError(error.message.split(':').pop());
            }
        } else {
            setConfirmError("Set a confirm code from email");
        }
    }

    return (
        <div className="Confirm-content">
            {confirmError ? <p className="LogInError">{confirmError}</p> : null}
            <input
                value={username}
                disabled={true}
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
    );
}