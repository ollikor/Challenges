import { useState } from 'react';

import { API, graphqlOperation } from "aws-amplify";
import * as mutations from '../graphql/mutations';

import { bronze, silver, gold, diamond } from '../data';

import { Modal } from "./Modal";
import { ModalChild } from './ModalChild';
import { Crown } from "./Crown";

export function Card(props) {

const { id, title, startDate, value, refresh } = props;

  const [modal, showModal] = useState(false);

  function showStartDate() {
    const newStartDate = new Date(startDate);
    return `${newStartDate.getDate()}.${newStartDate.getMonth() + 1}.${newStartDate.getFullYear()}`
  }

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

  async function handleDelete(id) {
    try {
      const challenge = { id: id }
      await API.graphql(graphqlOperation(mutations.deleteChallenge, { input: challenge }));
      refresh();
    } catch (error) {
      return error.message
    }
  }

  async function handleUpdate(id, startDate) {
    try {
      let days;
      const currentDate = new Date();

      days = Math.floor((new Date(currentDate) - new Date(startDate)) / (24 * 60 * 60 * 1000));
      const challenge = { id: id, days: days }
      await API.graphql(graphqlOperation(mutations.updateChallenge, { input: challenge }));
      refresh();
    } catch (error) {
      return error.message
    }
  }

  return (
    <button onClick={() => showModal(!modal)} className="Card" style={background()}>
      <div className="Card-content">Started {showStartDate()} - {value} days</div>
      <h2 className="Card-title">{title}</h2>
      <Crown status={checkStatus()} value={value} />
      { modal ?
        <Modal>
          <ModalChild
            title={title}
            handleUpdate={() => handleUpdate(
              id,
              startDate
            )}
            handleDelete={() => handleDelete(id)}
          />
        </Modal>
        : null}
    </button>
  );
};
