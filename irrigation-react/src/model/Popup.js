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
  }

  onLogin(value) {
    const db = firestore;
    const email = document.querySelector('#email-login').value;
    const password = document.querySelector('#password-login').value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
      db.collection("users").doc(email).get().then(user => {
        if (user.exists) {
            axios.get(`${user.data()["dataplicity"]}/get_week`).then(response => {
              console.log("login successfully")
              this.closeModal();
              this.props.callback(response.data);
            }).catch(error => {
              console.log(error);
            })
        } else {
            console.log("No such document");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });  
    }, err => {
      console.log("User not exists");
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
 
  render() {
    return (
      <div> 
        <ReactModalLogin
          visible={this.state.showModal}
        //   onCloseModal={this.closeModal.bind(this)}
          loading={this.state.loading}
          error={this.state.error}
          tabs={{
            afterChange: this.afterTabsChange.bind(this)
          }}
          loginError={{
            label: "Couldn't sign in, please try again."
          }}
          registerError={{
            label: "Couldn't sign up, please try again."
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
                    id: "urlcode-signup",
                    type: "text",
                    // inputClass: "popup-input",
                    name: "URL Code",
                    label: "URL Code"
                }
            ],

            loginBtn: {
                label: "Sign in"
            },
            registerBtn: {
                label: "Sign up"
            },
            onLogin: this.onLogin.bind(this)
          }}
        />
      </div>
    );
  }
}

export default Popup;