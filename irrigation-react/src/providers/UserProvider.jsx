/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React, { Component, createContext } from 'react';
import { auth, generateUserDocument } from '../utils/Firebase';

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
  state = {
    user: null,
  };

  // componentDidMount = () => {
  //   auth.onAuthStateChanged((userAuth) => {
  //     this.setState({ user: userAuth });
  //   });
  // };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async (userAuth) => {
      console.log('from onAuthStateChange - user: ', userAuth);
      const user = await generateUserDocument(userAuth);
      this.setState({ user });
    });
  };

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;
