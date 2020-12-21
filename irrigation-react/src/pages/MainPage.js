import React from 'react';

import { Button } from '@material-ui/core';

import Popup from '../model/Popup';
import Week from "../components/Week";
import Cycle from '../components/Cycle';

import './MainPage.css';

const MainPage = () => {

    const DUMMY_OBJECT = {
        sunday: true,
        monday: false,
        tuesday: true,
        wednesday: false,
        thursday: true,
        friday: false,
        saturday: true,
        firstRoundStart: null,
        firstRoundEnd: null,
        secondRoundStart: null,
        secondRoundEnd: null,
        thirdRoundStart: null,
        thirdRoundEnd: null,
        isFirstRoundActive: true,
        isSecondRoundActive: false,
        isThirdRoundActive: true
    }

    const weekData = {
        sunday: DUMMY_OBJECT.sunday,
        monday: DUMMY_OBJECT.monday,
        tuesday: DUMMY_OBJECT.tuesday,
        wednesday: DUMMY_OBJECT.wednesday,
        thursday: DUMMY_OBJECT.thursday,
        friday: DUMMY_OBJECT.friday,
        saturday: DUMMY_OBJECT.saturday
    }

    const rounds = {
        round1: {
            isActive: DUMMY_OBJECT.isFirstRoundActive,
            startTime: DUMMY_OBJECT.firstRoundStart,
            endTime: DUMMY_OBJECT.firstRoundEnd
        },
        round2: {
            isActive: DUMMY_OBJECT.isSecondRoundActive,
            startTime: DUMMY_OBJECT.secondRoundStart,
            endTime: DUMMY_OBJECT.secondRoundEnd
        },
        round3: {
            isActive: DUMMY_OBJECT.isThirdRoundActive,
            startTime: DUMMY_OBJECT.thirdRoundStart,
            endTime: DUMMY_OBJECT.thirdRoundEnd
        }
    }

    return (
      <React.Fragment>
        {/* <Popup /> */}
        <div className="main-container">
            <div className="title-wrapper">
                <h1>Home Irrigation System</h1>
            </div>
            <form className="main-form">
                <div className="form-body">
                    <div className="form-object-wrapper">
                        {
                            Object.keys(rounds).map((keyName, keyIndex) => {
                                return (
                                    <Cycle
                                        isActive={rounds[keyName].isActive}
                                        cycleNumber={keyIndex + 1}
                                        startTime={rounds[keyName].startTime}
                                        endTime={rounds[keyName].endTime}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className="form-object-wrapper">
                        <Week week={weekData}/>
                    </div>
                </div>
                <div className="Submit-button-wrapper">
                    <Button variant="contained" color="primary">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
      </React.Fragment>
    )
}

export default MainPage;