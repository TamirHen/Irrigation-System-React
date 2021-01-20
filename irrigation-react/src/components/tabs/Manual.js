/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTimer } from 'react-compound-timer';
import formatTimeUnit from '../../utils/FormatTimeUnit';

import { UserContext } from '../../providers/UserProvider';
import WatermingButton from '../WateringButton';
import { validateMintues } from '../../utils/Validate';

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

  const { urlCode, sessionExpired, status, setStatus } = props;

  const startTimer = () => {
    setTime(minutes * 60 * 1000);
    start();
    setIsBreathing(true);
  };

  const stopTimer = () => {
    stop();
  };

  const stopIrrigating = () => {
    axios
      .post(`${urlCode}/stop_irrigate`, {
        timeout: 10 * 1000,
      })
      .then(() => {
        setTextButton('START');
        console.log('irrigation stopped');
        stopTimer();
        setStatus('OFF');
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
  };

  const clickButton = (event) => {
    event.preventDefault();
    setErrorMessage('valid'); // initial message.
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
            setStatus('ON');
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
      stopIrrigating();
    } else {
      console.log('User has logged out - session expired!');
      sessionExpired();
    }
  };

  useEffect(() => {
    // only if status changes to 'OFF' watering animations needs to stop
    if (status === 'OFF') {
      setTextButton('START');
      stopTimer();
    }
  }, [status]);

  return (
    <form className="manual-irrigation-form">
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

      <WatermingButton
        isBreathing={isBreathing}
        textButton={textButton}
        isSubmitDisabled={isSubmitDisabled}
        onClick={clickButton}
        height="200px"
        width="200px"
      />
      <div className="timer-wrapper" hidden={textButton === 'START'}>
        {formatTimeUnit(value.h)}:{formatTimeUnit(value.m)}:
        {formatTimeUnit(value.s)}
      </div>
      <div className="error-message-wrapper" hidden={errorMessage === 'valid'}>
        <p className="error-message">{errorMessage}</p>
      </div>
      <div className="manual-loader-wrapper" hidden={loading === 'determinate'}>
        <CircularProgress className="manual-loader" variant={loading} />
      </div>
    </form>
  );
};

export default Manual;
