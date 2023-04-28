import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import MyCardComponent from "../components/MyCardComponent";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useLikedStatuesCheck from "../hooks/useLikedStatusCheck";
import AddIcon from "@mui/icons-material/Add";

const MyCards = () => {
  const [myCards, setmyCards] = useState([]);
  const [likedCards, setLikedCards] = useState([]);
  const [likeClicked, setLikeClicked] = useState(false);
  const userPayload = useSelector((bigState) => bigState.authSlice.payload);
  const userId = userPayload._id;
  const navigate = useNavigate();

  useLikedStatuesCheck(userId, setmyCards, setLikedCards, likeClicked);

  const handleLikeBtn = async (id) => {
    try {
      await axios.patch("/cards/card-like/" + id);
      setLikeClicked(!likeClicked);
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
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => {
          navigate("/addnew");
        }}
      >
        <Typography varient="h4">ADD NEW CARD</Typography>
      </Button>
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
                isLiked={isLiked}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MyCards;
