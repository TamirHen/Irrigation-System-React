/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { UserContext } from '../providers/UserProvider';

// import WatermingButton from '../components/WateringButton';
import './Home.css';

const useStyles = makeStyles((theme) => ({
  listItem: {
    backgroundColor: 'rgba(232, 241, 247, 0.795)',
    cursor: 'unset',
    borderRadius: '5px',
  },
  stopButton: {
    backgroundColor: 'rgba(255, 172, 151, 0.795)',
    padding: '0px',
    textAlign: 'center',
    marginLeft: '3px',
  },
  buttonAppear: {
    animation: `$appear 1000ms`,
    width: '64px',
  },
  buttonDisappear: {
    animation: `$disappear 1000ms`,
    width: '0px',
  },
  '@keyframes appear': {
    '0%': {
      width: '0px',
    },
    '80%': {
      width: '100px',
    },
    '100%': {
      width: '64px',
    },
  },
  '@keyframes disappear': {
    '0%': {
      width: '64px',
    },
    '100%': {
      width: '0px',
    },
  },
}));

const Home = (props) => {
  const user = useContext(UserContext);
  const classes = useStyles();
  const { status, errorMessage, loader, getStatus, turnOffWatering } = props;

  const getHelloMessage = () => {
    const today = new Date();
    const curHr = today.getHours();
    if (curHr < 12) {
      return 'Good morning';
    }
    if (curHr < 18) {
      return 'Good afternoon';
    }
    return 'Good evening';
  };

  return (
    <>
      <div className="main-body">
        <div className="container">
          <div className="container-header">{`${getHelloMessage()} ${
            user.firstName
          }`}</div>
          <div className="container-body">
            <div className="left-side">
              <List component="nav" aria-label="main mailbox folders">
                <div className="status-list-wrapper">
                  <ListItem className="list-item" button>
                    <ListItemText primary={`Status: ${status}`} />
                    <p className="status-error-message">{errorMessage}</p>
                    <IconButton size="small" onClick={getStatus}>
                      {loader ? (
                        <CircularProgress size={25} />
                      ) : (
                        <RefreshIcon
                          style={{ color: 'rgb(191 191 191 / 91%)' }}
                        />
                      )}
                    </IconButton>
                  </ListItem>
                  <ListItem
                    className={clsx(
                      classes.listItem,
                      classes.stopButton,
                      {
                        [classes.buttonDisappear]: status === 'OFF',
                      },
                      {
                        [classes.buttonAppear]: status === 'ON',
                      },
                    )}
                  >
                    <Button onClick={turnOffWatering}>
                      <ListItemText primary="STOP" />
                    </Button>
                  </ListItem>
                </div>
                <Divider className="divider" />
                <ListItem className="list-item" button>
                  <ListItemText primary="Next Irrigation:" />
                </ListItem>
              </List>
              {/* <div className="status-text-wrapper">
              <p className="status-text">{`Status: ${status}`}</p>
              <IconButton size="small">
                <RefreshIcon />
              </IconButton>
            </div> */}

              {/* <WatermingButton
              isBreathing={isBreathing}
              textButton={
                isSubmitDisabled ? (
                  <CircularProgress className="status-loader" size="10" />
                ) : (
                  <RefreshIcon fontSize="large" style={{ color: '#cecbcb' }} />
                )
              }
              isSubmitDisabled={isSubmitDisabled}
              onClick={getStatus}
            /> */}
              {/* <p className="status-error-message">{errorMessage}</p> */}
            </div>
          </div>
        </div>
        {/* <hr orientation="vertical" />
        <div className="container right">
          <div className="container-header">Watering status</div>
          <div className="container-body">
            <div className="current-status-wrapper">
              <p className="current-status">Currently:{` ${status}`}</p>
            </div>
            <p className="status-error-message">{errorMessage}</p>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Home;
