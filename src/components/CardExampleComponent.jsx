import { Fragment, useEffect, useState } from "react";
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
import Modal from "@mui/material/Modal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CallIcon from "@mui/icons-material/Call";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FavoriteBorder, FavoriteBorderOutlined } from "@mui/icons-material";

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
  const handleDeleteBtnClick = () => {};
  const handleEditBtnClick = () => {};

  const handleCallBtnClick = () => {};

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
        <IconButton onClick={handleCallBtnClick}>
          <CallIcon />
        </IconButton>
        <IconButton onClick={handleEditBtnClick}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDeleteBtnClick}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={handleLikeBtnClick}>
          {isLikedStatus ? <FavoriteIcon /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

/* CardComponent.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  bizNumber: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,
  onCallClick: PropTypes.func,
  bizControls: PropTypes.bool,
  adminControls: PropTypes.bool,
  currentUser: PropTypes.string,
};

CardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "",
  canEdit: false,
  bizControls: false,
  adminControls: false,
};
 */
export default CardExampleComponent;
