import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Button from '../Button/Button';
import useForm from '../../hooks/form';

/**
 * Sign In Popup component.
 *
 * @component
 * @param {boolean} isVisible
 * @param {Function} closePopup
 * @param {Function} onFormSubmit
 * @param {Function} switchToSignUp
 * @return {React.ReactNode}
 */
const SignInPopup = ({
  isVisible,
  closePopup,
  onFormSubmit,
  switchToSignUp,
}) => {
  const {
    formValues,
    formErrors,
    isFormValid,
    handleInputChange,
    resetForm,
  } = useForm();

  const [isLoading, setIsLoading] = React.useState(false);
  const [errorResponse, setErrorResponse] = React.useState(undefined);

  /**
   * Handle an error response from the server.
   *
   * @param {Object} error
   * @return {void}
   */
  const handleErrorResponse = (error) => {
    if (error.validation) {
      return setErrorResponse(error.validation.body.message);
    }

    return setErrorResponse(error.message);
  };

  /**
   * Handle any response from the server.
   *
   * @return {void}
   */
  const handleAnyResponse = () => setIsLoading(false);

  /**
   * Handle the submission of the form.
   *
   * @param {Event} event
   * @return {void}
   */
  const handleFormSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);
    onFormSubmit(
      {
        email: formValues.email,
        password: formValues.password,
      },
      handleErrorResponse,
      handleAnyResponse,
    );
  };

  React.useEffect(() => {
    resetForm();
    setErrorResponse(undefined);
  }, [isVisible]);

  return (
    <PopupWithForm
      isVisible={isVisible}
      closePopup={closePopup}
    >
      <h2 className="popup-with-form__title">
        Sign in
      </h2>

      <form
        name="signin-form"
        onSubmit={handleFormSubmit}
        noValidate
      >
        <label htmlFor="signin-email" className="popup-with-form__input-group">
          <span className="popup-with-form__input-label">
            Email
          </span>

          <input
            id="signin-email"
            name="email"
            value={formValues.email || ''}
            onChange={handleInputChange}
            className="popup-with-form__input"
            type="email"
            autoComplete="off"
            placeholder="Enter email"
            required
            disabled={isLoading}
          />

          {formErrors.email && (
            <p className="popup-with-form__error">
              {formErrors.email}
            </p>
          )}
        </label>

        <label htmlFor="signin-password" className="popup-with-form__input-group">
          <span className="popup-with-form__input-label">
            Password
          </span>

          <input
            id="signin-password"
            name="password"
            value={formValues.password || ''}
            onChange={handleInputChange}
            className="popup-with-form__input"
            type="password"
            minLength="8"
            autoComplete="off"
            placeholder="Enter password"
            required
            disabled={isLoading}
          />

          {formErrors.password && (
            <p className="popup-with-form__error">
              {formErrors.password}
            </p>
          )}
        </label>

        {errorResponse && (
          <p className="popup-with-form__error popup-with-form__error_general">
            {errorResponse}
          </p>
        )}

        <Button
          type="submit"
          pattern="primary"
          className="popup-with-form__submit-button"
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>

        <p className="popup-with-form__more-options">
          or
          {' '}

          <button
            type="button"
            onClick={switchToSignUp}
            className="popup-with-form__switch-button"
          >
            Sign up
          </button>
        </p>
      </form>
    </PopupWithForm>
  );
};

export default SignInPopup;
