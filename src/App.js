import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes, faYenSign } from "@fortawesome/free-solid-svg-icons";

import { quotes } from "./data";

import { Card } from "./components/Card";
import { Challenge } from "./components/Challenge";

import "./App.css";

export function App() {
  const [quote, setQuote] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [challenges, setChallenges] = useState(null);

  useEffect(() => {
    getQuote();
    const challenges = JSON.parse(localStorage.getItem("challenges"));
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

  function saveChallege() {
    if (title !== "") {
      let dateString;
      const date = new Date();
      {
        if (startDate !== null) {
          const newStartDate = new Date(startDate);
          dateString = `${newStartDate.getDate()}.${newStartDate.getMonth()}.${newStartDate.getFullYear()}`
        } else {
          dateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        }
      }
      const challenges = JSON.parse(localStorage.getItem("challenges"));

      const challenge = {
        id: Math.floor(Date.now() * Math.random()),
        title: title,
        startDateString: dateString,
        startDate: date.toDateString(),
        lastLoggedDate: date.toDateString(),
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
      setTitle("");
      setStartDate(null);
    }
  }

  function update(id) {
    const currentDate = new Date().toDateString();
    const challenges = JSON.parse(localStorage.getItem("challenges"));

    const newChallenges = challenges.map(obj => {

      let lastLoggedDate = new Date(obj.lastLoggedDate);

      const days = (new Date(currentDate) - lastLoggedDate) / (24 * 60 * 60 * 1000);

      if (obj.id === id && days > 0) {
        return { ...obj, value: obj.value + days, lastLoggedDate: new Date().toDateString() }
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
            startDateString={item.startDateString}
            lastLoggedDate={item.lastLoggedDate}
            value={item.value}
            update={() => update(item.id)}
            updateState={(challenges) => setChallenges(challenges)}
          />
        ))
        : null}
      <div className="Add-challenge-container">
        {challenge ? (
          <Challenge
            saveChallege={() => saveChallege()}
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
  );
}

