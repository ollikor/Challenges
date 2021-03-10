import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

export function SignOutModalChild(props) {

  const { isAuthenticated, setToastText, showToast, modal, title, user } = props;

  let history = useHistory();
  
  const [signOutError, setSignOutError] = useState(false);

    async function signOut() {
        try {
          await Auth.signOut();
          console.log('signout')
          setToastText('Signed out');
          showToast(true);
          modal(false);
          isAuthenticated(false);
          user(false);
          history.push('/Challenges')
        } catch (error) {
          setSignOutError(error.message);
        }
      }

    return (
        <div onClick={() => modal(false)} className="Modal-container">
            <div onClick={(e) => e.stopPropagation()} className="Modal-content">
            {signOutError ? <p className="LogInError">{signOutError}</p> : null}
                <div className="Modal-title">{title}</div>
                <button className="Save-button" onClick={() => signOut()}>
                    Sign out
                </button>
            </div>
        </div>
    );
}