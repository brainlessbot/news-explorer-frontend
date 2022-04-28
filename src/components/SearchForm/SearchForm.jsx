import React from 'react';
import Button from '../Button/Button';
import './SearchForm.css';

/**
 * Search Form component.
 *
 * @component
 * @return {React.ReactNode}
 */
const SearchForm = () => {
  const [inputValue, setInputValue] = React.useState('');

  /**
   * Handle input value change.
   *
   * @param {Event} event
   * @return {void}
   */
  const handleInputChange = (event) => setInputValue(event.target.value);

  return (
    <form className="search-form">
      <input
        name="input"
        value={inputValue}
        onChange={handleInputChange}
        className="search-form__input"
        type="text"
        autoComplete="off"
        placeholder="Enter topic"
        required
      />

      <Button
        type="submit"
        pattern="primary"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
