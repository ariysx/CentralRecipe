import axios from "axios";

const API_URL = "/api/upload/"

const upload = (async(data, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        },
    }
    const response = await axios.post(API_URL + '', data, config)
    return response.data
})

const get = ( async (path) => {
    const response = await axios.get(API_URL + path)
    return response.data
})

const multerService = {
    upload,
    get
}

export default multerService