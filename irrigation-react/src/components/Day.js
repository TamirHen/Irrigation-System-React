import React from 'react';
import { useState } from "react";

import Switch from '@material-ui/core/Switch'

import './Day.css'

const Day = (props) => {
    
    const [state, setState] = useState(props.state);

    const changeState = () => {
        setState(!state);
    }

    return (
        <li onClick={changeState}  className="li-day" id={`week-day-${props.day}`}>
            <h2 className="day-text">{props.day.charAt(0).toUpperCase() + props.day.slice(1) /* Changing first letter to upper case */ }</h2>
            <Switch 
                className="day-switch"
                color="primary"
                checked={state}
                // onChange={changeState}
            />
        </li>
    )

}

export default Day;