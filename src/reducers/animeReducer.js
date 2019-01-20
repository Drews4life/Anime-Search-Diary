import { 
    GET_TOP_ANIME,
    STOP_LOADING_ANIMES,
    LOADING_ANIMES, 
    GET_FAVORITE,
    SAVE_TO_STORAGE,
    DELETE_FROM_STORAGE,
    GET_ADDITIONAL_PAGE
} from "../types";

const INITIAL_STATE = {
    animeTop: [],
    favorites: {},
    isLoading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TOP_ANIME:
        console.log(action.payload)
            return {...state, animeTop: action.payload, isLoading: false}
        case GET_FAVORITE: 
            return {...state, favorites: action.payload}
        case SAVE_TO_STORAGE:
            return {...state, favorites: {...state.favorites, [action.payload.id]: action.payload}}
        case DELETE_FROM_STORAGE:
            return {...state, favorites: action.payload}
        case GET_ADDITIONAL_PAGE:
            console.log('reducers data: ', [...state.animeTop, action.payload])
            return {...state, animeTop: [...state.animeTop, ...action.payload]}
        case LOADING_ANIMES: 
            return {...state, isLoading: true}
        default:
            return {...state, isLoading: false};
    }
}