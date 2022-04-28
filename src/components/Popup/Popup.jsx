import React from 'react';
import classNames from 'classnames';
import './Popup.css';

/**
 * Popup component.
 *
 * @component
 * @param {React.ReactNode} children
 * @param {boolean} isVisible
 * @param {Function} closePopup
 * @param {Object} props
 * @return {React.ReactNode}
 */
const Popup = ({
  children,
  isVisible,
  closePopup,
  ...props
}) => {
  const containerRef = React.useRef(null);

  /**
   * Close the popup if the user clicked outside it.
   *
   * @param {MouseEvent} event
   * @return {void}
   */
  const handleClickEvent = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      closePopup();
    }
  };

  /**
   * Close the popup if the user clicked on "Escape" button.
   *
   * @param {KeyboardEvent} event
   * @return {void}
   */
  const handleKeydownEvent = (event) => {
    if (event.key === 'Escape') {
      closePopup();
    }
  };

  React.useEffect(() => {
    if (isVisible) {
      document.addEventListener('click', handleClickEvent);
      document.addEventListener('keydown', handleKeydownEvent);
    }

    return () => {
      document.removeEventListener('click', handleClickEvent);
      document.removeEventListener('keydown', handleKeydownEvent);
    };
  }, [isVisible]);

  return (
    <div
      className={classNames(
        'popup',
        isVisible && 'popup_visible',
      )}
    >
      <div
        className={classNames(
          'popup__container',
          isVisible && 'popup__container_visible',
          props.className,
        )}
        ref={containerRef}
      >
        <button
          type="button"
          onClick={closePopup}
          className="popup__close-button"
          title="Close"
          aria-label="Close"
        />

        <div className="popup__content-container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
