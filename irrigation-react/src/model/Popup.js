import React from "react";
import ReactModalLogin from "react-modal-login";

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
 
  onLoginSuccess(method, response) {
    console.log("logged successfully with " + method);
  }
 
  onLoginFail(method, response) {
    console.log("logging failed with " + method);
    this.setState({
      error: response
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
                    type: "email",
                    // inputClass: "popup-input",
                    name: "Email",
                    label: "Email"
                },
                {
                    // containerClass: "popup-input-wrapper",
                    type: "password",
                    // inputClass: "popup-input",
                    name: "Password",
                    label: "Password"
                }
            ],
            registerInputs: [
                {
                    // containerClass: "popup-input-wrapper",
                    type: "email",
                    // inputClass: "popup-input",
                    name: "Email",
                    label: "Email"
                },
                {
                    // containerClass: "popup-input-wrapper",
                    type: "password",
                    // inputClass: "popup-input",
                    name: "Password",
                    label: "Password"
                },
                {
                    // containerClass: "popup-input-wrapper",
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
            }
          }}
        />
      </div>
    );
  }
}

export default Popup;