import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import MyCardComponent from "../components/MyCardComponent";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyCards = () => {
  const [myCards, setmyCards] = useState([]);
  const [likedCards, setLikedCards] = useState([]);
  const userPayload = useSelector((bigState) => bigState.authSlice.payload);
  const userId = userPayload._id;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/cards/cards");
        const cardsArr = response.data;
        const likedCards = cardsArr.filter((card) =>
          card.likes.includes(userId)
        );
        const userCards = cardsArr.filter((card) =>
          card.user_id.includes(userId)
        );
        setmyCards(userCards);
        setLikedCards(likedCards);
        console.log("liked cards", likedCards);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [userId]);

  const handleLikeBtn = async (id) => {
    try {
      await axios.patch("/cards/card-like/" + id);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleDeleteBtn = async (id) => {
    try {
      await axios.delete("/cards/" + id);
      setmyCards((newCardsArr) => newCardsArr.filter((item) => item._id != id));
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

  return (
    <Box>
      <h1>My Cards</h1>
      <Grid container>
        {myCards.map((item) => {
          const isLiked = likedCards.some((card) => card._id === item._id);
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id + Date.now()}>
              <MyCardComponent
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
                Liked={isLiked}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MyCards;
