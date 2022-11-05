import axios from "axios";

const API_URL = "/api/user"

const getUserById = async (id) => {
    const response = await axios.get(API_URL + "/" + id)
    console.log(id)
    return response.data
}

const userService = {
    getUserById,
}

export default userService