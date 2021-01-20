/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import FullWidthTabs from '../components/TabFrame';
import { auth } from '../utils/Firebase';
import { UserContext } from '../providers/UserProvider';
import { ReactComponent as BalloonSVG } from '../assets/hot-air-balloon.svg';

import nextIrrigation from '../utils/NextIrrigation';
import './MainPage.css';

const MainPage = () => {
  const user = useContext(UserContext);

  const [week, setWeek] = useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });
  const [rounds, setRounds] = useState({
    round1: {
      isActive: false,
      startTime: null,
      endTime: null,
    },
    round2: {
      isActive: false,
      startTime: null,
      endTime: null,
    },
    round3: {
      isActive: false,
      startTime: null,
      endTime: null,
    },
  });
  const [hoverAnimation, setHoverAnimation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState('determinate');
  const [nextCycleTime, setNextCycleTime] = useState('');

  const errorHandler = (customError) => {
    setErrorMessage(customError || 'There was a problem loading the data');
  };

  const updateNextCycleTime = (weekData, roundsData) => {
    setNextCycleTime(nextIrrigation(weekData, roundsData));
  };

  const updateRound = (round, propToUpdate, state) => {
    const updatedRound = rounds[round];

    updatedRound[propToUpdate] = state;
    const updatedRounds = { ...rounds };
    updatedRounds[round] = updatedRound;
    setRounds(updatedRounds);
  };

  const updateDay = (day, state) => {
    const updatedWeek = { ...week };
    updatedWeek[day] = state;
    setWeek(updatedWeek);
  };

  const logout = () => {
    auth.signOut().catch((error) => {
      console.log(error);
    });
  };

  const fetchDataFromPi = () => {
    const { urlCode } = user;
    setErrorMessage('');
    setLoading('indeterminate');
    axios
      .get(`${urlCode}/get_week`, {
        timeout: 10 * 1000,
      })
      .then((response) => {
        const { data } = response;
        const weekData = {
          sunday: data.sunday,
          monday: data.monday,
          tuesday: data.tuesday,
          wednesday: data.wednesday,
          thursday: data.thursday,
          friday: data.friday,
          saturday: data.saturday,
        };
        setWeek(weekData);
        const roundsData = {
          round1: {
            isActive: data.isFirstRoundActive,
            startTime: data.firstRoundStart,
            endTime: data.firstRoundEnd,
          },
          round2: {
            isActive: data.isSecondRoundActive,
            startTime: data.secondRoundStart,
            endTime: data.secondRoundEnd,
          },
          round3: {
            isActive: data.isThirdRoundActive,
            startTime: data.thirdRoundStart,
            endTime: data.thirdRoundEnd,
          },
        };
        setRounds(roundsData);
        updateNextCycleTime(weekData, roundsData);
      })
      .catch((error) => {
        errorHandler(
          "Connection error: please check the raspberry's internet connection",
        );
        console.error(error);
      })
      .finally(() => {
        setLoading('determinate');
      });
  };

  useEffect(() => {
    fetchDataFromPi();
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="title-wrapper">
          <h1>Smart Irrigation System</h1>
        </div>
        <FullWidthTabs
          rounds={rounds}
          updateRound={updateRound}
          week={week}
          updateDay={updateDay}
          urlCode={user.urlCode}
          sessionExpired={logout}
          nextCycleTime={nextCycleTime}
          updateNextCycleTime={updateNextCycleTime}
        />
      </div>
      <div className="error-wrapper" hidden={errorMessage === ''}>
        <p className="error-message">{errorMessage}</p>
        <Button
          className="try-again-button"
          variant="contained"
          color="secondary"
          onClick={() => {
            fetchDataFromPi();
          }}
          size="small"
        >
          Try again
        </Button>
      </div>
      <div className="loader-wrapper" hidden={loading === 'determinate'}>
        <CircularProgress className="loader" />
      </div>
      <BalloonSVG
        className={`signout ${hoverAnimation}`}
        onClick={logout}
        onMouseEnter={() => {
          setHoverAnimation('balloon-animation');
        }}
        onAnimationEnd={() => {
          setHoverAnimation('');
        }}
      />
    </>
  );
};

export default MainPage;
