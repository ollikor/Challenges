import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

export function Confirm(props) {

    let history = useHistory();

    const [confirmError, setConfirmError] = useState(false);

    let { username } = useParams();

    async function confirm() {
        const code = document.getElementById("code").value;
        try {
            await Auth.confirmSignUp(username, code);
            props.setToastText('Confirmed');
            props.showToast(true);
            history.push('/signin');
        } catch (error) {
            setConfirmError(error.split(':').pop());
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