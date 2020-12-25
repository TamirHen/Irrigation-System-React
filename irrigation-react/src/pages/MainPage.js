import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popover from '@material-ui/core/Popover';
import axios from 'axios';
import { firestore } from '../utils/Firebase';

import Popup from '../model/Popup';
import Day from "../components/Day";
import Cycle from '../components/Cycle';

import './MainPage.css';

const MainPage = () => {

    let userEmail = "";
    const [loading, setLoading] = useState("determinate");
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const [week, setWeek] = useState({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false
    });
    
    const [rounds, setRounds] = useState({
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
    });

    const updateDay = (day, state) => {
        let updatedWeek = {...week};
        updatedWeek[day] = state;
        setWeek(updatedWeek);
    }

    const setData = (email, userData) => {
        userEmail = email;
        
        setWeek({
            sunday: userData.sunday,
            monday: userData.monday,
            tuesday: userData.tuesday,
            wednesday: userData.wednesday,
            thursday: userData.thursday,
            friday: userData.friday,
            saturday: userData.saturday
        });


        setRounds({
            round1: {
                isActive: userData.isFirstRoundActive,
                startTime: userData.firstRoundStart,
                endTime: userData.firstRoundEnd
            },
            round2: {
                isActive: userData.isSecondRoundActive,
                startTime: userData.secondRoundStart,
                endTime: userData.secondRoundEnd
            },
            round3: {
                isActive: userData.isThirdRoundActive,
                startTime: userData.thirdRoundStart,
                endTime: userData.thirdRoundEnd
            }
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setLoading("indeterminate");
        const db = firestore;

        const data = {
            "sunday":true,
            "monday":true,
            "tuesday":true,
            "wednesday":true,
            "thursday":true,
            "friday":true,
            "saturday":true,
            "firstRoundStart":"03:00:00",
            "firstRoundEnd":"03:06:00",
            "secondRoundStart":null,
            "secondRoundEnd":null,
            "thirdRoundStart":null,
            "thirdRoundEnd":null,
            "isFirstRoundActive":true,
            "isSecondRoundActive":false,
            "isThirdRoundActive":false
        }

        db.collection("users").doc(userEmail).get().then(user => {
            axios.post(`${user.data()["dataplicity"]}/update_week`).then(response => {
                console.log("data returned successfully")
            }).catch(error => {
                console.log(error);
            })
        }).catch(error => {
            console.log(error);
        })
    }

    return (
      <React.Fragment>
        <Popup setData={setData} key="popup"/>
        <div className="main-container">
            <div className="title-wrapper">
                <h1>Home Irrigation System</h1>
            </div>
            <form className="main-form" onSubmit={onSubmit}>
                <div className="form-body">
                    <div className="form-object-wrapper">
                        {
                            Object.keys(rounds).map((keyName, keyIndex) => {
                                return (
                                    <Cycle
                                        key={keyName+rounds[keyName].isActive}
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
                        <ul className="week-list">
                            {
                            Object.keys(week).map((keyName, keyIndex) => {
                                return <Day 
                                        key={keyName+week[keyName]}
                                        day={keyName}
                                        state={week[keyName]}
                                        updateDay={updateDay}
                                    />
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="Submit-button-wrapper">
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </div>
                <div className="loader-wrapper">
                    <CircularProgress
                                className="loader"
                                variant={loading}
                    />
                </div>

                {/* <Popover
                    id="loader-popover"
                    open={isPopoverOpen}
                    // onClose={}
                    anchorEl={true}
                    anchorOrigin={{
                      vertical: 300,
                      horizontal: 'center',
                    }}
                >
                </Popover> */}
            </form>
        </div>
      </React.Fragment>
    )
}

export default MainPage;