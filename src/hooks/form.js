import React from 'react';

/**
 * Form hook with validation.
 *
 * @return {Object}
 */
const useForm = () => {
  const [formValues, setFormValues] = React.useState({});
  const [formErrors, setFormErrors] = React.useState({});
  const [isFormValid, setIsFormValid] = React.useState(false);

  /**
   * Update relevant state when the input changes.
   *
   * @param {Event} event
   * @return {void}
   */
  const handleInputChange = (event) => {
    const { target } = event;
    const { name, value, validationMessage } = target;

    setFormValues({
      ...formValues,
      [name]: value,
    });

    setFormErrors({
      ...formErrors,
      [name]: validationMessage,
    });

    setIsFormValid(target.closest('form').checkValidity());
  };

  /**
   * Reset form state.
   *
   * @param {Object} newValues
   * @param {Object} newErrors
   * @param {boolean} newIsValid
   * @return {void}
   */
  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setFormValues(newValues);
      setFormErrors(newErrors);
      setIsFormValid(newIsValid);
    },
    [setFormValues, setFormErrors, setIsFormValid],
  );

  /**
   * Validate inputs on form submission.
   *
   * @param {Event} event
   * @return {void}
   */
  const validateFormOnSubmit = (event) => {
    const { target } = event;
    const { name: formName } = target;

    const newValues = {};
    const newErrors = {};

    Array.from(document.forms[formName].elements).forEach((element) => {
      const { name: elementName, value, validationMessage } = element;

      newValues[elementName] = value;
      newErrors[elementName] = validationMessage;
    });

    setFormValues({
      ...formValues,
      ...newValues,
    });

    setFormErrors({
      ...formErrors,
      ...newErrors,
    });

    setIsFormValid(target.checkValidity());
  };

  return {
    formValues,
    formErrors,
    isFormValid,
    handleInputChange,
    resetForm,
    validateFormOnSubmit,
  };
};

export default useForm;
