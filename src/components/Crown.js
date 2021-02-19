import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faGem } from "@fortawesome/free-solid-svg-icons";

export function Crown(props) {
    const status = props.status;
    let statusArea = status.statusArea;
    const percent = percentage();
    // Calculate past percentage of days in the correct statusarea
    function percentage() {
        let days = 0;
        let fixedDays;
        let percentage;

        // If value is more than min, reduce min from value to get correct
        // percentage of current statusarea. 
        // example value is 100 days, min is 80 and max 120 in the current statusarea. 
        // Without reduction value is more than days between min and max so percentage is over 100%.
        if (status.max !== null) {
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
        } else {
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
                backgroundColor: '#0e8404',
                width: `${percent}%`,
                maxWidth: '100%',
                height: '10px',
                borderRadius: 0
            }
        )
    }

    function setIcons() {
        let icons = [];
        if (status.statusArea !== 4) {
            const crown = <FontAwesomeIcon className="Icon" icon={faCrown} style={status.status} />
            for (let index = 0; index < status.statusArea; index++) {
                icons.push(crown);
            }
        } else {
            icons.push(<FontAwesomeIcon className="Icon" icon={faGem} style={status.status} />);
        }
        return icons;
    }

    return (
        <div>
            {setIcons().map((item, index) => (
                <span key={index}>{item}</span>
            ))}
            <div className="Card-content">{`${status.status.name} - ${String.fromCharCode(status.status.statusMark[statusArea])}`}</div>
            <div className="Progress-bar">
                <span style={progressBar(percent)}></span>
            </div>
        </div>
    )
};
