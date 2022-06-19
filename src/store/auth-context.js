import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  loggedInUser: null,
  isUserLoggedIn: false,
  login: (token, user) => {},
  updateUser: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : '';
  const initialUser = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;
  const [token, setToken] = useState(initialToken);
  const [loggedInUser, setLoggedInUser] = useState(initialUser);

  const isUserLoggedIn = !!token;

  const loginHandler = (token, user) => {
    setToken(`Bearer ${token}`);
    setLoggedInUser(user);
    localStorage.setItem('token', `Bearer ${token}`);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logoutHanlder = () => {
    setToken('');
    setLoggedInUser(null);
    localStorage.clear();
  };
  const updateUser = (user) => {
    setLoggedInUser(user);
  };

  const contextValue = {
    token: token,
    loggedInUser: loggedInUser,
    isUserLoggedIn: isUserLoggedIn,
    login: loginHandler,
    logout: logoutHanlder,
    updateUser: updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
