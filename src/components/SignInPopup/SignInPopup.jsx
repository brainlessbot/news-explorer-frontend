import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Button from '../Button/Button';

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
  const [emailValue, setEmailValue] = React.useState('name@address.com');
  const [passwordValue, setPasswordValue] = React.useState('12345678');

  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * Handle email value change.
   *
   * @param {Event} event
   * @return {void}
   */
  const handleEmailChange = (event) => setEmailValue(event.target.value);

  /**
   * Handle password value change.
   *
   * @param {Event} event
   * @return {void}
   */
  const handlePasswordChange = (event) => setPasswordValue(event.target.value);

  /**
   * Handle the submission of the form.
   *
   * @param {Event} event
   * @return {void}
   */
  const handleFormSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);
    onFormSubmit({
      email: emailValue,
      password: passwordValue,
    }, () => setIsLoading(false));
  };

  React.useEffect(() => {
    setEmailValue('name@address.com');
    setPasswordValue('12345678');
  }, [isVisible]);

  return (
    <PopupWithForm
      isVisible={isVisible}
      closePopup={closePopup}
    >
      <h2 className="popup-with-form__title">
        Sign in
      </h2>

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="signin-email" className="popup-with-form__input-group">
          <span className="popup-with-form__input-label">
            Email
          </span>

          <input
            id="signin-email"
            name="email"
            value={emailValue}
            onChange={handleEmailChange}
            className="popup-with-form__input"
            type="text"
            autoComplete="off"
            placeholder="Enter email"
            required
          />
        </label>

        <label htmlFor="signin-password" className="popup-with-form__input-group">
          <span className="popup-with-form__input-label">
            Password
          </span>

          <input
            id="signin-password"
            name="password"
            value={passwordValue}
            onChange={handlePasswordChange}
            className="popup-with-form__input"
            type="password"
            autoComplete="off"
            placeholder="Enter password"
            required
          />
        </label>

        <Button
          type="submit"
          pattern="primary"
          className="popup-with-form__submit-button"
          disabled={isLoading}
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
