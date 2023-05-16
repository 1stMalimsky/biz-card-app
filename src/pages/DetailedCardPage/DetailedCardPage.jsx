import { useState, useEffect, Fragment } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { validateEditCardParamsSchema } from "../../validation/editValidation";
import { Card, CircularProgress } from "@mui/material";
import Divider from "@mui/material/Divider";
import "./detailedPage.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
};

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
      <Typography variant="h2">{cardDetails.title}</Typography>
      <Divider />
      <br />
      <Grid container display="flex" className="gridContainer">
        <Grid item md={12} lg={8}>
          <Card raised square>
            <Grid item xs={12}>
              <Typography className="subtitle">
                {cardDetails.subTitle}
              </Typography>
            </Grid>
            <Divider />
            <Grid item xs={12}>
              <Typography className="paragraph">
                {cardDetails.description}
              </Typography>
            </Grid>
            <Divider />
            <br />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Grid item xs={12} sm={5} className="gridItem">
                <Typography className="contactEmboss">
                  Phone Number: {cardDetails.phone}
                  <br />
                  Email Address: {cardDetails.email} <br />
                </Typography>
                {cardDetails && cardDetails.web ? (
                  <Typography className="contactEmboss">
                    Website: {cardDetails.web}
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12} sm={5} className="gridItem">
                <Typography className="contactEmboss">
                  Address:
                  <br />
                  {cardDetails.street} {cardDetails.houseNumber},<br />
                  {cardDetails.city} <br />
                  {cardDetails.country} <br />
                  <br />
                  Zipcode: {cardDetails.zipCode}
                </Typography>
              </Grid>
            </Box>
            <Grid item xs={12} sx={{ marginTop: 1 }}>
              <Typography className="contactEmboss">
                Created at: {formatDate(cardDetails.createdAt)}
              </Typography>
            </Grid>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <img
            src={cardDetails.url}
            alt={cardDetails.alt}
            style={{ maxWidth: 300, maxHeight: 230 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailedCardPage;
