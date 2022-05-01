import React from 'react';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import './Header.css';

/**
 * Header component.
 *
 * @component
 * @param {Object} lastSearch
 * @param {Function} onSearchSubmit
 * @param {Function} onSignInClick
 * @param {Function} onSignOutClick
 * @return {React.ReactNode}
 */
const Header = ({
  lastSearch,
  onSearchSubmit,
  onSignInClick,
  onSignOutClick,
}) => (
  <header className="header">
    <Navigation
      onSignInClick={onSignInClick}
      onSignOutClick={onSignOutClick}
      isInverted
    />

    <div className="header__container">
      <h1 className="header__title">
        What&apos;s going on in the world?
      </h1>

      <p className="header__subtitle">
        Find the latest news on any topic and save them in your personal account.
      </p>

      <SearchForm
        lastSearch={lastSearch}
        onSearchSubmit={onSearchSubmit}
      />
    </div>
  </header>
);

export default Header;
