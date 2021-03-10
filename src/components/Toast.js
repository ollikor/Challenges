import { useEffect } from "react";

export function Toast(props) {

    useEffect(() => {
        style();
    }, []);

    function style() {
        const x = document.getElementById('Toast');
        x.className = 'show';
        setTimeout(() => {
            props.showToast(false);
            props.setToastText("");
            x.className = x.className.replace('show', "");
        }, 3000);
    }
    return (

        <div id="Toast">
            {props.toastText}
        </div>
    );
}