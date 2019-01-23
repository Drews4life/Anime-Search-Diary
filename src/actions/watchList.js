import { 
    ADD_EPISODES_SEEN, 
    SUBTRACT_EPISODES_SEEN,
    UNFINISH_EP,
    FINISH_EP 
} from "../types";


export const addEpisodeSeen = (id, type) => ({type: ADD_EPISODES_SEEN, payload: {id, type}})
export const substractEpisodesSeen = (id, type) => ({type: SUBTRACT_EPISODES_SEEN, payload: {id, type}})
export const finishedEpisode = id => ({type: FINISH_EP, payload: id})
export const unfinishedEpisode = id => ({type: UNFINISH_EP, payload: id})