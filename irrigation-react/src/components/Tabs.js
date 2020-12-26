import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Day from "./Day";
import Cycle from './Cycle';

import './Tabs.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 700,
    height: 460,
    marginLeft: "auto",
    marginRight: "auto"
  },
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const {rounds, week, updateRound, updateDay} = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="tabs"
          centered
        >
            <Tab label="Manual" {...a11yProps(0)} />
            <Tab label="Auto" {...a11yProps(1)} />
            <Tab label="State" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="tab-body">
                <div className="tab-object-wrapper">
                    {
                        Object.keys(rounds).map((keyName, keyIndex) => {
                            return (
                                <Cycle
                                    key={keyName+rounds[keyName].isActive}
                                    isActive={rounds[keyName].isActive}
                                    cycleNumber={keyIndex + 1}
                                    startTime={rounds[keyName].startTime}
                                    endTime={rounds[keyName].endTime}
                                    updateRound={updateRound}
                                />
                            )
                        })
                    }
                </div>
                <div className="tab-object-wrapper">
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
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
