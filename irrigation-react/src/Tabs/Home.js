/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';

import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import RefreshIcon from '@material-ui/icons/Refresh';

import { UserContext } from '../providers/UserProvider';

import WatermingButton from '../components/WateringButton';
import './Home.css';

const Home = () => {
  const user = useContext(UserContext);

  const [status, setStatus] = useState('START');
  const [loading, setLoading] = useState('determinate');
  const [isBreathing, setIsBreathing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const errorHandler = (customError) => {
    setErrorMessage(customError || 'There was a problem loading the data');
  };

  const getStatus = () => {
    const { urlCode } = user;
    setErrorMessage('');
    setLoading('indeterminate');
    setIsSubmitDisabled(true);
    axios
      .get(`${urlCode}/get_state`, {
        timeout: 10 * 1000,
      })
      .then((response) => {
        const { data } = response;
        if (data) {
          setStatus('STOP');
          setIsBreathing(true);
        } else {
          setStatus('START');
          setIsBreathing(false);
        }
      })
      .catch((error) => {
        errorHandler(
          "Connection error: please check the raspberry's internet connection",
        );
        console.error(error);
      })
      .finally(() => {
        setLoading('determinate');
        setIsSubmitDisabled(false);
      });
  };

  return (
    <>
      <div className="main-body">
        <div className="container left">
          <div className="container-header">Hello {user.firstName}</div>
          <div className="container-body">body</div>
        </div>
        <hr orientation="vertical" />
        <div className="container right">
          <div className="container-header">Watering status</div>
          <div className="container-body">
            <WatermingButton
              isBreathing={isBreathing}
              textButton={
                isSubmitDisabled ? (
                  <CircularProgress className="loader" size="10" />
                ) : (
                  <RefreshIcon
                    fontSize="large"
                    // color={status === 'START' ? 'secondary' : 'primary'}
                    style={{ color: '#cecbcb' }}
                  />
                )
              }
              isSubmitDisabled={isSubmitDisabled}
              onClick={getStatus}
            />
            {/* <div className="loader-wrapper" hidden={loading === 'determinate'}>
              <CircularProgress className="loader" />
            </div> */}
            <div className="error-wrapper" hidden={errorMessage === ''}>
              <p className="error-message">{errorMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
{
  /* <div
  className="refresh-wrapper"
  hidden={loading === 'indeterminate'}
>
  <IconButton
    color="primary"
    size="medium"
    aria-label="refresh"
    onClick={getStatus}
  >
    <RefreshIcon fontSize="large" className="refresh-button" />
  </IconButton>
</div> */
}
