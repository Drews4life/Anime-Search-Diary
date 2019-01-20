import { 
    FETCH_TOP_ANIME, 
    FETCH_FAVORITE, 
    SAVE_TO_FAVORITE, 
    DELETE_FROM_FAVORITES, 
    FETCH_ADDITIONAL_PAGE
} from "../types";

export const fetchTopAnime = param => ({type: FETCH_TOP_ANIME, payload: param})
export const fetchFavorite = () => ({type: FETCH_FAVORITE})
export const saveToFavorite = (item) => ({type: SAVE_TO_FAVORITE, payload: item})
export const deleteFromFavorites = id => ({type: DELETE_FROM_FAVORITES, payload: id})
export const getAdditionalPage = (page, param) => ({type: FETCH_ADDITIONAL_PAGE, payload: {param, page}})