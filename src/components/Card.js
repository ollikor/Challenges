import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

export function Card(props) {
  
  const bronze = { name: 'Bronce', color: '#cd7f32', margin: '10px' }
  const silver = { name: 'Silver', color: '#C0C0C0', margin: '10px' }
  const gold = { name: 'Gold', color: '#FFDF00', margin: '10px' }
  const diamond = { name: 'diamond', color: '#FFDF00', margin: '10px' }

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
    } else if(props.value > 365) {
        status = diamond;
        statusArea = 4;
        min = 365;
    }
    return {
      status,
      statusArea,
      min,
      max
    }
  }


  // function percent(status) {
  //   let count = 0;
  //   let fixedPercent;

  //   if(props.value > status.min) {
  //     fixedPercent = props.value - status.min;
  //   }else {
  //     fixedPercent = props.value;
  //   }

  //   for (let i = status.min; i <= status.max; i++) {
  //     count = count + 1;
  //   }
  //   let percent = fixedPercent / count * 100;
  //   return percent;
  // }

  function progress() {
    console.log('progress');
    // const status = checkStatus();
    // const percents = percent(status);
    // console.log(status.statusArea)
    // console.log(percents)


    // switch (status.statusArea) {
    //   case 1:
    //     return (
    //       <div>
    //         <FontAwesomeIcon className="Icon" icon={faCrown} style={status.status} />
    //         <p>{`${status.status.name} - ${status.statusArea}`}</p>
    //         <div className="Progress-bar">
    //           <span style={progressBar(percents)}></span>
    //         </div>
    //       </div>
    //     )
    //   case 2:
    //     return (
    //       <div>
    //         <FontAwesomeIcon className="Icon" icon={faCrown} style={status.status} />
    //         <FontAwesomeIcon className="Icon" icon={faCrown} style={status.status} />
    //         <p>{`${status.status.name} - ${status.statusArea}`}</p>
    //         <div className="Progress-bar">
    //           <span style={progressBar(percents)}></span>
    //         </div>
    //       </div>
    //     )
    //   case 3:
    //     return (
    //       <div>
    //         <FontAwesomeIcon className="Icon" icon={faCrown} style={status.status} />
    //         <FontAwesomeIcon className="Icon" icon={faCrown} style={status.status} />
    //         <FontAwesomeIcon className="Icon" icon={faCrown} style={status.status} />
    //         <p>{`${status.status.name} - ${status.statusArea}`}</p>
    //         <div className="Progress-bar">
    //           <span style={progressBar(percents)}></span>
    //         </div>
    //       </div>
    //     )
    //   default:
    //     break;
    // }
  }

  function background() {
    console.log('background')
    if (props.index !== undefined && props.index % 2 === 0) {
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

  // function progressBar(percents) {
  //   return (
  //     {
  //       position: 'absolute',
  //       zIndex: 10,
  //       left: 0,
  //       backgroundColor: 'green',
  //       width: `${percent}%`,
  //       maxWidth: '100%',
  //       height: '10px',
  //       borderRadius: 0
  //     }
  //   )
  // }

  return (
    <div onClick={() => alert('dsfa')} className="Card" style={background()}>
      <span>Started {props.startDate} - {props.value} days</span>
      <h3 className="Card-title">{props.title}</h3>
      {progress()}
    </div>
  );
};
