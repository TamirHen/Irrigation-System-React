import React from 'react';
import { useState } from "react";

import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'

import './Cycle.css';

const Cycle = (props) => {
    const [isActive, setIsActive] = useState(props.isActive || false);

    return(
        <div className="cycle-container">
            <div className="cycle-header">
                <h2 className="round-text">Round {props.cycleNumber}</h2>
                <Switch
                    className="cycle-switch"
                    color="primary"
                    checked={isActive}
                    onChange={() => {
                        setIsActive(!isActive);
                    }}
                />
            </div>
            <div className="time-pickers-wrapper">
                {/* <p className="date-picker-label">Start Time</p> */}
                <TextField
                    id={`time-picker-start-cycle-${props.cycleNumber || ""}`}
                    className="time-picker"
                    label="Start Time"
                    type="time"
                    value={props.startTime || null}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                {/* <p className="date-picker-label">End Time</p> */}
                <TextField
                    id={`time-picker-end-cycle-${props.cycleNumber || ""}`}
                    className="time-picker"
                    label="End Time"
                    type="time"
                    value={props.endTime || null}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
        </div>
    )
}

export default Cycle;