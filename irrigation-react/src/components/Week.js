import React from 'react';

import Day from "./Day";

const Week = (props) => {
    
    return (
        <div className="week-wrapper">
            {
                Object.keys(props.week).map((keyName, keyIndex) => {
                    return <Day 
                        day={keyName}
                        state={props.week[keyName]}
                    />
                })
            }
        </div>
    )

}

export default Week;