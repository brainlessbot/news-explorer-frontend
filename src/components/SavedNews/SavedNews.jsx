import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Footer from '../Footer/Footer';
import { savedData } from '../../temp/data';

/**
 * Saved News component.
 *
 * @component
 * @param {Function} onSignOutClick
 * @return {React.ReactNode}
 */
const SavedNews = ({ onSignOutClick }) => {
  const [newsData, setNewsData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // TEMPORARY FOR STAGE II
  React.useEffect(() => {
    setTimeout(() => {
      setNewsData(savedData);
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <SavedNewsHeader
        onSignOutClick={onSignOutClick}
      />

      <main>
        <NewsCardList
          data={newsData}
          isLoading={isLoading}
        />
      </main>

      <Footer />
    </>
  );
};

export default SavedNews;
