/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-console */
import React, { useState, useContext, useEffect } from 'react';

import axios from 'axios';
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

  useEffect(() => {
    const { urlCode } = user;
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
      })
      .catch((error) => {
        // this.errorHandler(
        //   "Connection error: please check raspberry's internet connection",
        // );
        // logout();
        console.log(error);
      });
  }, []);

  return (
    <>
      {/* <Popup
        auth={auth}
        firestore={firestore}
        setData={setData}
        key={`popup-${user}`}
        user={user}
      /> */}
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
