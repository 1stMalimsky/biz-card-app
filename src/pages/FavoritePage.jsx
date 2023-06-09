import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Divider, Grid, Typography } from "@mui/material";
import FavCardComponent from "../components/FavCardComponent";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FavoritePage = () => {
  const [userLikedCards, setUserLikedCards] = useState([]);
  const userPayload = useSelector((bigState) => bigState.authSlice.payload);
  const userId = userPayload._id;
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/cards/cards");
        const cardsArr = response.data;
        const favCards = cardsArr.filter((card) => card.likes.includes(userId));
        setUserLikedCards(favCards);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [userId, setUserLikedCards]);

  const handleLikeBtn = async (id) => {
    try {
      await axios.patch("/cards/card-like/" + id);
      const updatedCardsArr = userLikedCards.filter((card) => card._id !== id);
      setUserLikedCards(updatedCardsArr);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleDeleteBtn = async (id) => {
    try {
      await axios.delete("/cards/" + id);
      setUserLikedCards((newCardsArr) =>
        newCardsArr.filter((item) => item._id != id)
      );
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  };

  const handleEditBtn = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleCallBtnClick = () => {
    toast.success("The call function is coming soon!");
  };
  const handleMediaClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <Box>
      <Typography variant="h2" component="h1">
        Favorite Cards
      </Typography>
      <Typography variant="h6">
        All the cards you've liked can be found here. You can also unlike them
        by clicking the outlined heart icon.
      </Typography>
      <Divider />
      <Grid container>
        {userLikedCards.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id + Date.now()}>
            <FavCardComponent
              id={item._id}
              user_id={item.user_id}
              title={item.title}
              subTitle={item.subTitle}
              phone={item.phone}
              address={item.street + " " + item.houseNumber + " " + item.city}
              bizNumber={item.bizNumber}
              img={item.image ? item.image.url : ""}
              onDelete={handleDeleteBtn}
              onEdit={handleEditBtn}
              onCallClick={handleCallBtnClick}
              onLikeClick={handleLikeBtn}
              bizControls={userPayload.biz}
              adminControls={userPayload.isAdmin}
              currentUser={userId}
              onMediaClick={handleMediaClick}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FavoritePage;
