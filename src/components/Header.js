import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faBars } from "@fortawesome/free-solid-svg-icons";

import { Nav } from "./Nav";


export function Header(props) {
    const { isAuthenticated, quote, signOutModal, user } = props;
    let history = useHistory();

    function openNav() {
        document.getElementById("Sidenav").style.width = "100%";
        document.body.style.overflow = "hidden";
    }

    return (
        <header className="App-header">
            {isAuthenticated ?
                <div>
                   <Nav signOutModal={signOutModal} user={user} />
                    <button
                        className="Open-navbar"
                        onClick={() => openNav()}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>
                :
                <button
                    type="button"
                    onClick={() => history.push('/signin')}
                    className="SignIn">
                    <FontAwesomeIcon icon={faSignInAlt} />
                </button>
            }
            <h1 className="Header-title">Challenges</h1>
            {props.quote !== null ?
                <div>
                    <p className="Quote-title">{quote.quote}</p>
                    <p className="Quote-name">{quote.name}</p>
                </div>
                : null}
        </header>
    );
}