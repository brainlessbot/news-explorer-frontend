import React from 'react';
import Header from '../Header/Header';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Footer from '../Footer/Footer';

/**
 * Main component.
 *
 * @component
 * @param {Object} lastSearch
 * @param {Object} savedArticles
 * @param {Object} shownResults
 * @param {Function} onSearchSubmit
 * @param {Function} onSignInClick
 * @param {Function} onSignUpClick
 * @param {Function} onSignOutClick
 * @param {Function} onBookmarkClick
 * @param {Function} onRemoveClick
 * @param {Function} onLoadMoreClick
 * @return {React.ReactNode}
 */
const Main = ({
  lastSearch,
  savedArticles,
  shownResults,
  onSearchSubmit,
  onSignInClick,
  onSignUpClick,
  onSignOutClick,
  onBookmarkClick,
  onRemoveClick,
  onLoadMoreClick,
}) => (
  <>
    <Header
      lastSearch={lastSearch}
      onSearchSubmit={onSearchSubmit}
      onSignInClick={onSignInClick}
      onSignOutClick={onSignOutClick}
    />

    <main>
      <NewsCardList
        data={shownResults}
        savedArticles={savedArticles}
        isVisible={lastSearch.query !== undefined}
        isLoading={lastSearch.isLoading}
        isError={lastSearch.isError}
        isSearchResults
        onSignUpClick={onSignUpClick}
        onBookmarkClick={onBookmarkClick}
        onRemoveClick={onRemoveClick}
        onLoadMoreClick={onLoadMoreClick}
      />

      <About />
    </main>

    <Footer />
  </>
);

export default Main;
