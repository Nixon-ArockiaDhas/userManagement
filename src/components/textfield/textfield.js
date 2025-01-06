import { TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import React, { useState } from "react";

const FormTextField = ({
  label,
  value,
  onChange = () => { },
  variant = "outlined",
  margin,
  type = "text",
  errorMessage = "",
  fullWidth = true,
  helperText,
  startIcon = null,
  endIcon = null,
  required = false,
  validateEmail = false,
  validateUrl = false,
  validateOnChange = false,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState(helperText || "");
  const [isTouched, setIsTouched] = useState(false);

  const validateField = (value) => {
    let isValid = true;
    let validationMessage = "";

    if (required && !value.trim()) {
      isValid = false;
      validationMessage = `${label || "This field"} is required.`;
    } else if (validateEmail && value.trim() && !/^\S+@\S+\.\S+$/.test(value)) {
      isValid = false;
      validationMessage = "Enter a valid email address.";
    } else if (validateUrl && value.trim() && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value)) {
      isValid = false;
      validationMessage = "Enter a valid URL.";
    }

    setError(!isValid);
    setErrorText(validationMessage);

    return isValid;
  };

  const handleBlur = () => {
    setIsTouched(true);
    validateField(value);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    if (validateOnChange && isTouched) {
      validateField(newValue);
    }
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      variant={variant}
      margin={margin}
      type={type}
      fullWidth={fullWidth}
      autoComplete="off"
      error={error && isTouched}
      helperText={isTouched && error ? errorText : helperText}
      InputProps={{
        startAdornment: startIcon ? (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ) : null,
        endAdornment: endIcon ? (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : null,
      }}
      {...props}
    />
  );
};

export default FormTextField;
