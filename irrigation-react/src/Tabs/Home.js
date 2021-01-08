import React, { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';

import './Home.css';

const Home = () => {
  const user = useContext(UserContext);

  return <div className="container">hello {user.firstName}</div>;
};

export default Home;
