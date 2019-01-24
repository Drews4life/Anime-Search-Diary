import { SEARCH_ANIME_BY_TYPE } from '../types'

export const searchBy = (query, type) => ({type: SEARCH_ANIME_BY_TYPE, payload: {query, type}})