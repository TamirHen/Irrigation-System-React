/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTimer } from 'react-compound-timer';
import { red } from '@material-ui/core/colors';
import formatTimeUnit from '../utils/FormatTimeUnit';

import { validateMintues } from '../utils/Validate';

import './Manual.css';

function Manual(props) {
  const [textButton, setTextButton] = useState('START');
  const [errorMessage, setErrorMessage] = useState('valid');
  const [minutes, setMinutes] = useState(5);
  const [loading, setLoading] = useState('determinate');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isFieldDisabled, setIsFieldDisabled] = useState(false);
  const {
    value,
    controls: { setTime, start, stop },
  } = useTimer({
    initialTime: minutes,
    direction: 'backward',
    startImmediately: false,
    lastUnit: 'h',
    timeToUpdate: 1000,
  });

  const { user } = props;

  const startTimer = () => {
    setTime(minutes * 60 * 1000);
    start();
  };

  const stopTimer = () => {
    setTime(0);
    stop();
  };

  const clickButton = (event) => {
    event.preventDefault();
    setLoading('indeterminate');
    setIsSubmitDisabled(true);
    setIsFieldDisabled(true);
    if (textButton === 'START') {
      setErrorMessage(validateMintues(minutes));
      if (errorMessage !== 'valid') {
        setLoading('determinate');
        return;
      axios
        .post(`${user.data().dataplicity}/irrigate_by_minutes/${minutes}`)
        .then(() => {
          setTextButton('STOP');
          console.log('irrigation started');
          startTimer();
        })
        .catch((error) => {
          console.log(error);
          setIsFieldDisabled(false);
        })
        .finally(() => {
          setLoading('determinate');
          setIsSubmitDisabled(false);
        });
    } else {
      axios
        .post(`${user.data().dataplicity}/stop_irrigate`)
        .then(() => {
          setTextButton('START');
          console.log('irrigation stopped');
        })
        .catch((error) => {
          console.log(error);
          console.log("IRRIGATION DIDN'T STOPPTED!!!");
        })
        .finally(() => {
          setLoading('determinate');
          setIsSubmitDisabled(false);
          setIsFieldDisabled(false);
          stopTimer();
        });
    }
  };

  return (
    <form className="manual-irrigation-form" onSubmit={clickButton}>
      <div className="minutes-input-wrapper">
        <TextField
          type="number"
          id="minutes-input"
          label="Minutes"
          variant="outlined"
          value={minutes}
          required
          onChange={(event) => {
            setMinutes(event.target.value);
          }}
          disabled={isFieldDisabled}
        />
      </div>
      {/* <Timer
        className="timer"
        // initialTime={minutes * 60 * 1000}
      > */}
      {/* {() => (
          <> */}
      <div className="breathing-button-wrapper">
        <Button
          id="breathing-button"
          className="manual-button"
          variant="contained"
          color={textButton === 'START' ? 'primary' : 'secondary'}
          type="submit"
          disabled={isSubmitDisabled}
          //   onClick={textButton === 'START' ? start : stop}
        >
          {textButton}
        </Button>
      </div>
      <div className="timer-wrapper" hidden={textButton === 'START'}>
        {formatTimeUnit(value.h)}:{formatTimeUnit(value.m)}:
        {formatTimeUnit(value.s)}
        {/* {value.h}:{value.m}:{value.s} */}
      </div>
      <div className="submit-message-wrapper" hidden={errorMessage === 'valid'}>
        <p className="submit-message" style={{ color: red }}>
          {errorMessage}
        </p>
      </div>
      <div className="loader-wrapper">
        <CircularProgress className="loader" variant={loading} />
      </div>
    </form>
  );
}

export default Manual;
