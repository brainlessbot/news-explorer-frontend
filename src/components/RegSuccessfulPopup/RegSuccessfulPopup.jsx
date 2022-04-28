import React from 'react';
import Popup from '../Popup/Popup';
import './RegSuccessfulPopup.css';

/**
 * Registration Successful Popup component.
 *
 * @component
 * @param {boolean} isVisible
 * @param {Function} closePopup
 * @param {Function} switchToSignIn
 * @return {React.ReactNode}
 */
const RegSuccessfulPopup = ({ isVisible, closePopup, switchToSignIn }) => (
  <Popup
    isVisible={isVisible}
    closePopup={closePopup}
    className="reg-successful-popup"
  >
    <h2 className="reg-successful-popup__title">
      Registration successfully completed!
    </h2>

    <button
      type="button"
      onClick={switchToSignIn}
      className="reg-successful-popup__switch-button"
    >
      Sign in
    </button>
  </Popup>
);

export default RegSuccessfulPopup;
