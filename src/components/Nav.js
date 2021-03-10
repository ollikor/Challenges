import { Link } from "react-router-dom";

export function Nav(props) {

    function closeNav() {
        document.getElementById("Sidenav").style.width = "0px";
        document.body.style.overflow = "scroll";
    }

    return (
        <div onClick={() => closeNav()} id="Sidenav">
            <div onClick={(e) => e.stopPropagation()} id="Sidenav-content">
                <Link className="Navlink" to="/">Home</Link>
                <Link className="Navlink" to="/user">Challenges</Link>
                <Link className="Navlink" to={`/settings/${props.user}`}>Forgot password</Link>
                <button type="button" onClick={() => props.signOutModal(true)} className="SignOut">Sign out</button>
            </div>
        </div>
    );
}