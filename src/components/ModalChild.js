import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

export function ModalChild(props) {
    return (
        <div className="Modal-container">
            <div className="Modal-content">
                <div className="Modal-title">{props.title}</div>
                <button className="Log-button" onClick={() => props.handleUpdate()}>
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