import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import ROUTES from "../routes/ROUTES";
import validateEditSchema from "../validation/editValidation";
import CachedIcon from "@mui/icons-material/Cached";
import AddCardInput from "../components/AddCardInput";
import { toast } from "react-toastify";
import addCardInputs from "../utils/newCardInput";

const AddNewCardPage = () => {
  const [inputState, setInputState] = useState(
    Object.fromEntries(addCardInputs.map((item) => [item.stateName, ""]))
  );
  //console.log(inputState);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const [submitBtnState, setSubmitBtnState] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      inputState.title.trim() &&
      inputState.subTitle.trim() &&
      inputState.description.trim() &&
      inputState.url.trim() &&
      inputState.alt.trim() &&
      inputState.phone.trim() &&
      inputState.country.trim() &&
      inputState.city.trim() &&
      inputState.street.trim() &&
      inputState.houseNumber.trim() &&
      inputState.zipCode.trim() &&
      inputState.email.trim() &&
      inputState.web.trim()
    ) {
      setSubmitBtnState(false);
    } else {
      setSubmitBtnState(true);
    }
  }, [inputState]);

  const handleAddCardBtnClick = async (ev) => {
    try {
      const updatedInputState = { ...inputState };
      if (updatedInputState.web) {
        updatedInputState.web = `https://${updatedInputState.web}`;
      }
      console.log(inputState.wed);
      const joiResponse = validateEditSchema(updatedInputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        console.log(joiResponse);
        return;
      }
      await axios.post("/cards/", updatedInputState);
      toast.success("SUCCESS! Business Card Added");
      navigate(ROUTES.MYCARDS);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleResetBtn = () => {
    const updatedState = { ...inputState };
    Object.keys(inputState).forEach((key) => {
      updatedState[key] = "";
    });
    setInputState(updatedState);
    setInputsErrorsState(null);
  };

  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.HOME);
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
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
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Add New Card
        </Typography>
        <Box
          component="img"
          sx={{
            display: inputState.url ? "block" : "none",
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt={"cardImg"}
          src={inputState.url}
        />
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {addCardInputs.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={item.inputName + "addCardPage"}
              >
                {item.stateName === "description" ? (
                  <TextField
                    label={item.inputName}
                    required={true}
                    value={inputState[item.stateName]}
                    id={item.stateName}
                    onChange={handleInputChange}
                    multiline
                    fullWidth
                  />
                ) : (
                  <AddCardInput
                    input={item.stateName}
                    label={item.inputName}
                    required={true}
                    value={inputState[item.stateName]}
                    id={item.stateName}
                    onChange={handleInputChange}
                  />
                )}
                {inputsErrorsState && inputsErrorsState[item.inputName] && (
                  <Alert severity="warning">
                    {inputsErrorsState[item.inputName].map((err) => (
                      <div key={item.inputName + err}>{err}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
            ))}
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleCancelBtnClick}
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
                fullWidth
                variant="contained"
                onClick={handleAddCardBtnClick}
                disabled={submitBtnState}
              >
                Add Card
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default AddNewCardPage;
