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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CallIcon from "@mui/icons-material/Call";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MyCardComponent = ({
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
  onCallClick,
  currentUser,
  onLikeClick,
  isLiked,
  onMediaClick,
}) => {
  const handleDeleteBtnClick = () => {
    onDelete(id);
  };
  const handleEditBtnClick = () => {
    onEdit(id);
  };
  const handleCallBtnClick = () => {
    onCallClick();
  };

  const handleLikeBtnClick = async () => {
    onLikeClick(id);
  };

  const handleMediaClick = () => {
    onMediaClick(id);
  };

  return (
    <Card square raised sx={{ width: 275, height: 500, mt: 2 }}>
      <CardActionArea onClick={handleMediaClick}>
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
        <IconButton onClick={handleEditBtnClick}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDeleteBtnClick}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={handleLikeBtnClick}>
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

MyCardComponent.propTypes = {
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
  user_id: PropTypes.string,
  isLiked: PropTypes.bool,
  onLikeClick: PropTypes.func,
};

export default MyCardComponent;
