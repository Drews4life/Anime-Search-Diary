import { 
    SAVE_SEARCHED_ANIME, 
    START_SEARCH_BY_TYPE_LODAING 
} from "../types";

const INITIAL_STATE = {
    filteredAnimes: [],
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_SEARCHED_ANIME:
            return {...state, filteredAnimes: action.payload, loading: false}
        case START_SEARCH_BY_TYPE_LODAING:
            return {...state, loading: true}
        default:
            return {...state, loading: false};
    }
}