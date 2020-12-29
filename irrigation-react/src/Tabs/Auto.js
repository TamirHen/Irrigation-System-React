/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { validateWeek } from '../utils/Validate';

import Day from '../components/Day';
import Cycle from '../components/Cycle';

import './Auto.css';

function Auto(props) {
  const [loading, setLoading] = useState('determinate');
  const [submitMessage, setSubmitMessage] = useState('');
  const [textColor, setTextColor] = useState('red');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const { rounds, week, updateRound, updateDay, userEmail, user } = props;

  const setMessage = (message) => {
    setLoading('determinate');
    if (message === 'Done') {
      setTextColor('green');
    } else {
      setTextColor('red');
    }
    setSubmitMessage(message);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setIsSubmitDisabled(true);
    setMessage('');
    setLoading('indeterminate');

    const data = {
      ...week,
      firstRoundStart: rounds.round1.startTime
        ? `${rounds.round1.startTime.split(':')[0]}:${
            rounds.round1.startTime.split(':')[1]
          }:00`
        : null,
      firstRoundEnd: rounds.round1.endTime
        ? `${rounds.round1.endTime.split(':')[0]}:${
            rounds.round1.endTime.split(':')[1]
          }:00`
        : null,
      secondRoundStart: rounds.round2.startTime
        ? `${rounds.round2.startTime.split(':')[0]}:${
            rounds.round2.startTime.split(':')[1]
          }:00`
        : null,
      secondRoundEnd: rounds.round2.endTime
        ? `${rounds.round2.endTime.split(':')[0]}:${
            rounds.round2.endTime.split(':')[1]
          }:00`
        : null,
      thirdRoundStart: rounds.round3.startTime
        ? `${rounds.round3.startTime.split(':')[0]}:${
            rounds.round3.startTime.split(':')[1]
          }:00`
        : null,
      thirdRoundEnd: rounds.round3.endTime
        ? `${rounds.round3.endTime.split(':')[0]}:${
            rounds.round3.endTime.split(':')[1]
          }:00`
        : null,
      isFirstRoundActive: rounds.round1.isActive,
      isSecondRoundActive: rounds.round2.isActive,
      isThirdRoundActive: rounds.round3.isActive,
    };

    const validationMessage = validateWeek(data);

    if (validationMessage === 'valid') {
      axios
        .post(`${user.data().dataplicity}/update_week`, data, {
          timeout: 10 * 1000,
        })
        .then(() => {
          console.log('data updated successfully');
          setMessage('Done');
          setIsSubmitDisabled(false);
        })
        .catch((error) => {
          console.log(error);
          setMessage('Connection error, please try again later');
          setIsSubmitDisabled(false);
        });
    } else {
      setMessage(validationMessage);
      setIsSubmitDisabled(false);
    }
  };

  return (
    <form className="form-auto-tab" onSubmit={onSubmit}>
      <div className="tab-body">
        <div className="tab-object-wrapper">
          {Object.keys(rounds).map((keyName, keyIndex) => (
            <Cycle
              key={keyName + rounds[keyName].isActive}
              isActive={rounds[keyName].isActive}
              cycleNumber={keyIndex + 1}
              startTime={rounds[keyName].startTime}
              endTime={rounds[keyName].endTime}
              updateRound={updateRound}
            />
          ))}
        </div>
        <div className="tab-object-wrapper">
          <ul className="week-list">
            {Object.keys(week).map((keyName, keyIndex) => (
              <Day
                key={keyName + week[keyName]}
                day={keyName}
                state={week[keyName]}
                updateDay={updateDay}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="Submit-button-wrapper">
        <Button
          className="submit-button"
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </Button>
        {/* <label className="mock-label"></label> */}
      </div>
      <div className="submit-message-wrapper">
        <p className="submit-message" style={{ color: textColor }}>
          {submitMessage}
        </p>
      </div>
      <div className="loader-wrapper">
        <CircularProgress className="loader" variant={loading} />
      </div>
    </form>
  );
}

export default Auto;
