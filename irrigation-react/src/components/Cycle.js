/* eslint-disable no-unused-expressions */
import React from 'react';

import Switch from '@material-ui/core/Switch';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

import './Cycle.css';

const Cycle = (props) => {
  const { cycleNumber, isActive, updateRound, startTime, endTime } = props;

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
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
          <KeyboardTimePicker
            id={`time-picker-start-cycle-${cycleNumber || ''}`}
            className="time-picker"
            label="Start Time"
            ampm={false}
            value={moment(startTime || '00:00:00', 'HH:mm') || ''}
            invalidDateMessage
            onChange={(time) => {
              updateRound(
                `round${cycleNumber}`,
                'startTime',
                time?.format('HH:mm') || null,
              );
            }}
          />
          <KeyboardTimePicker
            id={`time-picker-end-cycle-${cycleNumber || ''}`}
            className="time-picker"
            label="End Time"
            ampm={false}
            value={moment(endTime || '00:00:00', 'HH:mm') || ''}
            invalidDateMessage
            onChange={(time) => {
              updateRound(
                `round${cycleNumber}`,
                'endTime',
                time?.format('HH:mm') || null,
              );
            }}
          />
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default Cycle;
