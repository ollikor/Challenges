import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export function Nav(props) {

    useEffect(() => (document.body.style.overflow = "scroll"),[])

    function closeNav() {
        document.getElementById("Sidenav-content").style.width = "0px";
        document.body.style.overflow = "scroll";
    }

    return (
        <div id="Sidenav-content">
            <button className="Close-navbar" onClick={() => closeNav()}>
                <FontAwesomeIcon icon={faTimes} ></FontAwesomeIcon>
            </button>
            <Link className="Navlink" to="/">Home</Link>
            <Link className="Navlink" to="/user">Challenges</Link>
            <Link className="Navlink" to={`/settings/${props.user}`}>Forgot password</Link>
            <button type="button" onClick={() => props.signOutModal(true)} className="SignOut">Sign out</button>
        </div>
    );
}