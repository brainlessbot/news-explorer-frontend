import BaseApi from './BaseApi';
import { MAIN_API_URL } from './constants';

class MainApi extends BaseApi {
  _authToken = undefined;

  /**
   * Sign in a user.
   *
   * @param {string} email
   * @param {string} password
   * @return {Promise}
   * @public
   */
  signIn({ email, password }) {
    return this.sendRequest('/signin', 'POST', {
      body: JSON.stringify({ email, password }),
    });
  }

  /**
   * Sign up a user.
   *
   * @param {string} email
   * @param {string} password
   * @param {string} name
   * @return {Promise}
   * @public
   */
  signUp({ email, password, name }) {
    return this.sendRequest('/signup', 'POST', {
      body: JSON.stringify({ email, password, name }),
    });
  }

  /**
   * Get the current user by its token.
   *
   * @param {string} token
   * @return {Promise}
   * @public
   */
  getCurrentUser(token) {
    this._setAuthToken(token);

    return this._sendRequestWithAuth('/users/me');
  }

  /**
   * Get all user saved articles.
   *
   * @return {Promise}
   * @public
   */
  getSavedArticles() {
    return this._sendRequestWithAuth('/articles');
  }

  /**
   * Save a new article.
   *
   * @param {string} keyword
   * @param {string} title
   * @param {string} text
   * @param {string} date
   * @param {string} source
   * @param {string} link
   * @param {string} image
   * @return {Promise}
   * @public
   */
  saveArticle({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  }) {
    return this._sendRequestWithAuth('/articles', 'POST', {
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    });
  }

  /**
   * Remove a saved article.
   *
   * @param {string} id
   * @return {Promise}
   * @public
   */
  removeArticle(id) {
    return this._sendRequestWithAuth(`/articles/${id}`, 'DELETE');
  }

  /**
   * Handle sending the request to the server with authorization.
   *
   * @param {string} targetUrl
   * @param {string} method
   * @param {Object} options
   * @return {Promise}
   * @private
   */
  _sendRequestWithAuth(targetUrl, method = 'GET', options = {}) {
    return this.sendRequest(targetUrl, method, {
      ...options,
      headers: {
        Authorization: this._authToken,
        ...options.headers,
      },
    });
  }

  /**
   * Set user's authorization token.
   *
   * @param {string} token
   * @return {void}
   * @private
   */
  _setAuthToken(token) {
    this._authToken = `Bearer ${token}`;
  }
}

export default new MainApi(MAIN_API_URL);
