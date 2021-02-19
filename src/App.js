import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import { quotes } from "./data";

import { Card } from "./components/Card";

import "./App.css";

export function App() {
  console.log(new Date)
  const [quote, setQuote] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [text, setText] = useState("");
  const [challenges, setChallenges] = useState(null);

  useEffect(() => {
    getQuote();
    const challenges = checkDay();
    console.log(challenges);
    setChallenges(challenges);
  }, []);

  function getQuote() {
    const random = Math.floor(Math.random() * quotes.length);
    quotes.map((item, index) => {
      if (index === random) {
        setQuote(item);
      }
    });
  }

  function checkDay() {
    const date = new Date();
    const dateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    const challenges = JSON.parse(localStorage.getItem("challenges"));
    // console.log(date);
    // console.log(dateString);
    // console.log(challenges);
    return challenges;
  }

  function saveChallege() {
    if (text !== "") {
      // const date = new Date('2021-02-17T10:20:30Z');
      const date = new Date();
      const dateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
      const challenges = JSON.parse(localStorage.getItem("challenges"));

      const challenge = {
        id: Math.floor(Date.now() * Math.random()),
        title: text,
        startDate: dateString,
        lastLoggedDate: date,
        value: 0,
      };

      if (challenges !== null) {
        localStorage.setItem("challenges", JSON.stringify([...challenges, challenge]));
        setChallenges([
          ...challenges,
          challenge
        ]);
      } else {
        localStorage.setItem("challenges", JSON.stringify([challenge]));
        setChallenges([challenge]);
      }
      setChallenge(false);
    }
  }

  function update(id) {
    const currentDate = new Date();
    const challenges = JSON.parse(localStorage.getItem("challenges"));
    
    const newChallenges = challenges.map(obj => {
      let lastLoggedDate = new Date(obj.lastLoggedDate);
      const newLastLoggedDate = new Date(Date.UTC(lastLoggedDate.getFullYear(),lastLoggedDate.getMonth(),lastLoggedDate.getDate()));
      const newDate = new Date(Date.UTC(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate()));
         if (obj.id === id && newLastLoggedDate < newDate) {
          return { ...obj, value: obj.value + 1, lastLoggedDate: new Date() }
        } else {
        return obj
      }
    });
    localStorage.setItem("challenges", JSON.stringify(newChallenges));
    setChallenges(newChallenges)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Header-title">Challenges</h1>
        {quote !== null ?
          <div>
            <p className="Quote-title">{quote.quote}</p>
            <p className="Quote-name">{quote.name}</p>
          </div>
          : null
        }
      </header>
      {challenges !== null ?
        challenges.map((item, index) => (
          <Card
            key={index}
            index={index}
            id={item.id}
            title={item.title}
            startDate={item.startDate}
            lastLoggedDate={item.lastLoggedDate}
            value={item.value}
            update={() => update(item.id)}
            updateState={(challenges) => setChallenges(challenges)}
          />
        ))
        : null}
      <div className="Add-challenge-container">
        {challenge ? (
          <form className="Add-challenge" onSubmit={() => saveChallege()}>
            <input
              className="Challenge-input"
              type="text"
              placeholder="Add challenge"
              onChange={(e) => setText(e.target.value)}
              required
            />
            <input type="submit" className="Save-button" value="Save" />
          </form>
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
  );
}

