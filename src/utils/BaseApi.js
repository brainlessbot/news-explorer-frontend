class BaseApi {
  /**
   * Initialize a Base Api instance.
   *
   * @constructor
   * @param {string} baseUrl
   * @return {void}
   * @public
   */
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  /**
   * Handle sending the request to the server.
   *
   * @param {string} targetUrl
   * @param {string} method
   * @param {Object} options
   * @return {Promise}
   * @protected
   */
  sendRequest(targetUrl, method = 'GET', options = {}) {
    return fetch(this._baseUrl + targetUrl, {
      ...options,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }).then(this._checkResponse);
  }

  /**
   * Handle checking the response from the server.
   *
   * @param {Promise} response
   * @return {Promise}
   * @private
   */
  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then((error) => Promise.reject(error));
  }
}

export default BaseApi;
