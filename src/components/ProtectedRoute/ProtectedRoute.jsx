import React from 'react';
import { Navigate } from 'react-router-dom';
import CurrentUserContext from '../../context/CurrentUserContext';

/**
 * Protected Route component.
 *
 * @component
 * @param {React.ReactNode} children
 * @return {React.ReactNode}
 */
const ProtectedRoute = ({ children }) => {
  const currentUser = React.useContext(CurrentUserContext);

  return currentUser.isLoggedIn ? children : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
