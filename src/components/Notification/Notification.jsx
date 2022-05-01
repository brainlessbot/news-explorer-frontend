import React from 'react';
import classNames from 'classnames';
import notificationImage from '../../images/notification.svg';
import './Notification.css';

/**
 * Notification component.
 *
 * @component
 * @param {string} message
 * @param {boolean} isVisible
 * @return {React.ReactNode}
 */
const Notification = ({ message, isVisible }) => (
  <div
    className={classNames(
      'notification',
      isVisible && 'notification_visible',
    )}
  >
    <img src={notificationImage} alt="Illustration of a notification" className="notification__image" />

    <p className="notification__description">
      {message}
    </p>
  </div>
);

export default Notification;
