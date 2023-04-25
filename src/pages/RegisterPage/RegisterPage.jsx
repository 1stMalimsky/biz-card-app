import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import CachedIcon from "@mui/icons-material/Cached";
import PersonAddAltSharpIcon from "@mui/icons-material/PersonAddAltSharp";
import axios from "axios";

import validateRegisterSchema from "../../validation/registerValidation";
import ROUTES from "../../routes/ROUTES";
import RegisterFieldComponent from "./RegisterFieldComponent";

const registerInputs = [
  { inputName: "First Name", stateName: "firstName", required: true },
  { inputName: "Last Name", stateName: "lastName", required: true },
  { inputName: "Middle Name", stateName: "middleName", required: false },
  { inputName: "Phone", stateName: "phone", required: true },
  { inputName: "Email Address", stateName: "email", required: true },
  { inputName: "Password", stateName: "password", required: true },
  { inputName: "Image Url", stateName: "imageUrl", required: false },
  { inputName: "Image Alt", stateName: "imageAlt", required: false },
  { inputName: "State", stateName: "state", required: false },
  { inputName: "Country", stateName: "country", required: true },
  { inputName: "City", stateName: "city", required: true },
  { inputName: "Street", stateName: "street", required: true },
  { inputName: "House Number", stateName: "houseNumber", required: true },
  { inputName: "Zipcode", stateName: "zipCode", required: false },
];

const RegisterPage = () => {
  const [inputState, setInputState] = useState(
    Object.fromEntries(registerInputs.map((item) => [item.stateName, ""]))
  );
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const [disableButtonState, setDisableButtonState] = useState(true);
  const [checkedBoxState, setBoxState] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      inputState.firstName.trim() &&
      inputState.lastName.trim() &&
      inputState.phone.trim() &&
      inputState.email.trim() &&
      inputState.password.trim() &&
      inputState.country.trim() &&
      inputState.city.trim() &&
      inputState.street.trim &&
      inputState.houseNumber.trim()
    ) {
      setDisableButtonState(false);
    } else {
      setDisableButtonState(true);
    }
  }, [
    inputState.firstName,
    inputState.lastName,
    inputState.phone,
    inputState.email,
    inputState.password,
    inputState.country,
    inputState.city,
    inputState.street,
    inputState.houseNumber,
  ]);
  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = validateRegisterSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }
      await axios.post(
        "/users/register",
        checkedBoxState ? { ...inputState, biz: true } : inputState
      );
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log("error from axios", err.response.data);
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };
  const handleResetBtn = () => {
    setInputState(
      Object.fromEntries(registerInputs.map((item) => [item.stateName, ""]))
    );
    setInputsErrorsState(null);
  };
  const handleCheckedBox = (event) => {
    setBoxState(event.target.checked);
  };
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PersonAddAltSharpIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Register Page
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {registerInputs.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                key={item.inputName + " registerPage"}
              >
                <RegisterFieldComponent
                  input={item.inputName}
                  required={item.required}
                  value={inputState[item.stateName]}
                  id={item.stateName}
                  onChange={handleInputChange}
                />
                {inputsErrorsState && inputsErrorsState[item.stateName] && (
                  <Alert severity="warning">
                    {inputsErrorsState[item.stateName].map((err) => (
                      <div key={item.stateName + err}>{err}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
            ))}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedBoxState}
                    onChange={handleCheckedBox}
                    value="bizAccountBox"
                    color="primary"
                  />
                }
                label="Sign up as business account"
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate(ROUTES.HOME)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" fullWidth onClick={handleResetBtn}>
                <CachedIcon />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                disabled={disableButtonState}
                fullWidth
                onClick={handleBtnClick}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={ROUTES.LOGIN}>Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default RegisterPage;
