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
import { Settings } from "./components/Settings";
import { ForgotPassword } from "./components/ForgotPassword";

import "./App.css";

Amplify.configure(awsconfig);


export function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [toast, showToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [quote, setQuote] = useState(null);
  const [signOutModal, showSignOutModal] = useState(false);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => authenticated(user))
      .catch(err => console.log(err), setIsAuthenticated(false));
    getQuote();
  }, []);

  function authenticated(user) {
    setIsAuthenticated(true);
    setUser(user.username);
  }

  function getQuote() {
    const random = Math.floor(Math.random() * quotes.length);
    for (let i = 0; i < quotes.length; i++) {
      if (i === random) {
        const element = quotes[i];
        setQuote(element);
      }
    }
  }

  return (
    <div className="App">
      <Router>
          {toast === true ?
            <Toast
              toastText={toastText}
              toast={toast}
              setToastText={(value) => setToastText(value)}
              showToast={(value) => showToast(value)}
            />
            : null}
          <Header
            user={user}
            isAuthenticated={isAuthenticated}
            quote={quote}
            signOutModal={(value) => showSignOutModal(value)}
          />
          <Switch>
            <Route exact path="/"><Main /></Route>
            <Route path="/Challenges"><Main /></Route>
            <Route path="/signin">
              <SignIn
                showToast={(value) => showToast(value)}
                setToastText={(value) => setToastText(value)}
                isAuthenticated={(value) => setIsAuthenticated(value)}
                user={(value) => setUser(value)}
              />
            </Route>
            <Route path="/signup"><SignUp /></Route>
            <Route path="/forgotpassword">
              <ForgotPassword 
                showToast={(value) => showToast(value)}
                setToastText={(value) => setToastText(value)}
              />
            </Route>
            <Route path="/confirm/:username">
              <Confirm
                showToast={(value) => showToast(value)}
                setToastText={(value) => setToastText(value)}
              />
            </Route>
            {isAuthenticated &&
              <Route>
                <Route path="/user">
                  <User />
                </Route>
                <Route path="/settings/:username">
                  <Settings
                    showToast={(value) => showToast(value)}
                    setToastText={(value) => setToastText(value)}
                  />
                </Route>
              </Route>
            }
          </Switch>
          {signOutModal ?
            <Modal>
              <SignOutModalChild
                title="Are you sure that you want to sign out?"
                isAuthenticated={(value) => setIsAuthenticated(value)}
                user={(value) => setUser(value)}
                showSignOutModal={(value) => showSignOutModal(value)}
                setToastText={(value) => setToastText(value)}
                showToast={(value) => showToast(value)}
                modal={(value) => showSignOutModal(value)}
              />
            </Modal>
            : null}
      </Router>
    </div>
  );
}

