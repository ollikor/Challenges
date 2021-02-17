import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export function Modal(props) {
    const modalRoot = document.getElementById('modal-root');
    const el = document.createElement('div');

    useEffect(() => {
        modalRoot.appendChild(el);
        return () => {
            modalRoot.removeChild(el);
        };
    });

    return ReactDOM.createPortal(props.children, el);
    // return <h1>{props.child}</h1>
}