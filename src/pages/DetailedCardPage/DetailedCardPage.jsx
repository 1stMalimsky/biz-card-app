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
import { validateEditCardParamsSchema } from "../../validation/editValidation";
import { Card, CircularProgress } from "@mui/material";
import Divider from "@mui/material/Divider";
import { toast } from "react-toastify";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import "./detailedPage.css";

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
        <Typography variant="h2">{cardDetails.title}</Typography>
        <Divider />
      </Fragment>
      <Grid container display="flex" className="gridContainer">
        <Grid item md={12} lg={8}>
          <Card raised square>
            <Typography className="subtitle">{cardDetails.subTitle}</Typography>
            <Typography varient="h3" component="h2" className="paragraph">
              <br /> {cardDetails.description}
              <br />
              <br />
              <Divider />
              <span className="contactEmboss">
                Phone Number: {cardDetails.phone}
                <br />
                Email Address: {cardDetails.email} <br />
                <Fragment>
                  {cardDetails && cardDetails.web ? (
                    <Typography>Website: {cardDetails.web}</Typography>
                  ) : (
                    ""
                  )}
                </Fragment>
                <br />
                <Divider />
                Address:
              </span>
              <br />
              {cardDetails.street} {cardDetails.houseNumber},<br />
              {cardDetails.city} <br />
              {cardDetails.country} <br />
              <br />
              {cardDetails.zipCode}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <img
            src={cardDetails.url}
            alt={cardDetails.alt}
            style={{ maxWidth: 350 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailedCardPage;
