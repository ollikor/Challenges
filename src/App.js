import React, { useState, useEffect } from "react";
import { Card } from "./components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
  const [challenge, setChallenge] = useState(false);
  const [text, setText] = useState("");
  const [challenges, setChallenges] = useState(null);

  useEffect(() => {
    const challenges = JSON.parse(localStorage.getItem("challenges"));
    console.log(challenges)
    setChallenges(challenges);
    getQuote();
  }, []);

  function saveChallege() {
    const date = new Date();
    const dateString = `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getFullYear()}`;

    if (text !== "") {
      const challenges = JSON.parse(localStorage.getItem("challenges"));
      if (challenges !== null) {
        challenges.push({ title: text, startDate: dateString, value: 0 });
        localStorage.setItem("challenges", JSON.stringify(challenges));
      } else {
        const challenge = [{ title: text, startDate: dateString, value: 0 }];
        localStorage.setItem("challenges", JSON.stringify(challenge));
      }
    }
  }

  function getQuote() {
    const random = Math.floor(Math.random() * quotes.length);
    quotes.map((item, index) => {
      if (index === random) {
        setQuote(item);
      }
    });
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
      {challenges !== null
        ? challenges.map((item, index) => (
          <Card
            key={index}
            index={index}
            title={item.title}
            startDate={item.startDate}
            value={item.value}
          />
        ))
        : null}
      {challenge ? (
        <div className="Add-challenge">
          <input onChange={(e) => setText(e.target.value)} />
          <button className="Save-button" onClick={() => saveChallege()}>Save</button>
        </div>
      ) : null}
      <button
        className="Plus-button"
        onClick={() => setChallenge(!challenge)}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}

export default App;
