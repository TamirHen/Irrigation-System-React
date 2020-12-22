import React, { useState } from 'react';

import { Button } from '@material-ui/core';

import firebase from '../utils/Firebase';

import Popup from '../model/Popup';
import Week from "../components/Week";
import Cycle from '../components/Cycle';

import './MainPage.css';

const MainPage = () => {
    
    var weekData = {
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false
    };

    var rounds = {
        round1: {
            isActive: false,
            startTime: null,
            endTime: null
        },
        round2: {
            isActive: false,
            startTime: null,
            endTime: null
        },
        round3: {
            isActive: false,
            startTime: null,
            endTime: null
        }
    };

    const dataCallback = (childData) => {
        weekData = {
            sunday: childData.sunday,
            monday: childData.monday,
            tuesday: childData.tuesday,
            wednesday: childData.wednesday,
            thursday: childData.thursday,
            friday: childData.friday,
            saturday: childData.saturday
        };

        rounds = {
            round1: {
                isActive: childData.isFirstRoundActive,
                startTime: childData.firstRoundStart,
                endTime: childData.firstRoundEnd
            },
            round2: {
                isActive: childData.isSecondRoundActive,
                startTime: childData.secondRoundStart,
                endTime: childData.secondRoundEnd
            },
            round3: {
                isActive: childData.isThirdRoundActive,
                startTime: childData.thirdRoundStart,
                endTime: childData.thirdRoundEnd
            }
        };

        console.log(weekData);
        console.log(rounds);
    }


    return (
      <React.Fragment>
        <Popup callback={dataCallback}/>
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