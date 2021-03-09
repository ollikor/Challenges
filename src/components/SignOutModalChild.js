import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

export function SignOutModalChild(props) {

  let history = useHistory();
  
  const [signOutError, setSignOutError] = useState(false);

  useEffect(() => {
    return() => props.isAuthenticated(false);
  });

    async function signOut() {
        try {
          await Auth.signOut();
          console.log('signout')
          props.setToastText('Signed out');
          props.showToast(true);
          history.push('/Challenges')
        } catch (error) {
          setSignOutError(error.message);
        }
      }

    return (
        <div onClick={() => props.modal()} className="Modal-container">
            <div onClick={(e) => e.stopPropagation()} className="Modal-content">
            {signOutError ? <p className="LogInError">{signOutError}</p> : null}
                <div className="Modal-title">{props.title}</div>
                <button className="Save-button" onClick={() => signOut()}>
                    Sign out
                </button>
            </div>
        </div>
    );
}