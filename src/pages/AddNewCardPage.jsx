import { useState, useEffect, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import validateEditSchema, {
  validateEditCardParamsSchema,
} from "../validation/editValidation";
import atom from "../logo.svg";
import CachedIcon from "@mui/icons-material/Cached";
import { useSelector } from "react-redux";
import AddCardInput from "../components/AddCardInput";
import { toast } from "react-toastify";

const AddNewCardPage = () => {
  const cardTemplate = useSelector((bigState) => bigState.cardTemplateSlice);
  const initialStateValues = cardTemplate.reduce((acc, item) => {
    acc[item.stateName] = "";
    return acc;
  }, {});
  const [inputState, setInputState] = useState(initialStateValues);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setInputState(initialStateValues);
  }, []);

  const handleAddCardBtnClick = async (ev) => {
    try {
      console.log(inputState);
      const joiResponse = validateEditSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }
      const { data } = await axios.post("/cards/", inputState);
      toast.success("SUCCESS! Business Card Add");
      setTimeout(() => navigate(ROUTES.MYCARDS), 3000);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleResetBtn = () => {
    console.log("resetBtnClicked");
    const updatedState = { ...inputState };
    console.log(inputState);
    console.log(updatedState);
    Object.keys(inputState).forEach((key) => {
      updatedState[key] = "";
    });
    setInputState(updatedState);
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
          Edit card
        </Typography>
        <Box
          component="img"
          sx={{
            display: inputState.url ? "block" : "none",
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt={"cardImg"}
          src={inputState.url}
        />
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {cardTemplate.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={item.stateName + "addCardPage"}
              >
                {item.stateName === "description" ? (
                  <TextField
                    label={item.name}
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
                    label={item.name}
                    required={true}
                    value={inputState[item.stateName]}
                    id={item.stateName}
                    onChange={handleInputChange}
                  />
                )}
                {inputsErrorsState && inputsErrorsState[item.stateName] && (
                  <Alert severity="warning">
                    {inputsErrorsState[item.stateName].map((err) => (
                      <div key={item.stateName + err}>{err}</div>
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
