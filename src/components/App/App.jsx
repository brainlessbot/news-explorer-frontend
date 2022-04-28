import React from 'react';
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import SignInPopup from '../SignInPopup/SignInPopup';
import SignUpPopup from '../SignUpPopup/SignUpPopup';
import RegSuccessfulPopup from '../RegSuccessfulPopup/RegSuccessfulPopup';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../context/CurrentUserContext';
import { defaultCurrentUser, fakeCurrentUser } from '../../utils/constants';

/**
 * App component.
 *
 * @component
 * @return {React.ReactNode}
 */
const App = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState(defaultCurrentUser);

  const [isSignInPopupVisible, setIsSignInPopupVisible] = React.useState(false);
  const [isSignUpPopupVisible, setIsSignUpPopupVisible] = React.useState(false);
  const [isRegSuccessfulPopupVisible, setIsRegSuccessfulPopupVisible] = React.useState(false);

  /*
   * ----------------------------------------------------------------
   * Popup Functions
   * ----------------------------------------------------------------
   */

  /**
   * Close all popups.
   *
   * @return {void}
   */
  const closeAllPopups = () => React.startTransition(() => {
    setIsSignInPopupVisible(false);
    setIsSignUpPopupVisible(false);
    setIsRegSuccessfulPopupVisible(false);
  });

  /**
   * Open Sign In popup.
   *
   * @return {void}
   */
  const openSignInPopup = () => React.startTransition(() => {
    closeAllPopups();
    setIsSignInPopupVisible(true);
  });

  /**
   * Open Sign Up popup.
   *
   * @return {void}
   */
  const openSignUpPopup = () => React.startTransition(() => {
    closeAllPopups();
    setIsSignUpPopupVisible(true);
  });

  /**
   * Open Registration Successful popup.
   *
   * @return {void}
   */
  const openRegSuccessfulPopup = () => React.startTransition(() => {
    closeAllPopups();
    setIsRegSuccessfulPopupVisible(true);
  });

  /*
   * ----------------------------------------------------------------
   * Auth Functions
   * ----------------------------------------------------------------
   */

  /**
   * Handle user sign in.
   *
   * @param {Object} formValues
   * @param {Function} onSuccess
   * @return {void}
   */
  const handleSignInSubmit = (formValues, onSuccess) => {
    // TEMPORARY FOR STAGE II
    setTimeout(() => {
      setCurrentUser(fakeCurrentUser);
      closeAllPopups();
      onSuccess();
    }, 1500);
  };

  /**
   * Handle user sign up.
   *
   * @param {Object} formValues
   * @param {Function} onSuccess
   * @return {void}
   */
  const handleSignUpSubmit = (formValues, onSuccess) => {
    // TEMPORARY FOR STAGE II
    setTimeout(() => {
      closeAllPopups();
      openRegSuccessfulPopup();
      onSuccess();
    }, 1500);
  };

  /**
   * Handle user logout.
   *
   * @return {void}
   */
  const handleLogoutClick = () => {
    setCurrentUser(defaultCurrentUser);
    navigate('/');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={(
            <Main
              onSignInClick={openSignInPopup}
              onSignOutClick={handleLogoutClick}
            />
          )}
        />

        <Route
          path="/saved-news"
          element={(
            <ProtectedRoute>
              <SavedNews
                onSignOutClick={handleLogoutClick}
              />
            </ProtectedRoute>
          )}
        />

        <Route
          path="*"
          element={(
            <Navigate to="/" />
          )}
        />
      </Routes>

      <SignInPopup
        isVisible={isSignInPopupVisible}
        closePopup={closeAllPopups}
        onFormSubmit={handleSignInSubmit}
        switchToSignUp={openSignUpPopup}
      />

      <SignUpPopup
        isVisible={isSignUpPopupVisible}
        closePopup={closeAllPopups}
        onFormSubmit={handleSignUpSubmit}
        switchToSignIn={openSignInPopup}
      />

      <RegSuccessfulPopup
        isVisible={isRegSuccessfulPopupVisible}
        closePopup={closeAllPopups}
        switchToSignIn={openSignInPopup}
      />
    </CurrentUserContext.Provider>
  );
};

export default App;
