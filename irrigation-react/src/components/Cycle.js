import React from 'react';

import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'

import './Cycle.css';

const Cycle = (props) => {

    return(
        <div className="cycle-container">
            <div className="cycle-header">
                <h2 className="round-text">Round {props.cycleNumber}</h2>
                <Switch
                    className="cycle-switch"
                    color="primary"
                    checked={props.isActive}
                    onChange={() => {
                        props.updateRound(`round${props.cycleNumber}`, "isActive", !props.isActive);
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
                    value={props.startTime || ""}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => {
                        props.updateRound(`round${props.cycleNumber}`, "startTime", event.target.value === "" ? null : `${event.target.value}`);
                    }}
                />
                {/* <p className="date-picker-label">End Time</p> */}
                <TextField
                    id={`time-picker-end-cycle-${props.cycleNumber || ""}`}
                    className="time-picker"
                    label="End Time"
                    type="time"
                    value={props.endTime || ""}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => {
                        props.updateRound(`round${props.cycleNumber}`, "endTime", event.target.value === "" ? null : `${event.target.value}`);
                    }}
                />
            </div>
        </div>
    )
}

export default Cycle;