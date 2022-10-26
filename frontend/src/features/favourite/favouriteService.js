import axios from "axios";

const API_URL = 'api/user/favourite/'

const getFavourites = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

const isFavourite = async (recipeId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + recipeId, config)
    console.log(response.data.result)
    return {
        result: response.data.result
    }
}

const pushFavourite = async (recipeId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL + 'push', {favourites: recipeId}, config)
    return response.data
}

const pullFavourite = async (recipeId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL + 'pull', {favourites: recipeId}, config)
    return response.data
}

const favouriteService = {
    pushFavourite,
    pullFavourite,
    getFavourites,
    isFavourite,
}

export default favouriteService