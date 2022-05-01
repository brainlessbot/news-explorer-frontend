import BaseApi from './BaseApi';
import {
  NEWS_API_URL,
  NEWS_API_KEY,
  RESULTS_INTERVAL,
  RESULTS_SIZE,
} from './constants';

class NewsApi extends BaseApi {
  /**
   * Search for recent news.
   *
   * @param {string} searchQuery
   * @return {Promise}
   * @public
   */
  searchNews(searchQuery) {
    const now = new Date();
    const past = new Date(now.getTime() - RESULTS_INTERVAL);

    return this.sendRequest(
      '/everything'
      + `?apiKey=${NEWS_API_KEY}`
      + `&q=${encodeURIComponent(searchQuery)}`
      + `&from=${past.toISOString()}`
      + `&to=${now.toISOString()}`
      + `&pageSize=${RESULTS_SIZE}`,
    ).then(this._reformatResults);
  }

  /**
   * Reformat search results to match the database structure.
   *
   * @param {Promise} response
   * @return {Object}
   * @private
   */
  _reformatResults(response) {
    return {
      ...response,
      articles: response.articles
        .map((articleData) => ({
          title: articleData.title,
          text: articleData.description,
          date: articleData.publishedAt,
          source: articleData.source.name,
          link: articleData.url,
          image: articleData.urlToImage,
        })),
    };
  }
}

export default new NewsApi(NEWS_API_URL);
