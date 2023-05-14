import { useEffect } from "react";
import axios from "axios";


const useLikedStatuesCheck = (userId, setCardState, setLikedState, likeClicked, setNoCards) => {
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

                if (userCards.length === 0) {
                    setNoCards(true)
                }
                if (userCards.length > 0) {
                    setNoCards(false)
                }
                setLikedState(likedCards);
                setCardState(userCards);

            } catch (err) {
                console.log(err);
            }
        })();
    }, [userId, likeClicked,]);
}

export default useLikedStatuesCheck;