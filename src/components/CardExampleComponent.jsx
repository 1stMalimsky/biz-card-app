import { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CallIcon from "@mui/icons-material/Call";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FavoriteBorder } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CardExampleComponent = ({ img }) => {
  const [isLikedStatus, setIsLiked] = useState(false);

  const handleLikeBtnClick = () => {
    setIsLiked(!isLikedStatus);
  };

  return (
    <Card rounded="true" raised sx={{ width: 275, height: 500, mt: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={img}
          sx={{ maxWidth: 275, maxheight: 150 }}
        />
      </CardActionArea>
      <CardHeader
        title={"BizCard Title Example"}
        subheader={"subTitle"}
      ></CardHeader>
      <Divider variant="middle" />
      <CardContent>
        <Typography>Phone: Your business phone #</Typography>
        <Typography>Address: Your business address</Typography>
        <Typography>
          Card Number: We provide you with a unique "BizNumber"
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <CallIcon />
        </IconButton>
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={handleLikeBtnClick}>
          {isLikedStatus ? <FavoriteIcon /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CardExampleComponent;
