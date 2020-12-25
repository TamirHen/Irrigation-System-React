import React from "react";
import ReactModalLogin from "react-modal-login";
import { auth, firestore } from '../utils/Firebase';
import axios from 'axios';

import './Popup.css';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showModal: true,
      loading: false,
      error: null
    };
  }

 
  openModal() {
    this.setState({
      showModal: true
    });
  }
 
  closeModal() {
    this.setState({
      showModal: false,
      error: null
    });
    // this.finishLoading();
  }

  onLogin() {
    this.startLoading();
    const db = firestore;
    const email = document.querySelector('#email-login').value;
    const password = document.querySelector('#password-login').value;

    this.setState({
      error: null
    });

    auth.signInWithEmailAndPassword(email, password).then(cred => {
      db.collection("users").doc(email).get().then(user => {
        if (user.exists) {
            axios.get(`${user.data()["dataplicity"]}/get_week`).then(response => {
              console.log("login successfully")
              this.closeModal();
              this.props.setData(email , response.data);
            }).catch(error => {
              console.log(error);
              this.errorHandler();
            })
        } else {
            console.log("No such document");
            this.errorHandler();
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        this.errorHandler();
    });
    }, err => {
      this.errorHandler();
    });
  }

  onRegister() {
    this.startLoading();
    const db = firestore;
    const email = document.querySelector('#email-signup').value;
    const password = document.querySelector('#password-signup').value;
    const urlCode = document.querySelector('#urlCode-signup').value;

    this.setState({
      error: null
    });

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      db.collection("users").doc(email).set({
        dataplicity: urlCode
      });

      // Needs to override error message when user signup successfully but could't connect to the pi.
      axios.get(`${urlCode}/get_week`).then(response => {
        console.log("signed up and connected to pi successfully")
        this.closeModal();
        this.props.setData(email, response.data);
      }).catch(error => {
        console.log(error);
        console.log("Sing up successfully, there was a problem with the connection to the pi");
        this.errorHandler();
      });  

    }, err => {
      this.errorHandler();
    });

  }

  
  startLoading() {
    this.setState({
      loading: true
    });
  }
 
  finishLoading() {
    this.setState({
      loading: false
    });
  }
 
  afterTabsChange() {
    this.setState({
      error: null
    });
  }

  errorHandler() {
    this.setState({
      error: true
    });
    this.finishLoading();
  }
 
  render() {
    return (
      <div>
        <React.Fragment>
          <ReactModalLogin
            visible={this.state.showModal}
          //   onCloseModal={this.closeModal.bind(this)}
            loading={this.state.loading}
            error={this.state.error}
            tabs={{
              afterChange: this.afterTabsChange.bind(this)
            }}
            loginError={{
              // containerClass: "error-message",
              label: "Couldn't sign in, please try again",
            }}
            registerError={{
              // containerClass: "error-message",
              label: "Couldn't sign up, please try again",
            }}
            startLoading={this.startLoading.bind(this)}
            finishLoading={this.finishLoading.bind(this)}
            closeBtn={{
              containerClass: "close-button"
            }}
            form={{
              loginInputs: [
                  {
                      // containerClass: "popup-input-wrapper",
                      id: "email-login",
                      type: "email",
                      // inputClass: "popup-input",
                      name: "Email",
                      label: "Email"
                  },
                  {
                      // containerClass: "popup-input-wrapper",
                      id: "password-login",
                      type: "password",
                      // inputClass: "popup-input",
                      name: "Password",
                      label: "Password"
                  }
              ],
              registerInputs: [
                  {
                      // containerClass: "popup-input-wrapper",
                      id: "email-signup",
                      type: "email",
                      // inputClass: "popup-input",
                      name: "Email",
                      label: "Email"
                  },
                  {
                      // containerClass: "popup-input-wrapper",
                      id: "password-signup",
                      type: "password",
                      // inputClass: "popup-input",
                      name: "Password",
                      label: "Password"
                  },
                  {
                      // containerClass: "popup-input-wrapper",
                      id: "urlCode-signup",
                      type: "text",
                      // inputClass: "popup-input",
                      name: "URL Code",
                      label: "URL Code",
                  }
              ],

              loginBtn: {
                  label: "Sign in",
              },
              registerBtn: {
                  label: "Sign up"
              },
              onLogin: this.onLogin.bind(this),
              onRegister: this.onRegister.bind(this)
            }}
          />
        </React.Fragment>
      </div>
    );
  }
}

export default Popup;