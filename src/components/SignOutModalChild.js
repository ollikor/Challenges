export function SignOutModalChild(props) {
    return (
        <div onClick={() => props.modal()} className="Modal-container">
            <div onClick={(e) => e.stopPropagation()} className="Modal-content">
                <div className="Modal-title">{props.title}</div>
                <button className="Save-button" onClick={() => props.signOut()}>
                    Sign out
                </button>
            </div>
        </div>
    );
}