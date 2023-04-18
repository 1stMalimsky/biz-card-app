import { Fragment, useState } from "react";
import { Grid, Alert, TextField } from "@mui/material";

/* const inputTags = [
  { input: "First Name", required: true },
  { input: "Last Name", required: true },
  { input: "Middle Name", required: false },
  { input: "Phone", required: true },
  "Email",
  "Password",
  "Image Url",
  "Image Alt",
  "State",
  "Country",
  "City",
  "Street",
  "House Number",
  "Zipcode",
]; */

const RegisterFieldComponent = (input, required) => {
  /*  const [inputState, setInputState] = useState(
    inputTags.map((item) => item.input)
  );

  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  }; */

  return (
    <Grid container spacing={2}>
      {/* {inputTags.map((item) => ( */}
      <Grid item xs={12} sm={4}>
        <TextField
          autoComplete={input}
          name={input}
          required={item.required}
          fullWidth
          id={item.input}
          label={item.input}
          autoFocus
          value={inputState.input}
          onChange={handleInputChange}
        />

        {/*  {inputsErrorsState && inputsErrorsState.firstName && (
          <Alert severity="warning">
            {inputsErrorsState.firstName.map((item) => (
              <div key={"firstName-errors" + item}>{item}</div>
            ))}
          </Alert>
        )} */}
      </Grid>
      {/* )) */}}
    </Grid>
  );
};

export default RegisterFieldComponent;
