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

  if (currentUser.isLoading || currentUser.isAuthRequired) {
    return null;
  }

  return currentUser.isLoggedIn ? children : (
    <Navigate to="/" state={{ openSignIn: true }} />
  );
};

export default ProtectedRoute;
