import React from 'react';
import classNames from 'classnames';
import Button from '../Button/Button';
import useForm from '../../hooks/form';
import './SearchForm.css';

/**
 * Search Form component.
 *
 * @component
 * @param {Object} lastSearch
 * @param {Function} onSearchSubmit
 * @return {React.ReactNode}
 */
const SearchForm = ({ lastSearch, onSearchSubmit }) => {
  const {
    formValues,
    formErrors,
    isFormValid,
    handleInputChange,
    resetForm,
    validateFormOnSubmit,
  } = useForm();

  const [lastError, setLastError] = React.useState(undefined);

  /**
   * Handle the submission of the form.
   *
   * @param {Event} event
   * @return {void}
   */
  const handleFormSubmit = (event) => {
    event.preventDefault();

    validateFormOnSubmit(event);

    if (isFormValid) {
      onSearchSubmit(formValues.query);
    }
  };

  React.useEffect(() => {
    if (lastSearch.query) {
      resetForm({
        query: lastSearch.query,
      });
    }
  }, [lastSearch]);

  React.useEffect(() => {
    if (formErrors.query) {
      setLastError(formErrors.query);
    }
  }, [formErrors]);

  return (
    <form
      name="search-form"
      onSubmit={handleFormSubmit}
      className="search-form"
      noValidate
    >
      <input
        name="query"
        value={formValues.query || ''}
        onChange={handleInputChange}
        className="search-form__input"
        type="text"
        autoComplete="off"
        placeholder="Enter topic"
        required
        disabled={lastSearch.isLoading}
      />

      <p
        className={classNames(
          'search-form__input-error',
          formErrors.query && 'search-form__input-error_visible',
        )}
      >
        {lastError}
      </p>

      <Button
        type="submit"
        pattern="primary"
        disabled={lastSearch.isLoading || formErrors.query}
      >
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
