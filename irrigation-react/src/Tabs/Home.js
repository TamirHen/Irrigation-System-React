import React, { useContext } from 'react';

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
import { ReactComponent as SproutTree } from '../images/sprout-tree.svg';
import { ReactComponent as WateringCan } from '../images/watering-can.svg';

import { UserContext } from '../providers/UserProvider';

import './Home.css';

const useStyles = makeStyles(() => ({
  hidden: {
    display: 'none',
  },
  listItem: {
    backgroundColor: 'rgba(232, 241, 247, 0.795)',
    cursor: 'unset',
    borderRadius: '4px',
    color: '#659adc',
    fontWeight: 'bold',
  },
  stopButton: {
    backgroundColor: 'rgba(255, 172, 151, 0.795)',
    padding: '0px',
    textAlign: 'center',
    width: '0px',
    visibility: 'hidden',
    transition: `all 1s`,
  },
  stopButtonAppear: {
    width: '64px',
    visibility: 'visible',
    marginLeft: '8px',
  },
  listItemStop: {
    width: '30%',
    color: '#cf5858',
    fontWeight: 'bold',
  },
}));

const Home = (props) => {
  const user = useContext(UserContext);
  const classes = useStyles();
  const {
    status,
    errorMessage,
    loader,
    getStatus,
    turnOffWatering,
    nextCycleTime,
  } = props;

  const getHelloMessage = () => {
    const today = new Date();
    const curHr = today.getHours();
    if (curHr < 12) {
      return 'Good morning';
    }
    if (curHr < 18) {
      return 'Good afternoon';
    }
    if (curHr < 21) {
      return 'Good evening';
    }
    return 'Good night';
  };

  return (
    <>
      <div className="main-body">
        <div className="container-header">{`${getHelloMessage()} ${
          user.firstName
        }`}</div>
        <div className="container">
          <div className="container-body">
            <div className="left-side">
              <List component="nav" aria-label="main mailbox folders">
                <div className="status-list-wrapper">
                  <ListItem className={classes.listItem} button>
                    <ListItemText
                      disableTypography
                      primary={`Status: ${status}`}
                    />
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
                      status === 'ON' && classes.stopButtonAppear,
                    )}
                  >
                    <Button onClick={turnOffWatering}>
                      <ListItemText
                        disableTypography
                        className={classes.listItemStop}
                        primary="STOP"
                      />
                    </Button>
                  </ListItem>
                </div>
                <Divider className="divider" />
                <ListItem className={classes.listItem} button>
                  <ListItemText
                    disableTypography
                    primary={`Next Irrigation: ${nextCycleTime || 'Not set'}`}
                  />
                </ListItem>
                <Divider className="divider" />
                <ListItem className={classes.listItem} button>
                  <ListItemText disableTypography primary="test" />
                </ListItem>
                <Divider className="divider" />
                <ListItem className={classes.listItem} button>
                  <ListItemText disableTypography primary="test" />
                </ListItem>
              </List>
            </div>
            <div className="right-side">
              <WateringCan />
              <SproutTree
                className="sprout-tree-svg"
                style={{ height: '60px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
