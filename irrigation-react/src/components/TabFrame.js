/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import { Timer, Today, Home as HomeIcon } from '@material-ui/icons';
import axios from 'axios';

import { UserContext } from '../providers/UserProvider';

import Auto from '../Tabs/Auto';
import Manual from '../Tabs/Manual';
import Home from '../Tabs/Home';

import './TabFrame.css';
import '../Tabs/Home.css';

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
      <Box p={3}>
        <Typography component="span">{children}</Typography>
      </Box>
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
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const user = useContext(UserContext);
  const [status, setStatus] = useState('OFF');
  const [statusError, setStatusError] = useState('');
  const [homeLoader, setHomeLoader] = useState(false);

  const homeErrorHandler = (customError) => {
    setStatusError(customError || 'Error!');
  };

  const getStatus = () => {
    const { urlCode } = user;
    setStatusError('');
    setHomeLoader(true);
    axios
      .get(`${urlCode}/get_state`, {
        timeout: 10 * 1000,
      })
      .then((response) => {
        const { data } = response;
        if (data) {
          setStatus('ON');
          // setIsBreathing(true);
        } else {
          setStatus('OFF');
          // setIsBreathing(false);
        }
      })
      .catch((error) => {
        homeErrorHandler();
        console.error(error);
      })
      .finally(() => {
        setHomeLoader(false);
      });
  };

  const turnOffWatering = () => {
    const { urlCode } = user;
    setStatusError('');
    setHomeLoader(true);
    axios
      .post(`${urlCode}/stop_irrigate`, {
        timeout: 10 * 1000,
      })
      .then(() => {
        setStatus('OFF');
        console.log('irrigation stopped');
      })
      .catch((error) => {
        homeErrorHandler();
        console.error(error);
      })
      .finally(() => {
        setHomeLoader(false);
      });
  };

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={`${classes.root} tab-frame`}>
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
          <Tab
            label="Home"
            onClick={getStatus}
            /* icon={<HomeIcon />} */
            {...a11yProps(0)}
          />
          <Tab label="Manual" /* icon={<Timer />} */ {...a11yProps(1)} />
          <Tab label="Auto" /* icon={<Today />} */ {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Home
            status={status}
            errorMessage={statusError}
            loader={homeLoader}
            getStatus={getStatus}
            turnOffWatering={turnOffWatering}
            nextCycleTime={props.nextCycleTime}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Manual status={status} setStatus={setStatus} {...props} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Auto {...props} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
