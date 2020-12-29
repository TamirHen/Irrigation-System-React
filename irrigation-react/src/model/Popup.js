/* eslint-disable react/jsx-no-bind */
/* eslint-disable func-names */
/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ReactModalLogin from 'react-modal-login';
import axios from 'axios';
import { auth, firestore } from '../utils/Firebase';

import './Popup.css';

class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: true,
      loading: false,
      error: null,
      loggedIn: null,
      initialTab: 'login',
      customError: null,
    };
  }

  openModal() {
    this.setState({
      showModal: true,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      error: null,
    });
    // this.finishLoading();
  }

  onLogin() {
    this.startLoading();
    const db = firestore;
    const email = document.querySelector('#email-login').value;
    const password = document.querySelector('#password-login').value;

    this.setState({
      error: null,
      customError: null,
    });

    auth.signInWithEmailAndPassword(email, password).then(
      (cred) => {
        db.collection('users')
          .doc(email)
          .get()
          .then((user) => {
            if (user.exists) {
              axios
                .get(`${user.data().dataplicity}/get_week`, {
                  timeout: 10 * 1000,
                })
                .then((response) => {
                  console.log('login successfully');
                  // this.closeModal();
                  this.onLoginSuccess('form');
                  this.props.setData(email, response.data, user);
                })
                .catch((error) => {
                  console.log(error);
                  this.errorHandler(
                    "Connection error: please check raspberry's internet connection",
                  );
                });
            } else {
              console.log('No such document');
              this.errorHandler();
            }
          })
          .catch(function (error) {
            console.log('Error getting document:', error);
            this.errorHandler();
          });
      },
      (err) => {
        this.errorHandler('Incorrect email or password');
      },
    );
  }

  onRegister() {
    this.startLoading();
    const db = firestore;
    const email = document.querySelector('#email-signup').value;
    const password = document.querySelector('#password-signup').value;
    const urlCode = document.querySelector('#urlCode-signup').value;

    this.setState({
      error: null,
      customError: null,
    });

    auth.createUserWithEmailAndPassword(email, password).then(
      (cred) => {
        db.collection('users').doc(email).set({
          dataplicity: urlCode,
        });
        axios
          .get(`${urlCode}/get_week`, { timeout: 10 * 1000 })
          .then((response) => {
            console.log('signed up and connected to pi successfully');
            this.onLoginSuccess('form');
            this.props.setData(email, response.data);
          })
          .catch((error) => {
            console.log(error);
            this.errorHandler(
              'Signed up successfully! There was a problem connecting to the raspberry',
            );
          });
      },
      (error) => {
        this.errorHandler(error.message);
      },
    );
  }

  onLoginSuccess(method) {
    this.closeModal();
    this.setState({
      loggedIn: method,
      loading: false,
    });
  }

  onLoginFail(method, response) {
    this.setState({
      loading: false,
      error: response,
    });
  }

  startLoading() {
    this.setState({
      loading: true,
    });
  }

  finishLoading() {
    this.setState({
      loading: false,
    });
  }

  afterTabsChange() {
    this.setState({
      error: null,
    });
  }

  errorHandler(customError) {
    this.setState({
      error: true,
      customError,
    });
    this.finishLoading();
  }

  render() {
    return (
      <div>
        <>
          <ReactModalLogin
            visible={this.state.showModal}
            onCloseModal={() => {}}
            loading={this.state.loading}
            initialTab={this.state.initialTab}
            error={this.state.error}
            tabs={{
              afterChange: this.afterTabsChange.bind(this),
            }}
            loginError={{
              // containerClass: "error-message",
              label:
                this.state.customError || "Couldn't sign in, please try again",
            }}
            registerError={{
              // containerClass: "error-message",
              label:
                this.state.customError || "Couldn't sign up, please try again",
            }}
            startLoading={this.startLoading.bind(this)}
            finishLoading={this.finishLoading.bind(this)}
            closeBtn={{
              containerClass: 'close-button',
            }}
            form={{
              loginInputs: [
                {
                  // containerClass: "popup-input-wrapper",
                  id: 'email-login',
                  type: 'email',
                  // inputClass: "popup-input",
                  name: 'Email',
                  label: 'Email',
                },
                {
                  // containerClass: "popup-input-wrapper",
                  id: 'password-login',
                  type: 'password',
                  // inputClass: "popup-input",
                  name: 'Password',
                  label: 'Password',
                },
              ],
              registerInputs: [
                {
                  // containerClass: "popup-input-wrapper",
                  id: 'email-signup',
                  type: 'email',
                  // inputClass: "popup-input",
                  name: 'Email',
                  label: 'Email',
                },
                {
                  // containerClass: "popup-input-wrapper",
                  id: 'password-signup',
                  type: 'password',
                  // inputClass: "popup-input",
                  name: 'Password',
                  label: 'Password',
                },
                {
                  // containerClass: "popup-input-wrapper",
                  id: 'urlCode-signup',
                  type: 'text',
                  // inputClass: "popup-input",
                  name: 'URL Code',
                  label: 'URL Code',
                },
              ],

              loginBtn: {
                label: 'Sign in',
              },
              registerBtn: {
                label: 'Sign up',
              },
              onLogin: this.onLogin.bind(this),
              onRegister: this.onRegister.bind(this),
            }}
          />
        </>
      </div>
    );
  }
}

export default Popup;
