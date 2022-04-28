import React from 'react';
import Header from '../Header/Header';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Footer from '../Footer/Footer';
import { searchData } from '../../temp/data';

/**
 * Main component.
 *
 * @component
 * @param {Function} onSignInClick
 * @param {Function} onSignOutClick
 * @return {React.ReactNode}
 */
const Main = ({ onSignInClick, onSignOutClick }) => {
  const [newsData, setNewsData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // TEMPORARY FOR STAGE II
  React.useEffect(() => {
    setTimeout(() => {
      setNewsData(searchData);
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <Header
        onSignInClick={onSignInClick}
        onSignOutClick={onSignOutClick}
      />

      <main>
        <NewsCardList
          data={newsData}
          isLoading={isLoading}
          isSearchResults
          onSignInClick={onSignInClick}
          onLoadMoreClick={() => {}}
        />

        <About />
      </main>

      <Footer />
    </>
  );
};

export default Main;
