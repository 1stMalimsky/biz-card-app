import axios from "axios";

const useCheckCards = (setCardStateName) => {
    const getCards = async () => {
        try {
            const response = await axios.get("/cards/cards");
            const data = response.data;
            setCardStateName(data)
            console.log(data);
        }
        catch (err) {
            console.log("useCheckcardErr", err);
        }
    }
    return getCards
}

export default useCheckCards