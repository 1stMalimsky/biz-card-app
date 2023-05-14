import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import registerInputs from "../utils/registerInputs";
import validateProfileSchema from "../validation/profileValidation";
import ROUTES from "../routes/ROUTES";
import RegisterFieldComponent from "./RegisterPage/RegisterFieldComponent";
import CachedIcon from "@mui/icons-material/Cached";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const ProfilePage = () => {
  const [inputState, setInputState] = useState("");
  const [inputSubmitState, setInputSubmitState] = useState("");
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const [disableButtonState, setDisableButtonState] = useState(true);
  const navigate = useNavigate();
  const profileInputs = registerInputs.filter(
    (item) => item.inputName !== "Password"
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/users/userInfo");
        setInputState(data);
      } catch (err) {
        console.log("err from axios", err);
        toast.error("Oops! Couldn't load your profile. Please try again");
      }
    })();
  }, []);

  useEffect(() => {
    if (!inputState) {
      return;
    }
    if (
      inputState.firstName.trim() &&
      inputState.lastName.trim() &&
      inputState.phone.trim() &&
      inputState.email.trim() &&
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
    inputState.country,
    inputState.city,
    inputState.street,
    inputState.houseNumber,
  ]);

  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = validateProfileSchema(inputSubmitState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }
      await axios.put("/users/userInfo/" + inputState._id, inputSubmitState);
      toast.success("User info updated!");
    } catch (err) {
      console.log("error from axios", err.response.data);
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const { _id, isAdmin, biz, ...rest } = inputState;
    setInputSubmitState(rest);
  };
  const handleResetBtn = () => {
    setInputState(
      Object.fromEntries(registerInputs.map((item) => [item.stateName, ""]))
    );
    setInputsErrorsState(null);
  };

  if (!inputState) {
    return <CircularProgress />;
  }

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
        <Avatar
          sx={{ bgcolor: "secondary.main", width: 100, height: 100 }}
          src={inputState.imageUrl ? inputState.imageUrl : ""}
          alt={inputState.imageAlt}
        />
        <Typography component="h1" variant="h4">
          Profile Page
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {profileInputs.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                key={item.inputName + " profilePage"}
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
            <Grid item xs={12} sm={8}></Grid>
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
export default ProfilePage;
