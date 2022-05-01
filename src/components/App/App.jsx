/*eslint-disable*/
import React from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Notification from '../Notification/Notification';
import SignInPopup from '../SignInPopup/SignInPopup';
import SignUpPopup from '../SignUpPopup/SignUpPopup';
import RegSuccessfulPopup from '../RegSuccessfulPopup/RegSuccessfulPopup';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../context/CurrentUserContext';
import MainApi from '../../utils/MainApi';
import NewsApi from '../../utils/NewsApi';
import {
  DEFAULT_CURRENT_USER,
  DEFAULT_LAST_SEARCH,
  DEFAULT_SAVED_ARTICLES,
  NOTIFICATION_DURATION,
} from '../../utils/constants';

/**
 * App component.
 *
 * @component
 * @return {React.ReactNode}
 */
const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState({
    ...DEFAULT_CURRENT_USER,
    isAuthRequired: !!localStorage.getItem('jwt'),
  });

  const [lastSearch, setLastSearch] = React.useState(() => {
    const storedLastSearch = localStorage.getItem('lastSearch');

    if (storedLastSearch) {
      return JSON.parse(storedLastSearch);
    }

    return DEFAULT_LAST_SEARCH;
  });

  const [savedArticles, setSavedArticles] = React.useState(DEFAULT_SAVED_ARTICLES);

  const [shownResults, setShownResults] = React.useState([]);
  const [remainingResults, setRemainingResults] = React.useState([]);

  const [notificationMessage, setNotificationMessage] = React.useState(undefined);
  const [isNotificationVisible, setIsNotificationVisible] = React.useState(false);
  const [notificationTimeout, setNotificationTimeout] = React.useState(undefined);

  const [isSignInPopupVisible, setIsSignInPopupVisible] = React.useState(false);
  const [isSignUpPopupVisible, setIsSignUpPopupVisible] = React.useState(false);
  const [isRegSuccessfulPopupVisible, setIsRegSuccessfulPopupVisible] = React.useState(false);

  /*
   * ----------------------------------------------------------------
   * Popup Functions
   * ----------------------------------------------------------------
   */

  /**
   * Trigger a notification which disappears after a few seconds.
   *
   * @param {string} message
   * @return {void}
   */
  const triggerNotification = (message) => {
    setNotificationMessage(message);
    setIsNotificationVisible(true);

    clearTimeout(notificationTimeout);

    setNotificationTimeout(setTimeout(() => {
      setIsNotificationVisible(false);
    }, NOTIFICATION_DURATION));
  };

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
   * Update the current user by its token.
   *
   * @return {void}
   */
  const updateCurrentUser = () => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      setCurrentUser(DEFAULT_CURRENT_USER);
      return;
    }

    setCurrentUser({
      ...DEFAULT_CURRENT_USER,
      isLoading: true,
    });

    MainApi.getCurrentUser(token)
      .then((response) => setCurrentUser({
        ...DEFAULT_CURRENT_USER,
        data: response,
        isLoggedIn: true,
      }))
      .catch(() => setCurrentUser(DEFAULT_CURRENT_USER));
  };

  /**
   * Handle user sign in.
   *
   * @param {Object} formValues
   * @param {Function} onErrorResponse
   * @param {Function} onAnyResponse
   * @return {void}
   */
  const handleSignInSubmit = (formValues, onErrorResponse, onAnyResponse) => {
    MainApi.signIn(formValues)
      .then((response) => {
        localStorage.setItem('jwt', response.token);

        setCurrentUser({
          ...DEFAULT_CURRENT_USER,
          isAuthRequired: true,
        });

        closeAllPopups();
      })
      .catch(onErrorResponse)
      .finally(onAnyResponse);
  };

  /**
   * Handle user sign up.
   *
   * @param {Object} formValues
   * @param {Function} onErrorResponse
   * @param {Function} onAnyResponse
   * @return {void}
   */
  const handleSignUpSubmit = (formValues, onErrorResponse, onAnyResponse) => {
    MainApi.signUp(formValues)
      .then(openRegSuccessfulPopup)
      .catch(onErrorResponse)
      .finally(onAnyResponse);
  };

  /**
   * Handle user logout.
   *
   * @return {void}
   */
  const handleLogoutClick = () => {
    localStorage.removeItem('jwt');
    setCurrentUser(DEFAULT_CURRENT_USER);
    navigate('/');
  };

  /*
   * ----------------------------------------------------------------
   * Search Functions
   * ----------------------------------------------------------------
   */

  /**
   * Handle search form submit.
   *
   * @param {string} searchQuery
   * @return {void}
   */
  const handleSearchSubmit = (searchQuery) => {
    setLastSearch({
      ...DEFAULT_LAST_SEARCH,
      query: searchQuery,
      isLoading: true,
    });

    NewsApi.searchNews(searchQuery)
      .then((response) => setLastSearch({
        ...DEFAULT_LAST_SEARCH,
        query: searchQuery,
        results: response.articles,
      }))
      .catch(() => setLastSearch({
        ...DEFAULT_LAST_SEARCH,
        query: searchQuery,
        isError: true,
      }));
  };

  /**
   * Handle loading the initial articles.
   *
   * @return {void}
   */
  const handleLoadingInitialResults = () => {
    setShownResults(lastSearch.results.slice(0, 3));
    setRemainingResults(lastSearch.results.slice(3));
  };

  /**
   * Handle loading more articles.
   *
   * @return {void}
   */
  const handleLoadMoreClick = () => {
    setShownResults([
      ...shownResults,
      ...remainingResults.slice(0, 3),
    ]);

    setRemainingResults(remainingResults.slice(3));
  };

  /*
   * ----------------------------------------------------------------
   * Saved Articles Functions
   * ----------------------------------------------------------------
   */

  /**
   * Update the saved articles of the current user.
   *
   * @return {void}
   */
  const updateSavedArticles = () => {
    setSavedArticles({
      ...DEFAULT_SAVED_ARTICLES,
      isLoading: true,
    });

    MainApi.getSavedArticles()
      .then((response) => setSavedArticles({
        ...DEFAULT_SAVED_ARTICLES,
        data: response,
      }))
      .catch(() => setSavedArticles(DEFAULT_SAVED_ARTICLES));
  };

  /*
   * ----------------------------------------------------------------
   * News Card Functions
   * ----------------------------------------------------------------
   */

  /**
   * Handle saving the article in the database.
   *
   * @param {Object} articleData
   * @param {Function} setSavedArticleId
   * @return {void}
   */
  const handleBookmarkClick = (articleData, setSavedArticleId) => {
    MainApi.saveArticle({ ...articleData, keyword: lastSearch.query })
      .then((response) => {
        setSavedArticles({
          ...savedArticles,
          data: [
            ...savedArticles.data,
            response,
          ],
        });

        setSavedArticleId(response._id);
      })
      .catch((error) => triggerNotification(error.message));
  };

  /**
   * Handle removing the article from the database.
   *
   * @param {string} savedArticleId
   * @param {Function} setSavedArticleId
   * @return {void}
   */
  const handleRemoveClick = (savedArticleId, setSavedArticleId) => {
    MainApi.removeArticle(savedArticleId)
      .then(() => {
        setSavedArticles({
          ...savedArticles,
          data: savedArticles.data.filter((articleData) => articleData._id !== savedArticleId),
        });

        setSavedArticleId(undefined);
      })
      .catch((error) => triggerNotification(error.message));
  };

  /*
   * ----------------------------------------------------------------
   * Side Effects
   * ----------------------------------------------------------------
   */

  React.useEffect(() => {
    if (currentUser.isAuthRequired) {
      updateCurrentUser();
    }

    if (currentUser.isLoggedIn) {
      updateSavedArticles();
    }
  }, [currentUser]);

  React.useEffect(() => {
    localStorage.setItem('lastSearch', JSON.stringify(lastSearch));

    if (lastSearch.results.length > 0) {
      handleLoadingInitialResults();
    }
  }, [lastSearch]);

  React.useEffect(() => {
    if (location.state && location.state.openSignIn) {
      openSignInPopup();

      navigate({
        state: { openSignIn: false },
      });
    }
  }, [location]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={(
            <Main
              lastSearch={lastSearch}
              savedArticles={savedArticles}
              shownResults={shownResults}
              onSearchSubmit={handleSearchSubmit}
              onSignInClick={openSignInPopup}
              onSignUpClick={openSignUpPopup}
              onSignOutClick={handleLogoutClick}
              onBookmarkClick={handleBookmarkClick}
              onRemoveClick={handleRemoveClick}
              onLoadMoreClick={remainingResults.length > 0 && handleLoadMoreClick}
            />
          )}
        />

        <Route
          path="/saved-news"
          element={(
            <ProtectedRoute>
              <SavedNews
                savedArticles={savedArticles}
                onSignOutClick={handleLogoutClick}
                onRemoveClick={handleRemoveClick}
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

      <Notification
        message={notificationMessage}
        isVisible={isNotificationVisible}
      />

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
