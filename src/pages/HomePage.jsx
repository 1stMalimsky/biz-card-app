import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const [likeClicked, setLikeClicked] = useState(false);
  const [likedCardsArr, setLikedCardsArr] = useState([]);

  const navigate = useNavigate();
  let qparams = useQueryParams();
  let payload = useSelector((bigPie) => bigPie.authSlice.payload);
  let userId = useSelector((bigPie) => bigPie.authSlice.userId);

  useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        setCardsArr(data);
        filterFunc(data);
        const likedCardsFromData = data.reduce((acc, curr) => {
          const { _id, likes } = curr;
          likes.forEach((userId) => {
            const card = acc.find((card) => card.cardId === _id);
            if (card) {
              card.userIds.push(userId);
            } else {
              acc.push({ cardId: _id, userIds: [userId] });
            }
          });
          return acc;
        }, []);
        setLikedCardsArr(likedCardsFromData);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops! Couldn't load your cards. Please try again");
      });
  }, [likeClicked]);

  const filterFunc = (data) => {
    if (!originalCardsArr && !data) {
      return;
    }
    let arrToSearch = originalCardsArr || data;
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originalCardsArr && data) {
      setOriginalCardsArr(data);
      let searchResult = arrToSearch.filter(
        (card) =>
          card.title.startsWith(filter) || card.bizNumber.startsWith(filter)
      );
      setCardsArr(searchResult);
      return;
    }
    if (originalCardsArr) {
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      let searchResult = newOriginalCardsArr.filter(
        (card) =>
          card.title.startsWith(filter) || card.bizNumber.startsWith(filter)
      );
      setCardsArr(searchResult);
    }
  };

  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);

  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      await axios.delete("/cards/" + id);
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id != id)
      );
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  };
  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleLikeBtn = async (id) => {
    try {
      await axios.patch("/cards/card-like/" + id);
      setLikeClicked(!likeClicked);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleCallBtnClick = () => {
    toast.success("The call function is coming soon!");
  };
  const handleMediaClick = (id) => {
    navigate(`/detail/${id}`);
  };

  if (!cardsArr) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Grid container>
        {cardsArr.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id + Date.now()}>
            <CardComponent
              id={item._id}
              user_id={item.user_id}
              title={item.title}
              subTitle={item.subTitle}
              phone={item.phone}
              address={item.street + " " + item.houseNumber + " " + item.city}
              bizNumber={item.bizNumber}
              img={item.image ? item.image.url : ""}
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
              bizControls={
                payload && payload.biz && payload._id == item.user_id
              }
              adminControls={payload && payload.isAdmin}
              onCallClick={handleCallBtnClick}
              currentUser={payload && userId}
              onLikeClick={handleLikeBtn}
              isLiked={
                likedCardsArr.find(
                  (card) =>
                    card.cardId == item._id && card.userIds.includes(userId)
                )
                  ? true
                  : false
              }
              onMediaClick={handleMediaClick}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
