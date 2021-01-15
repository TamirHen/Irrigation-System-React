/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-console */
import React, { useState, useContext, useEffect } from 'react';

import axios from 'axios';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import FullWidthTabs from '../components/TabFrame';
// import Popup from '../model/Popup';
// import { auth, firestore } from '../utils/Firebase';
import { auth } from '../utils/Firebase';
import { UserContext } from '../providers/UserProvider';
import { ReactComponent as BalloonSVG } from '../images/hot-air-balloon.svg';

import './MainPage.css';

const MainPage = (props) => {
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

  const updateNextCycleTime = () => {
    const nextSevenDays = [];
    for (let i = 0; i < 7; i++) {
      nextSevenDays[i] = moment().add(i, 'days').format('dddd');

      if (week[nextSevenDays[i].toLowerCase()] === true) {
        for (const [, round] of Object.entries(rounds)) {
          console.log(2);
          //   if (
          //     round.isActive &&
          //     moment(round.startTime, 'HH:mm:ss').isBefore(
          //       moment(new Date(), 'HH:mm:ss'),
          //     )
          //   ) {
          //     console.log(1);
          //   }
        }
      }
    }
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
    auth
      .signOut()
      .then(() => {
        console.log('Sign-out successfully');
      })
      .catch((error) => {
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
        console.log('login successfully');
        const { data } = response;
        setWeek({
          sunday: data.sunday,
          monday: data.monday,
          tuesday: data.tuesday,
          wednesday: data.wednesday,
          thursday: data.thursday,
          friday: data.friday,
          saturday: data.saturday,
        });
        setRounds({
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
        });
        updateNextCycleTime();
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
    updateNextCycleTime();
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="title-wrapper">
          <h1>Home Irrigation System</h1>
        </div>
        <FullWidthTabs
          rounds={rounds}
          updateRound={updateRound}
          week={week}
          updateDay={updateDay}
          urlCode={user.urlCode}
          sessionExpired={logout}
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
