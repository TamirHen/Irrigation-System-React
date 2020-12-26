/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import Switch from '@material-ui/core/Switch';

import './Day.css';

const Day = (props) => {
  const { day, state, updateDay } = props;

  const changeState = () => {
    updateDay(day, !state);
  };

  return (
    <li
      onClick={() => {
        changeState();
      }}
      className="li-day"
      id={`week-day-${day}`}
    >
      <h2 className="day-text">
        {
          day.charAt(0).toUpperCase() +
            day.slice(1) /* Changing first letter to upper case */
        }
      </h2>
      <Switch className="day-switch" color="primary" checked={state || false} />
    </li>
  );
};

export default Day;
