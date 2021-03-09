import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export function Header(props) {
    let history = useHistory();
    return (
        <header className="App-header">
            {props.isAuthenticated ?
                <button type="button"
                    onClick={() => props.signOutModal()}
                    className="SignInOut"><FontAwesomeIcon
                        icon={faSignOutAlt} /></button>
                :
                // <Link className="SignInOut" to="/signin"><FontAwesomeIcon icon={faSignInAlt} /></Link>
                <button type="button"
                    onClick={() => history.push('/signin')}
                    className="SignInOut"><FontAwesomeIcon
                        icon={faSignInAlt} /></button>
            }
            <h1 className="Header-title">Challenges</h1>
            {props.quote !== null ?
                <div>
                    <p className="Quote-title">{props.quote.quote}</p>
                    <p className="Quote-name">{props.quote.name}</p>
                </div>
                : null
            }
        </header>
    );
}