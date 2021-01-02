/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-console */
import React, { useState, useContext } from 'react';

import FullWidthTabs from '../components/TabFrame';
import Popup from '../model/Popup';
import { auth, firestore } from '../utils/Firebase';
import { UserContext } from '../providers/UserProvider';
import { ReactComponent as BalloonSVG } from '../images/hot-air-balloon.svg';

import './MainPage.css';

const MainPage = () => {
  const user = useContext(UserContext);
  const [urlCode, setUrlCode] = useState('');
  const [hoverAnimation, setHoverAnimation] = useState('');
  // const [userEmail, setUserEmail] = useState('');
  // const [user, setUser] = useState({});
  // const [showPopup, setShowPopup] = useState(true);

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

  const setData = (code, userData) => {
    // setShowPopup(false);
    setUrlCode(code);
    // setUserEmail(authUser.user.email);
    // setUser(authUser);

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

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        console.log('Sign-out successfully');
        // setUserEmail('');
        setUrlCode('');
        setWeek({
          sunday: false,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
        });
        setRounds({
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
        // setShowPopup(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Popup
        auth={auth}
        firestore={firestore}
        setData={setData}
        key={`popup-${user}`}
        user={user}
      />
      <div className="main-container">
        <div className="title-wrapper">
          <h1>Home Irrigation System</h1>
        </div>
        <FullWidthTabs
          rounds={rounds}
          updateRound={updateRound}
          week={week}
          updateDay={updateDay}
          urlCode={urlCode}
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
