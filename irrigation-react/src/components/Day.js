import React from 'react';
import { useState } from "react";

import Switch from '@material-ui/core/Switch'

import './Day.css'

const Day = (props) => {

    const changeState = () => {
        props.updateDay(props.day, !props.state);
    }

    return (
        <li 
            onClick={e => {
                changeState();
            }}
            className="li-day"
            id={`week-day-${props.day}`}>

            <h2 className="day-text">{props.day.charAt(0).toUpperCase() + props.day.slice(1) /* Changing first letter to upper case */ }</h2>
            <Switch 
                className="day-switch"
                color="primary"
                checked={props.state || false}
            />
        </li>
    )
}

export default Day;