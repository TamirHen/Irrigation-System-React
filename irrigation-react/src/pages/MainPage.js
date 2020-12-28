/* eslint-disable no-console */
import React, { useState } from 'react';

import FullWidthTabs from '../components/TabFrame';
import Popup from '../model/Popup';

import './MainPage.css';

const MainPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [user, setUser] = useState({});

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

  const setData = (email, userData, loggenInUser) => {
    setUserEmail(email);
    setUser(loggenInUser);

    setWeek({
      sunday: userData.sunday,
      monday: userData.monday,
      tuesday: userData.tuesday,
      wednesday: userData.wednesday,
      thursday: userData.thursday,
      friday: userData.friday,
      saturday: userData.saturday,
    });

    setRounds({
      round1: {
        isActive: userData.isFirstRoundActive,
        startTime: userData.firstRoundStart,
        endTime: userData.firstRoundEnd,
      },
      round2: {
        isActive: userData.isSecondRoundActive,
        startTime: userData.secondRoundStart,
        endTime: userData.secondRoundEnd,
      },
      round3: {
        isActive: userData.isThirdRoundActive,
        startTime: userData.thirdRoundStart,
        endTime: userData.thirdRoundEnd,
      },
    });
  };

  return (
    <>
      <Popup setData={setData} key="popup" />
      <div className="main-container">
        <div className="title-wrapper">
          <h1>Home Irrigation System</h1>
        </div>
        <FullWidthTabs
          rounds={rounds}
          updateRound={updateRound}
          week={week}
          updateDay={updateDay}
          userEmail={userEmail}
          user={user}
        />
      </div>
    </>
  );
};

export default MainPage;
