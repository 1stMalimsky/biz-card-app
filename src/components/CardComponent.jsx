import { Fragment } from "react";
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
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CardComponent = ({
  img,
  title,
  subTitle,
  phone,
  address,
  bizNumber,
  id,
  user_id,
  onDelete,
  onEdit,
  bizControls,
  adminControls,
  onCallClick,
  currentUser,
}) => {
  const handleDeleteBtnClick = () => {
    console.log("id", id);
    onDelete(id);
  };
  const handleEditBtnClick = () => {
    onEdit(id);
  };

  const handleCallBtnClick = () => {
    onCallClick();
  };
  return (
    <Card square raised sx={{ width: 275, mt: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={img}
          sx={{ maxWidth: 275, maxheight: 150 }}
        />
      </CardActionArea>
      <CardHeader title={title} subheader={subTitle}></CardHeader>
      <Divider variant="middle" />
      <CardContent>
        <Typography>Phone: {phone}</Typography>
        <Typography>Address: {address}</Typography>
        <Typography>Card Number: {bizNumber}</Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={handleCallBtnClick}>
          <CallIcon />
        </IconButton>
        {adminControls ? (
          <Fragment>
            <IconButton
              onClick={handleEditBtnClick}
              sx={{ display: currentUser == user_id ? "block" : "none" }}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDeleteBtnClick}>
              <DeleteIcon />
            </IconButton>
          </Fragment>
        ) : bizControls ? (
          <Fragment>
            <IconButton onClick={handleEditBtnClick}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDeleteBtnClick}>
              <DeleteIcon />
            </IconButton>
          </Fragment>
        ) : (
          ""
        )}
      </CardActions>
    </Card>
  );
};

CardComponent.propTypes = {
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
};

CardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "",
  canEdit: false,
};

export default CardComponent;
