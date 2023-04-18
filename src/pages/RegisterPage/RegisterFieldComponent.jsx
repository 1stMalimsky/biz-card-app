import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Alert, TextField } from "@mui/material";

const RegisterFieldComponent = ({ input, required, value, id, onChange }) => {
  return (
    <Fragment>
      <TextField
        autoComplete={input}
        required={required}
        fullWidth
        id={id}
        label={input}
        autoFocus
        value={value}
        onChange={onChange}
      />
    </Fragment>
  );
};

RegisterFieldComponent.propTypes = {
  input: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
};

export default RegisterFieldComponent;
