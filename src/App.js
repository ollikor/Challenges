import React, { useState, useEffect } from "react";
import Amplify, { Auth, auth0SignInButton, signInButton } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import awsconfig from './aws-exports';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import { quotes } from "./data";

import { Main } from "./components/Main";
import { Card } from "./components/Card";
import { Challenge } from "./components/Challenge";
import { Modal } from "./components/Modal";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { SignOutModalChild } from "./components/SignOutModalChild";
import { Toast } from "./components/Toast";

import "./App.css";
import { SignOut } from "./components/SignOutModalChild";

Amplify.configure(awsconfig);

export function App() {
  // Auth.currentUserInfo().then((value) => { console.log(value) });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modal, showModal] = useState(false);
  const [toast, showToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [user, setUser] = useState(false);
  const [createAccount, showCreateAccount] = useState(false);
  const [quote, setQuote] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [challenges, setChallenges] = useState(null);
  const [signOutModal, showSignOutModal] = useState(false);

  // Auth.currentAuthenticatedUser().then((user) => { 
  //   setIsAuthenticated(true) 
  // }).catch(err => setIsAuthenticated(false));
  async function signUp(username, password, email) {
    console.log(username)
    console.log(password)
    console.log(email)
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      });
      console.log(user);
      // setUser(username);

    } catch (error) {
      return error.message;

    }
  }

  async function signIn(username, pwd) {
    try {
      await Auth.signIn(username, pwd);
      showModal(false);
      setIsAuthenticated(true);
      setToastText('Signed in');
      showToast(true);
    } catch (error) {
      return 'Invalid username or password';
    }
  }

  async function signOut() {
    try {
      await Auth.signOut();
      setIsAuthenticated(false);
      showSignOutModal(false);
      setToastText('Signed out');
      showToast(true);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  async function confirm(username, code) {
    try {
      await Auth.confirmSignUp(username, code);
      showModal(false);
      setToastText('Confirmed');
      showToast(true);
    } catch (error) {
      return error.message;
    }
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => setIsAuthenticated(true))
      .catch(err => console.log(err), setIsAuthenticated(false));
    getQuote();
    // const challenges = JSON.parse(localStorage.getItem("challenges"));
    // setChallenges(challenges);
  }, []);

  function getQuote() {
    const random = Math.floor(Math.random() * quotes.length);
    quotes.map((item, index) => {
      if (index === random) {
        setQuote(item);
      }
    });
  }

  // function changePassword() {
  //   Auth.currentAuthenticatedUser()
  //     .then(user => {
  //       return Auth.changePassword(user, 'Q12345678_q', 'Q12345678_q');
  //     })
  //     .then(data => console.log(data))
  //     .catch(err => console.log(err));
  // }

  // function saveChallege() {
  //   if (title !== "") {
  //     let dateString;
  //     const date = new Date();
  //     {
  //       if (startDate !== null) {
  //         const newStartDate = new Date(startDate);
  //         dateString = `${newStartDate.getDate()}.${newStartDate.getMonth()}.${newStartDate.getFullYear()}`
  //       } else {
  //         dateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
  //       }
  //     }
  //     const challenges = JSON.parse(localStorage.getItem("challenges"));

  //     const challenge = {
  //       id: Math.floor(Date.now() * Math.random()),
  //       title: title,
  //       startDateString: dateString,
  //       startDate: date.toDateString(),
  //       lastLoggedDate: date.toDateString(),
  //       value: 0,
  //     };

  //     if (challenges !== null) {
  //       localStorage.setItem("challenges", JSON.stringify([...challenges, challenge]));
  //       setChallenges([
  //         ...challenges,
  //         challenge
  //       ]);
  //     } else {
  //       localStorage.setItem("challenges", JSON.stringify([challenge]));
  //       setChallenges([challenge]);
  //     }
  //     setChallenge(false);
  //     setTitle("");
  //     setStartDate(null);
  //   }
  // }

  // function update(id) {
  //   const currentDate = new Date().toDateString();
  //   const challenges = JSON.parse(localStorage.getItem("challenges"));

  //   const newChallenges = challenges.map(obj => {

  //     let lastLoggedDate = new Date(obj.lastLoggedDate);

  //     const days = (new Date(currentDate) - lastLoggedDate) / (24 * 60 * 60 * 1000);

  //     if (obj.id === id && days > 0) {
  //       return { ...obj, value: obj.value + days, lastLoggedDate: new Date().toDateString() }
  //     } else {
  //       return obj
  //     }
  //   });
  //   localStorage.setItem("challenges", JSON.stringify(newChallenges));
  //   setChallenges(newChallenges)
  // }

  function show(user) {
    console.log('dsaf')
    return <h1>{user}</h1>;
  }

  // function isAuthenticatedContent() {
  //   Auth.currentAuthenticatedUser()
  //   .then(() => isAuthenticated(true))
  //   .catch(err => console.log(err));
  //   // if(isAuthenticated) {
  //   //   console.log('is authenticated')
  //   // }
  // }

  return (
    <div className="App">
      {toast === true ?
        <Toast
          toastText={toastText}
          toast={toast}
          hideToast={() => showToast(!toast)}
        />
        : null}
      <header className="App-header">
        {isAuthenticated ?
          <button type="button"
            onClick={() => showSignOutModal(true)}
            className="SignInOut"><FontAwesomeIcon
              icon={faSignOutAlt} /></button>
          :
          <button type="button"
            onClick={() => showModal(true)}
            className="SignInOut"><FontAwesomeIcon
              icon={faSignInAlt} /></button>
        }
        <h1 className="Header-title">Challenges</h1>
        {quote !== null ?
          <div>
            <p className="Quote-title">{quote.quote}</p>
            <p className="Quote-name">{quote.name}</p>
          </div>
          : null
        }
      </header>
      {isAuthenticated ?
        <div>
          <h1>yes</h1>
          <div className="Add-challenge-container">
            {challenge ? (
              <Challenge
                // saveChallege={() => saveChallege()}
                setTitle={(value) => setTitle(value)}
                setStartDate={(value) => setStartDate(value)}
              />
            ) : null}
            <button
              aria-label="button"
              className="Plus-button"
              onClick={() => setChallenge(!challenge)}
            >
              {
                challenge === true ?
                  <FontAwesomeIcon icon={faTimes} />
                  :
                  <FontAwesomeIcon icon={faPlus} />
              }
            </button>
          </div>
        </div>
        :
        // <h1>asdf</h1>
        <Main />
      }
      { // challenges !== null ?
        //   challenges.map((item, index) => (
        //     <Card
        //       key={index}
        //       index={index}
        //       id={item.id}
        //       title={item.title}
        //       startDateString={item.startDateString}
        //       lastLoggedDate={item.lastLoggedDate}
        //       value={item.value}
        //       update={() => update(item.id)}
        //       updateState={(challenges) => setChallenges(challenges)}
        //     />
        //   ))
        //   : null}
      }

      {modal ?
        <Modal>
            <SignIn
              title="Sign In"
              signIn={(username, pwd) => signIn(username, pwd)}
              signUp={(username, pwd, email) => signUp(username, pwd, email)}
              confirm={(username, code) => confirm(username, code)}
              modal={() => showModal(!modal)}
              // changePassword={() => changePassword()}
            />
        </Modal>
        : null}
        {signOutModal ? 
        <Modal>
          <SignOutModalChild 
          title="Are you sure that you want sign out?" 
          signOut={() => signOut()}
          modal={() => showSignOutModal(false)}
          />
        </Modal>
        :null}
    </div>
  );
}

