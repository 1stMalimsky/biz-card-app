import axios from "axios";

const useCheckCards = async (setCardStateName) => {
    try {
        const response = await axios.get("/cards/cards");
        const cardsArr = response.data;
        setCardStateName(cardsArr)
    }
    catch (err) {
        console.log("useCheckcardErr", err);
    }
}

export default useCheckCards