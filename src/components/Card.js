import { useState } from 'react';

import { bronze, silver, gold, diamond } from '../data';

import { Modal } from "./Modal";
import { ModalChild } from './ModalChild';
import { Crown } from "./Crown";

export function Card(props) {

  const [modal, showModal] = useState(false);

  // Check if index of card is even and set correct background.
  function background() {
    if (props.index % 2 === 0) {
      return {
        backgroundColor: "#ffffff",
      };
    } else {
      return {
        backgroundColor: "#555555",
        color: '#ffffff'
      };
    }
  }

  function checkStatus() {
    let status;
    let statusArea;
    let min;
    let max;

    if (props.value >= 0 && props.value <= 40) {
      status = bronze;
      statusArea = 1;
      min = 0;
      max = 40;
    }
    else if (props.value >= 40 && props.value <= 80) {
      status = bronze;
      statusArea = 2;
      min = 40;
      max = 80;
    }
    else if (props.value >= 80 && props.value <= 120) {
      status = bronze;
      statusArea = 3;
      min = 80;
      max = 120;
    }
    else if (props.value >= 120 && props.value <= 160) {
      status = silver;
      statusArea = 1;
      min = 120;
      max = 160;
    }
    else if (props.value >= 160 && props.value <= 200) {
      status = silver;
      statusArea = 2;
      min = 160;
      max = 200;
    }
    else if (props.value >= 200 && props.value <= 240) {
      status = silver;
      statusArea = 3;
      min = 200;
      max = 240;
    }
    else if (props.value >= 240 && props.value <= 280) {
      status = gold;
      statusArea = 1;
      min = 240;
      max = 280;
    }
    else if (props.value >= 280 && props.value <= 320) {
      status = gold;
      statusArea = 2;
      min = 280;
      max = 320;
    }
    else if (props.value >= 320 && props.value <= 365) {
      status = gold;
      statusArea = 3;
      min = 320;
      max = 365;
    } else if (props.value > 365) {
      status = diamond;
      statusArea = 4;
      min = 365;
      max = null;
    }
    return {
      status,
      statusArea,
      min,
      max
    }
  }

  function handleDelete() {
    const challenges = JSON.parse(localStorage.getItem("challenges"));
    const newChallenges = challenges.filter(obj => obj.id !== props.id);
    localStorage.setItem("challenges", JSON.stringify(newChallenges));
    props.updateState(newChallenges);
  }

  return (
    <div onClick={() => showModal(!modal)} className="Card" style={background()}>
      <div className="Card-content">Started {props.startDateString} - {props.value} days</div>
      <h2 className="Card-title">{props.title}</h2>
      <Crown status={checkStatus()} value={props.value} />
      { modal ?
        <Modal>
          <ModalChild
            title={props.title}
            handleUpdate={() =>props.update()}
            handleDelete={() => handleDelete()}
          />
        </Modal>
        : null}
    </div>
  );
};
