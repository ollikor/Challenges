import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

export function Card(props) {
  function crown() {
    return (
      {
        color: '#cd7f32',
        // color: '#C0C0C0',
        // color: '#FFDF00',
        margin: '10px'
      }
    )
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

  function progress() {
    return (
      {
        position: 'absolute',
        zIndex: 10,
        left: 0,
        backgroundColor: 'green',
        width: '50%',
        height: '10px',
        borderRadius: 5
      }
    )
  }

  return (
    <div onClick={() => alert('dsfa')} className="Card" style={bacground()}>
      <span>Started {props.startDate} - {props.value} days</span>
      <h3 className="Card-title">{props.title}</h3>
      <span>
        <FontAwesomeIcon className="Icon" icon={faCrown} style={crown()} />
        <FontAwesomeIcon className="Icon" icon={faCrown} style={crown()} />
        <FontAwesomeIcon className="Icon" icon={faCrown} style={crown()} />
      </span>
      <p>Bronze - &#8544;</p>
      <div className="Progress-bar">
        <span style={progress()}></span>
      </div>
    </div>
  );
};
