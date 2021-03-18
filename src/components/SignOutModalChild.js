import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

import { Loader } from './Loader';

export function SignOutModalChild(props) {

  useEffect(() => showLoader(false),[]);

  const { isAuthenticated, setToastText, showToast, modal, title, user } = props;

  let history = useHistory();

  const [signOutError, setSignOutError] = useState(false);
  const [loader, showLoader] = useState(false);

  async function signOut() {
    showLoader(true);
    
    try {
      await Auth.signOut();
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
          {loader ? <Loader /> : 'Sign out'}
        </button>
      </div>
    </div>
  );
}