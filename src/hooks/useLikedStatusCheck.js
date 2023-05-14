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
                console.log("userCards1", userCards[0]);
                if (userCards.length === 0) {
                    setNoCards(true)
                    console.log("noCards set TRUE");
                }
                if (userCards.length > 0) {
                    setNoCards(false)
                    console.log("noCards set FALSE");
                }
                setLikedState(likedCards);
                setCardState(userCards);
                console.log("userCards2", userCards);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [userId, likeClicked,]);
}

export default useLikedStatuesCheck;