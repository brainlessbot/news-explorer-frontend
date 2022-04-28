import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Button from '../Button/Button';
import CurrentUserContext from '../../context/CurrentUserContext';
import './Navigation.css';

/**
 * Navigation component.
 *
 * @component
 * @param {Function} onSignInClick
 * @param {Function} onSignOutClick
 * @param {boolean} isInverted
 * @return {React.ReactNode}
 */
const Navigation = ({
  onSignInClick = () => {},
  onSignOutClick = () => {},
  isInverted = false,
}) => {
  const containerRef = React.useRef(null);

  const currentUser = React.useContext(CurrentUserContext);

  const [isVisible, setIsVisible] = React.useState(false);

  /**
   * Toggle menu visibility.
   *
   * @return {void}
   */
  const toggleMenu = () => setIsVisible(!isVisible);

  /**
   * Close the menu if the user clicked on the sign-in button.
   *
   * @return {void}
   */
  const handleSignInClick = () => {
    onSignInClick();
    setIsVisible(false);
  };

  /**
   * Close the menu if the window is resized.
   *
   * @return {void}
   */
  const handleResizeEvent = () => setIsVisible(false);

  /**
   * Close the menu if the user clicked outside it.
   *
   * @param {MouseEvent} event
   * @return {void}
   */
  const handleClickEvent = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  React.useEffect(() => {
    if (isVisible) {
      window.addEventListener('resize', handleResizeEvent);
      document.addEventListener('click', handleClickEvent);
    }

    return () => {
      window.removeEventListener('resize', handleResizeEvent);
      document.removeEventListener('click', handleClickEvent);
    };
  }, [isVisible]);

  return (
    <nav
      className={classNames(
        'navigation',
        isVisible && 'navigation_darken-screen',
        (isInverted || isVisible) && 'navigation_inverted',
      )}
    >
      <div
        className={classNames(
          'navigation__container',
          isVisible && 'navigation__container_filled',
        )}
        ref={containerRef}
      >
        <Link
          to="/"
          className={classNames(
            'navigation__app-name',
            (isInverted || isVisible) && 'navigation__app-name_inverted',
          )}
        >
          NewsExplorer
        </Link>

        <button
          type="button"
          onClick={toggleMenu}
          className={classNames(
            'navigation__menu-button',
            isInverted && 'navigation__menu-button_inverted',
            isVisible && 'navigation__menu-button_active',
          )}
          title="Toggle menu"
          aria-label="Toggle menu"
        />

        <ul
          className={classNames(
            'navigation__menu',
            isVisible && 'navigation__menu_visible',
          )}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => classNames(
                'navigation__menu-link',
                isActive && 'navigation__menu-link_active',
                (isInverted || isVisible) && 'navigation__menu-link_inverted',
              )}
            >
              Home
            </NavLink>
          </li>

          {currentUser.isLoggedIn && (
            <li>
              <NavLink
                to="/saved-news"
                className={({ isActive }) => classNames(
                  'navigation__menu-link',
                  isActive && 'navigation__menu-link_active',
                  (isInverted || isVisible) && 'navigation__menu-link_inverted',
                )}
              >
                Saved articles
              </NavLink>
            </li>
          )}

          <li className="navigation__user-button-container">
            <Button
              type="button"
              pattern={
                (isInverted || isVisible)
                  ? 'outlined-light'
                  : 'outlined-dark'
              }
              onClick={
                !currentUser.isLoggedIn
                  ? handleSignInClick
                  : onSignOutClick
              }
              className={classNames(
                'navigation__user-button',
                !currentUser.isLoggedIn && 'navigation__user-button_wide',
              )}
            >
              {!currentUser.isLoggedIn ? 'Sign in' : (
                <>
                  <span className="navigation__user-button-text">
                    {currentUser.data.name}
                  </span>

                  <span
                    className={classNames(
                      'navigation__user-button-icon',
                      (isInverted || isVisible) && 'navigation__user-button-icon_inverted',
                    )}
                  />
                </>
              )}
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
