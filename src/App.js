import React, { useState, useEffect } from "react";
import { Card } from "./components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./App.css";

const quotes = [
  {
    quote: "The way to get started is to quit talking and begin doing.",
    name: "Walt Disney"
  },
  {
    quote: "Just do it.",
    name: "Nike"
  },
  {
    quote: "The pessimist sees difficulty in every opportunity. The optimist sees the opportunity in every difficulty.",
    name: "Winston Churchill"
  }
]
function App() {
  const [quote, setQuote] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [text, setText] = useState("");
  const [challenges, setChallenges] = useState(null);

  useEffect(() => {
    getQuote();
    const challenges = JSON.parse(localStorage.getItem("challenges"));
    setChallenges(challenges);
    console.log(challenges)
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
    const date = new Date();
    const dateString = `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getFullYear()}`;

    if (text !== "") {
      const challenges = JSON.parse(localStorage.getItem("challenges"));
      if (challenges !== null) {
        const challenge = {
          id: Date.now(),
          title: text,
          startDate: dateString,
          currentDate: dateString,
          value: 0,
          logged: false
        };
        localStorage.setItem("challenges", JSON.stringify([...challenges, challenge]));
        setChallenges([
          ...challenges,
          challenge
        ]);
      } else {
        const challenge = [{
          id: Date.now(),
          title: text,
          startDate: dateString,
          currentDate: dateString,
          value: 0,
          logged: false
        }];
        localStorage.setItem("challenges", JSON.stringify(challenge));
        setChallenges(challenge);
      }
    }
    setChallenge(false);
  }

  function update(id) {
    const challenges = JSON.parse(localStorage.getItem("challenges"));
    const newChallenges = challenges.map(obj => 
      obj.id === id ? {...obj, value: obj.value + 1} : obj
    );
    localStorage.setItem("challenges", JSON.stringify(newChallenges));
    setChallenges(newChallenges)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="Header-title">Challenges</h2>
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
            title={item.title}
            startDate={item.startDate}
            value={item.value}
            update={()=> update(item.id)}
          />
        ))
        : null}
      <div className="Add-challenge-container">
        {challenge ? (
          <div className="Add-challenge">
            <input placeholder="Add challenge" onChange={(e) => setText(e.target.value)} />
            <button className="Save-button" onClick={() => saveChallege()}>Save</button>
          </div>
        ) : null}
        <button
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

export default App;
