import { useEffect } from "react";
import axios from "axios";

const useLikedStatuesCheck = (userId, setCardState, setLikedState, likeClicked) => {

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
                setCardState(userCards);
                setLikedState(likedCards);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [userId, likeClicked]);
}

export default useLikedStatuesCheck;