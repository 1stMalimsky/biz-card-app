import { useEffect } from "react";
import axios from "axios";


const useLikedStatuesCheckHomePage = (userId, cardsArr, setLikedState, likeClicked) => {

    useEffect(() => {
        if (userId == null) {
            return;
        }
        const likedCards = cardsArr.filter((card) =>
            card.likes.includes(userId)
        );
        setLikedState(likedCards);
    }, [userId, likeClicked]);
}

export default useLikedStatuesCheckHomePage;