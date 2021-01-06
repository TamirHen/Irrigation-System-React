import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

import { auth } from '../utils/Firebase';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(30),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '20px',
  },
  form: {
    width: '75%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  message: {
    textAlign: 'center',
    marginTop: '5px',
  },
}));

export default function ForgotPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const successMessage = 'Check your email for a link to reset your password.';
  const messageHandler = (msg) => {
    setMessage(msg || successMessage);
  };

  const forgotPassword = (event) => {
    event.preventDefault();
    setMessage('');
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        messageHandler();
      })
      .catch((error) => {
        messageHandler(error.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography className={classes.title} component="h1" variant="h5">
          Reset your password
        </Typography>
        <form className={classes.form} onSubmit={forgotPassword}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send
          </Button>
          <p
            className={classes.message}
            style={
              message === successMessage ? { color: 'green' } : { color: 'red' }
            }
          >
            {message}
          </p>
          <Grid container>
            <Grid item>
              <Link to="/" variant="body2">
                Back to login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
