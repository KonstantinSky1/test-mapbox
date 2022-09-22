import React from "react";

export default function useFormWithValidation(defaultData) {
  const [isValid, setIsValid] = React.useState(false);
  const [values, setValues] = React.useState(defaultData);
  const [errors, setErrors] = React.useState(defaultData);


  const handleChange = (event) => {
    const {name, value} = event.target;

    setValues(prev => (
      {
        ...prev,
        [name]: value
      }
    ));

    setErrors(prev => (
      {
        ...prev,
        [name]: event.target.validationMessage
      }
    ));

    setIsValid(event.target.closest("form").checkValidity());
  };

  return { values, handleChange, setValues, isValid, setIsValid, errors };
}