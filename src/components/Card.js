import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

export function Card(props) {

  const bronze = { name: 'Bronce', color: '#cd7f32', margin: '10px' }
  const silver = { name: 'Silver', color: '#C0C0C0', margin: '10px' }
  const gold = { name: 'Gold', color: '#FFDF00', margin: '10px' }

  function crown() {
    let status;
    let statusValue;
    let min;
    let max;
    let count = 0;
    let fixedPercent;

    if (props.value >= 0 && props.value <= 120) {
      if (props.value >= 0 && props.value <= 40) {
        statusValue = 1
        min = 0;
        max = 40;
      }
      else if (props.value >= 40 && props.value <= 80) {
        statusValue = 2
        min = 40;
        max = 80;
      }
      else if (props.value >= 80 && props.value <= 120) {
        statusValue = 3
        min = 80;
        max = 120;
      }
      status = bronze;
    }
    else if (props.value > 120 && props.value <= 240) {
      if (props.value >= 120 && props.value <= 160) {
        statusValue = 1
        min = 120;
        max = 160;
      }
      else if (props.value >= 160 && props.value <= 200) {
        statusValue = 2
        min = 160;
        max = 200;
      }
      else if (props.value >= 200 && props.value <= 240) {
        statusValue = 3
        min = 200;
        max = 240;
      }
      status = silver;
    }
    else if (props.value > 240 && props.value <= 365) {
      if (props.value >= 240 && props.value <= 280) {
        statusValue = 1
        min = 240;
        max = 280;
      }
      else if (props.value >= 280 && props.value <= 320) {
        statusValue = 2
        min = 280;
        max = 320;
      }
      else if (props.value >= 320 && props.value <= 365) {
        statusValue = 3
        min = 320;
        max = 365;
      }
      status = gold;
    } else {
      statusValue = 4
      min = 365;
    }

    if(props.value > min) {
      fixedPercent = props.value - min;
    }else {
      fixedPercent = props.value;
    }

    for (let i = min; i <= max; i++) {
      count = count + 1;
    }
    let percent = fixedPercent / count * 100;

    switch (statusValue) {
      case 1:
        return (
          <div>
            <FontAwesomeIcon className="Icon" icon={faCrown} style={status} />
            <p>{`${status.name} - ${statusValue}`}</p>
            <div className="Progress-bar">
              <span style={progress(percent)}></span>
            </div>
          </div>
        )
      case 2:
        return (
          <div>
            <FontAwesomeIcon className="Icon" icon={faCrown} style={status} />
            <FontAwesomeIcon className="Icon" icon={faCrown} style={status} />
            <p>{`${status.name} - ${statusValue}`}</p>
            <div className="Progress-bar">
              <span style={progress(percent)}></span>
            </div>
          </div>
        )
      case 3:
        return (
          <div>
            <FontAwesomeIcon className="Icon" icon={faCrown} style={status} />
            <FontAwesomeIcon className="Icon" icon={faCrown} style={status} />
            <FontAwesomeIcon className="Icon" icon={faCrown} style={status} />
            <p>{`${status.name} - ${statusValue}`}</p>
            <div className="Progress-bar">
              <span style={progress(percent)}></span>
            </div>
          </div>
        )
      default:
        break;
    }
  }

  function bacground() {
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

  function progress(percent) {
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

  return (
    <div onClick={() => alert('dsfa')} className="Card" style={bacground()}>
      <span>Started {props.startDate} - {props.value} days</span>
      <h3 className="Card-title">{props.title}</h3>
      {crown()}
    </div>
  );
};
