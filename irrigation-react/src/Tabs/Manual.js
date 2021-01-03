/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTimer } from 'react-compound-timer';
import formatTimeUnit from '../utils/FormatTimeUnit';
import { UserContext } from '../providers/UserProvider';

import { validateMintues } from '../utils/Validate';

import './Manual.css';

const Manual = (props) => {
  const user = useContext(UserContext);
  const [textButton, setTextButton] = useState('START');
  const [errorMessage, setErrorMessage] = useState('valid');
  const [minutes, setMinutes] = useState(5);
  const [loading, setLoading] = useState('determinate');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isFieldDisabled, setIsFieldDisabled] = useState(false);
  const [isBreathing, setIsBreathing] = useState(false);
  const {
    value,
    controls: { setTime, start, stop },
  } = useTimer({
    initialTime: minutes,
    direction: 'backward',
    startImmediately: false,
    lastUnit: 'h',
    timeToUpdate: 1000,
    onStop: () => {
      setLoading('determinate');
      setIsSubmitDisabled(false);
      setIsFieldDisabled(false);
      setIsBreathing(false);
      setErrorMessage('valid');
    },
    checkpoints: [
      {
        time: 1,
        callback: () => {
          stop();
          setTextButton('START');
        },
      },
    ],
  });

  const { urlCode, sessionExpired } = props;

  const startTimer = () => {
    setTime(minutes * 60 * 1000);
    start();
    setIsBreathing(true);
  };

  const stopTimer = () => {
    stop();
  };

  const clickButton = (event) => {
    event.preventDefault();
    setErrorMessage('valid'); // initial the message.
    setLoading('indeterminate');
    setIsSubmitDisabled(true);
    setIsFieldDisabled(true);
    const message = validateMintues(minutes);
    if (textButton === 'START' && message === 'valid') {
      if (user) {
        axios
          .post(`${urlCode}/irrigate_by_minutes/${minutes}`, {
            timeout: 10 * 1000,
          })
          .then(() => {
            setTextButton('STOP');
            console.log('irrigation started');
            startTimer();
          })
          .catch((error) => {
            console.log(error);
            setIsFieldDisabled(false);
            setErrorMessage('Connection error, please try again later');
          })
          .finally(() => {
            setLoading('determinate');
            setIsSubmitDisabled(false);
          });
      } else {
        console.log('User has logged out - session expired!');
        sessionExpired();
      }
    } else if (message !== 'valid') {
      setLoading('determinate');
      setIsSubmitDisabled(false);
      setIsFieldDisabled(false);
      setErrorMessage(message);
    } else if (user) {
      axios
        .post(`${urlCode}/stop_irrigate`, {
          timeout: 10 * 1000,
        })
        .then(() => {
          setTextButton('START');
          console.log('irrigation stopped');
          stopTimer();
        })
        .catch((error) => {
          console.log(error);
          console.log("IRRIGATION DIDN'T STOPPTED!!!");
          setErrorMessage(
            "IRRIGATION DIDN'T STOPPTED!\nPlease check the internet connection your raspberry is using",
          );
          setLoading('determinate');
          setIsSubmitDisabled(false);
        });
    } else {
      console.log('User has logged out - session expired!');
      sessionExpired();
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
      <div className="breathing-button-wrapper">
        <Button
          id="breathing-button"
          className={`manual-button ${isBreathing ? 'breathing' : ''}`}
          variant="contained"
          color={textButton === 'START' ? 'primary' : 'secondary'}
          type="submit"
          disabled={isSubmitDisabled}
        >
          {textButton}
        </Button>
      </div>
      <div className="timer-wrapper" hidden={textButton === 'START'}>
        {formatTimeUnit(value.h)}:{formatTimeUnit(value.m)}:
        {formatTimeUnit(value.s)}
      </div>
      <div className="error-message-wrapper" hidden={errorMessage === 'valid'}>
        <p className="error-message">{errorMessage}</p>
      </div>
      <div className="loader-wrapper" hidden={loading === 'determinate'}>
        <CircularProgress className="loader" variant={loading} />
      </div>
    </form>
  );
};

export default Manual;
