import React from 'react';

import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

import './Cycle.css';

const Cycle = (props) => {
  const { cycleNumber, isActive, updateRound, startTime, endTime } = props;

  return (
    <div className="cycle-container">
      <div className="cycle-header">
        <h2 className="round-text">Round {cycleNumber}</h2>
        <Switch
          className="cycle-switch"
          color="primary"
          checked={isActive}
          onChange={() => {
            updateRound(`round${cycleNumber}`, 'isActive', !isActive);
          }}
        />
      </div>
      <div className="time-pickers-wrapper">
        {/* <p className="date-picker-label">Start Time</p> */}
        <TextField
          id={`time-picker-start-cycle-${cycleNumber || ''}`}
          className="time-picker"
          label="Start Time"
          type="time"
          value={startTime || ''}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => {
            updateRound(
              `round${cycleNumber}`,
              'startTime',
              event.target.value === '' ? null : `${event.target.value}`,
            );
          }}
        />
        {/* <p className="date-picker-label">End Time</p> */}
        <TextField
          id={`time-picker-end-cycle-${cycleNumber || ''}`}
          className="time-picker"
          label="End Time"
          type="time"
          value={endTime || ''}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => {
            updateRound(
              `round${cycleNumber}`,
              'endTime',
              event.target.value === '' ? null : `${event.target.value}`,
            );
          }}
        />
      </div>
    </div>
  );
};

export default Cycle;
