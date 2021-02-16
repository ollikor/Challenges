import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faGem } from "@fortawesome/free-solid-svg-icons";

export function Card(props) {

  // Statuses
  const bronze = { name: 'Bronze', color: '#cd7f32', margin: '10px' }
  const silver = { name: 'Silver', color: '#C0C0C0', margin: '10px' }
  const gold = { name: 'Gold', color: '#FFDF00', margin: '10px' }
  const diamond = { name: 'diamond', color: '#66ccff', margin: '10px' }

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


  // Calculate past percentage of days in the correct statusarea
  function percentage(status) {
    let days = 0;
    let fixedDays;
    let percentage;

    // If value is more than min, reduce min from value to get correct
    // percentage of current statusarea. 
    // example value is 100 days, min is 80 and max 120 in the current statusarea. 
    // Value is more than days between min and max so percentage is over 100%.
    if(status.max !== null) {
      if (props.value > status.min) {
        fixedDays = props.value - status.min;
      } else {
        fixedDays = props.value;
      }
      
      // Calculate days amount between min and max
      for (let i = status.min; i <= status.max; i++) {
        days = days + 1;
      }
      
      // Calculate past percentage of days
      return percentage = fixedDays / days * 100;
    }else{
      return percentage = 100;
    }
  }

  // Progressbar style
  function progressBar(percent) {
    return (
      {
        position: 'absolute',
        zIndex: 10,
        left: 0,
        backgroundColor: 'green',
        width: `${percent}%`,
        maxWidth: '100%',
        height: '10px',
        borderRadius: 0
      }
    )
  }

  function progress() {
    const status = checkStatus();
    const percent = percentage(status);

    switch (status.statusArea) {
      case 1:
        return (
          <div>
            <FontAwesomeIcon className="Icon" icon={faCrown} style={status.status} />
            <p>{`${status.status.name} - `}&#8544;</p>
            <div className="Progress-bar">
              <span style={progressBar(percent)}></span>
            </div>
          </div>
        )
      case 2:
        return (
          <div>
            <FontAwesomeIcon className="Icon" icon={faCrown} style={status.status} />
            <FontAwesomeIcon className="Icon" icon={faCrown} style={status.status} />
            <p>{`${status.status.name} - `}&#8545;</p>
            <div className="Progress-bar">
              <span style={progressBar(percent)}></span>
            </div>
          </div>
        )
      case 3:
        return (
          <div>
            <FontAwesomeIcon className="Icon" icon={faCrown} style={status.status} />
            <FontAwesomeIcon className="Icon" icon={faCrown} style={status.status} />
            <FontAwesomeIcon className="Icon" icon={faCrown} style={status.status} />
            <p>{`${status.status.name} - `}&#8546;</p>
            <div className="Progress-bar">
              <span style={progressBar(percent)}></span>
            </div>
          </div>
        )
      case 4:
        return (
          <div>
            <FontAwesomeIcon className="Icon" icon={faGem} style={status.status} />
            <p>{`${status.status.name}`}</p>
            <div className="Progress-bar">
              <span style={progressBar(percent)}></span>
            </div>
          </div>
        )
      default:
        break;
    }
  }

  function update() {
    props.update();
  }

  return (
    <div onClick={() => update()} className="Card" style={background()}>
      <span>Started {props.startDate} - {props.value} days</span>
      <h3 className="Card-title">{props.title}</h3>
      {progress()}
    </div>
  );
};
