import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function ModalChild(props) {

    const [error, setError] = useState(null);

    async function handleUpdate() {
        const error = await props.handleUpdate();
        setError(error);
    }

    return (
        <div className="Modal-container">
            <div onClick={(e) => e.stopPropagation()} className="Modal-content">
                <div className="Modal-title">{props.title}</div>
                {error !== null ? <p className="Modal-error">{error}</p>:null}
                <button className="Log-button" onClick={() => handleUpdate()}>
                    <div>Log</div> 
                    <FontAwesomeIcon icon={faCheck} />
                </button>
                <button className="Delete-button" onClick={() => props.handleDelete()}>
                    <div>Delete challenge</div>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    )
}