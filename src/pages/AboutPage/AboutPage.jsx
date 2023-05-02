import { Box, Divider, Grid, Typography } from "@mui/material";
import "./AboutPage.css";
import { Fragment } from "react";
import CardExampleComponent from "../../components/CardExampleComponent";
import marioCardTemplate from "../../marioCardTemplate.png";

const AboutPage = () => {
  return (
    <Box>
      <Fragment>
        <Typography variant="h2">About Page</Typography>
        <Typography variant="h6">
          Learn all about our website and it's features
        </Typography>
        <Divider />
      </Fragment>
      <Box className="aboutPageBox" sx={{ display: "flex" }}>
        <Box>
          <Grid container className="gridText" sx={{ mt: 2 }}>
            <Grid
              item
              sm={12}
              md={11}
              sx={{ backgroundColor: "rgba(196,196,196,0.3)" }}
            >
              <Typography variant="p1" component="p" sx={{ my: 2, px: 2 }}>
                Are you looking for a website that showcases business cards from
                various industries? Look no further than our website! Our site
                features a vast collection of business cards from companies
                across the globe. Whether you're searching for inspiration or
                just want to see what's out there, you're sure to find something
                that catches your eye. <br />
              </Typography>
            </Grid>
            <Grid
              item
              sm={12}
              md={11}
              sx={{ backgroundColor: "rgba(196,196,196,0.1)" }}
            >
              <Typography variant="p1" component="p" sx={{ my: 2, px: 2 }}>
                Each business card on our website features a clean and modern
                layout. The front of the card includes a photo, the business's
                title, phone number, and a like button. Clicking on the card
                will take you to a full description of the business, including
                more information about their products or services.
                <br />
              </Typography>
            </Grid>
            <Grid
              item
              sm={12}
              md={11}
              sx={{ backgroundColor: "rgba(196,196,196,0.3)" }}
            >
              <Typography variant="p1" component="p" sx={{ my: 2, px: 2 }}>
                If you register with our website, you'll gain access to even
                more features. Registered users can mark the business cards they
                like and save them to their favorite page for easy access later
                on. Additionally, if you sign up as a business account user,
                you'll be able to add your own cards to our collection. Business
                users have full control over their cards and can create, edit,
                update, and delete them as needed.
                <br />
              </Typography>
            </Grid>
            <Grid
              item
              sm={12}
              md={11}
              sx={{ backgroundColor: "rgba(196,196,196,0.1)" }}
            >
              <Typography variant="p1" component="p" sx={{ my: 2, px: 2 }}>
                Ready to take your business card game to the next level?
                Register with our website today to gain access to all of our
                features. Whether you're a small business owner looking to
                showcase your work or just someone who appreciates good design,
                you're sure to find something you love on our site. So why wait?
                Sign up now and start exploring our collection of business cards
                today!
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={6}>
              <CardExampleComponent img={marioCardTemplate} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutPage;
