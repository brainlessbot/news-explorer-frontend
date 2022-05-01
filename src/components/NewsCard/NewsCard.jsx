import React from 'react';
import classNames from 'classnames';
import CurrentUserContext from '../../context/CurrentUserContext';
import './NewsCard.css';

/**
 * News Card component.
 *
 * @component
 * @param {Object} data
 * @param {Object} savedArticles
 * @param {boolean} isSearchResults
 * @param {Function} onSignUpClick
 * @param {Function} onBookmarkClick
 * @param {Function} onRemoveClick
 * @return {React.ReactNode}
 */
const NewsCard = ({
  data,
  savedArticles = {},
  isSearchResults = false,
  onSignUpClick = () => {},
  onBookmarkClick = () => {},
  onRemoveClick = () => {},
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  const [savedArticleId, setSavedArticleId] = React.useState(data._id || undefined);

  /**
   * Handle click on the bookmark icon.
   *
   * @return {void}
   */
  const handleBookmarkClick = () => onBookmarkClick(data, setSavedArticleId);

  /**
   * Handle click on the remove icon.
   *
   * @return {void}
   */
  const handleRemoveClick = () => onRemoveClick(savedArticleId, setSavedArticleId);

  React.useEffect(() => {
    if (!currentUser.isLoggedIn) {
      setSavedArticleId(undefined);
    }
  }, [currentUser]);

  React.useEffect(() => {
    if (savedArticles.data && savedArticleId === undefined) {
      const savedArticle = savedArticles.data.findIndex(
        (articleData) => articleData.link === data.link,
      );

      if (savedArticle > -1) {
        setSavedArticleId(savedArticles.data[savedArticle]._id);
      }
    }
  }, [savedArticles]);

  return (
    <li className="news-card">
      <div className="news-card__container">
        <div className="news-card__image-container">
          <img src={data.image} alt={data.title} className="news-card__image" />

          {data.keyword && (
            <p className="news-card__keyword">
              {data.keyword}
            </p>
          )}

          <button
            type="button"
            onClick={
              isSearchResults
                ? currentUser.isLoggedIn
                  ? savedArticleId
                    ? handleRemoveClick
                    : handleBookmarkClick
                  : onSignUpClick
                : handleRemoveClick
            }
            className={classNames(
              'news-card__action-button',
              isSearchResults
                ? savedArticleId
                  ? 'news-card__action-button_type_bookmark-active'
                  : 'news-card__action-button_type_bookmark'
                : 'news-card__action-button_type_trash',
            )}
          >
            <span className="news-card__action-button-text">
              {
                isSearchResults
                  ? currentUser.isLoggedIn
                    ? savedArticleId
                      ? 'Remove from saved'
                      : 'Save article'
                    : 'Sign in to save articles'
                  : 'Remove from saved'
              }
            </span>
          </button>
        </div>

        <a
          href={data.link}
          target="_blank"
          rel="noreferrer"
          className="news-card__content-container"
        >
          <p className="news-card__date">
            {new Date(data.date).toLocaleString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>

          <h3 className="news-card__title" title={data.title}>
            {data.title}
          </h3>

          <p className="news-card__text">
            {data.text}
          </p>

          <p className="news-card__source">
            {data.source}
          </p>
        </a>
      </div>
    </li>
  );
};

export default NewsCard;
