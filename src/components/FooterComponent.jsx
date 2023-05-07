import { Button, Grid, IconButton, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import ROUTES from "../routes/ROUTES";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PortraitIcon from "@mui/icons-material/Portrait";

const FooterComponent = () => {
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const isBiz = useSelector((bigState) => bigState.authSlice.isBiz);
  const [loggedIn, setLoggedIn] = useState(false);
  const [bizState, setBizState] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(isLoggedIn);
    setBizState(isBiz);
  }, [isLoggedIn, isBiz]);

  return (
    <Fragment>
      <hr />
      <Grid container display="flex" justifyContent="center">
        <Grid item xs={4} sx={{ textAlign: "center" }}>
          {loggedIn ? (
            <Button
              startIcon={<FavoriteIcon />}
              onClick={() => navigate(ROUTES.FAVCARDS)}
            >
              Liked Cards
            </Button>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={4} sx={{ textAlign: "center" }}>
          <Button
            startIcon={<InfoIcon />}
            onClick={() => navigate(ROUTES.ABOUT)}
          >
            About
          </Button>
          <Typography variant="body1"> © Alon Malimsky 2023</Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: "center" }}>
          {loggedIn && bizState ? (
            <Button
              startIcon={<PortraitIcon />}
              onClick={() => navigate(ROUTES.MYCARDS)}
            >
              My Cards
            </Button>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default FooterComponent;
