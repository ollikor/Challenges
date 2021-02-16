import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faGem } from "@fortawesome/free-solid-svg-icons";

import { Crown } from "./Crown";

export function Card(props) {

  // Statuses
  const bronze = { name: 'Bronze', statusMark:'&#x2160', color: '#cd7f32', margin: '10px' }
  const silver = { name: 'Silver', statusMark:'&#x2160', color: '#C0C0C0', margin: '10px' }
  const gold = { name: 'Gold', statusMark:'&#x21604', color: '#FFDF00', margin: '10px' }
  const diamond = { name: 'diamond', statusMark:'&#x2160', color: '#66ccff', margin: '10px' }

  // Check if index of card is even and set correct background.
  function background() {
    if (props.index % 2 === 0) {
      return {
        backgroundColor: "#ffffff",
      };
    } else {
      return {
        backgroundColor: "#626262",
        color: 'white'
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

  function update() {
    if(props.updated === false) {
      props.update();
    }
  }

  return (
    <div onClick={() => update()} className="Card" style={background()}>
      <span>Started {props.startDate} - {props.value} days</span>
      <h3 className="Card-title">{props.title}</h3>
      <Crown status={checkStatus()} value={props.value} />
    </div>
  );
};
