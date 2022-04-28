import React from 'react';
import Popup from '../Popup/Popup';
import './PopupWithForm.css';

/**
 * Popup With Form component.
 *
 * @component
 * @param {React.ReactNode} children
 * @param {boolean} isVisible
 * @param {Function} closePopup
 * @return {React.ReactNode}
 */
const PopupWithForm = ({ children, isVisible, closePopup }) => (
  <Popup
    isVisible={isVisible}
    closePopup={closePopup}
    className="popup-with-form"
  >
    {children}
  </Popup>
);

export default PopupWithForm;
