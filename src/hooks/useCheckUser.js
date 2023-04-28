import axios from "axios";

const useCheckUserInfo = (setInputState) => {
    const getUserInfo = async () => {
        try {
            const response = await axios.get("/users/userInfo");
            const data = response.data;
            setInputState(data)
            console.log(data);
        }
        catch (err) {
            console.log("useUserInfoErr", err);
        }
    }
    return getUserInfo;
}

export default useCheckUserInfo;