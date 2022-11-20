import React from "react";

function Value(props) {
    return (
        <button type="button" className={props.class} value={props.value} onClick={() => props.click(props.value)}>
            {props.display}
        </button>
    );
}

export default Value;
