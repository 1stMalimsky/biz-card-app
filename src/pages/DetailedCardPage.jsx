import { useState, useEffect, Fragment } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import validateEditSchema, {
  validateEditCardParamsSchema,
} from "../validation/editValidation";
import { Card, CircularProgress } from "@mui/material";
import Divider from "@mui/material/Divider";
import { toast } from "react-toastify";

const DetailedCardPage = () => {
  const { id } = useParams();
  const [cardDetails, setCardDetails] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const errors = validateEditCardParamsSchema({ id });
        if (errors) {
          navigate("/");
          return;
        }
        const { data } = await axios.get("/cards/card/" + id);
        let newInputState = {
          ...data,
        };
        if (data.image && data.image.url) {
          newInputState.url = data.image.url;
        } else {
          newInputState.url = "";
        }
        if (data.image && data.image.alt) {
          newInputState.alt = data.image.alt;
        } else {
          newInputState.alt = "";
        }
        delete newInputState.image;
        delete newInputState.likes;
        delete newInputState._id;
        delete newInputState.user_id;
        delete newInputState.bizNumber;
        delete newInputState.createdAt;
        setCardDetails(newInputState);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, [id]);

  if (!cardDetails) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <Fragment>
        <Typography variant="h2">Detailed card</Typography>
        <Divider />
      </Fragment>
      <Grid container>
        <Grid item xs={8}>
          <Card raised square>
            <Typography varient="h6" component="p">
              Title:
              <br />
              Subtitle:
              <br /> Description: <br />
              Phone: <br />
              Email Address: <br />
              Country: <br />
              City: <br />
              Street: <br />
              House Number: <br />
              Zipcode:
            </Typography>
          </Card>
        </Grid>
        <Grid item>
          <img src="" alt="your img here" srcset="" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailedCardPage;
