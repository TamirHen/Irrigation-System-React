import React from 'react';

import Day from "./Day";
import './Week.css';

const Week = (props) => {
    
    return (
        <ul className="week-list">
            {
                Object.keys(props.week).map((keyName, keyIndex) => {
                    return <Day 
                        key={keyName+props.week[keyName]}
                        day={keyName}
                        state={props.week[keyName]}
                    />
                })
            }
        </ul>
    )

}

export default Week;