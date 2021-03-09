import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

import { quotes } from "./data";

import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Modal } from "./components/Modal";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { SignOutModalChild } from "./components/SignOutModalChild";
import { Toast } from "./components/Toast";
import { Confirm } from "./components/Confirm";
import { User } from "./components/User";

import "./App.css";

Amplify.configure(awsconfig);


export function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [modal, showModal] = useState(false);
  const [toast, showToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [quote, setQuote] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [challenges, setChallenges] = useState(null);
  const [signOutModal, showSignOutModal] = useState(false);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => setIsAuthenticated(true))
      .catch(err => console.log(err), setIsAuthenticated(false));
    getQuote();
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

  return (
    <div className="App">
      <Router>
        {toast === true ?
          <Toast
            toastText={toastText}
            toast={toast}
            hideToast={() => showToast(!toast)}
          />
          : null}
        <Header
          isAuthenticated={isAuthenticated}
          quote={quote}
          signOutModal={() => showSignOutModal(true)}
        />
        <Switch>
          <Route exact path="/"><Main user={isAuthenticated} /></Route>
          <Route path="/Challenges"><Main user={isAuthenticated} /></Route>
          <Route path="/signin">
            <SignIn
              showToast={(value) => showToast(value)}
              setToastText={(value) => setToastText(value)}
              isAuthenticated={(value) => setIsAuthenticated(value)}
            />
          </Route>
          <Route path="/signup"><SignUp /></Route>
          <Route path="/confirm/:username">
            <Confirm
              showToast={(value) => showToast(value)}
              setToastText={(value) => setToastText(value)}
            />
          </Route>
          {isAuthenticated && <Route path="/user/:username"><User user={isAuthenticated} /></Route>}
        </Switch>
        {signOutModal ?
          <Modal>
            <SignOutModalChild
              title="Are you sure that you want to sign out?"
              isAuthenticated={(value) => setIsAuthenticated(value)}
              showSignOutModal={(value) => showSignOutModal(value)}
              setToastText={(value) => setToastText(value)}
              showToast={(value) => showToast(value)}
              modal={() => showSignOutModal(false)}
            />
          </Modal>
          : null}
      </Router>
    </div>
  );
}

