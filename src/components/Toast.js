import { useEffect } from "react";

export function Toast(props) {

    useEffect(() => {
        style();
    }, []);

    function style() {
        const x = document.getElementById('Toast');
        x.className = 'show';
        setTimeout(() => {
            x.className = x.className.replace('show', "");
            props.hideToast();
        }, 3000);
    }
    return (

        <div id="Toast">
            {props.toastText}
        </div>
    );
}