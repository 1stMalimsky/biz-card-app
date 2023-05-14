import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, CircularProgress, Divider, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import MyCardComponent from "../components/MyCardComponent";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import useLikedStatuesCheck from "../hooks/useLikedStatusCheck";

const MyCards = () => {
  const [myCards, setmyCards] = useState(null);
  const [likedCards, setLikedCards] = useState([]);
  const [likeClicked, setLikeClicked] = useState(false);
  const [noCards, setNoCards] = useState(null);
  const userPayload = useSelector((bigState) => bigState.authSlice.payload);
  const navigate = useNavigate();

  useLikedStatuesCheck(
    userPayload ? userPayload._id : null,
    setmyCards,
    setLikedCards,
    likeClicked,
    setNoCards
  );

  if (myCards == null) {
    return <CircularProgress />;
  }

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
      <Typography variant="h2" component="h1">
        My Cards
      </Typography>
      <Typography variant="h6">
        On this page you'll find all the business cards you've added. In
        addition, you can also add new cards as well.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => {
          navigate("/addnew");
        }}
      >
        <Typography varient="h4">ADD NEW CARD</Typography>
      </Button>
      <Grid container sx={{ justifyContent: "center" }}>
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
                currentUser={userPayload._id}
                isLiked={isLiked}
              />
            </Grid>
          );
        })}
        <Grid item xs={12}>
          {noCards === true ? (
            <Typography varient="h4">
              you don't have any cards of your own yet. Click the button to add
              a new card
            </Typography>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyCards;
