import {
    GET_SEARCH,
    ADD_BOOKMARK,
    SEARCH_DICTIONARY,
    DETAIL_WORD,
    SET_DETAIL_WORD,
    TOGGLE_LOADING,
    ADD_DICTIONARY,
    EDIT_DICTIONARY,
} from './constants';

export const getSearch = (payload) => ({
    type: GET_SEARCH,
    payload,
});

export const addBookmark = (payload) => ({
    type: ADD_BOOKMARK,
    payload,
});

export const searchDictionary = (payload) => ({
    type: SEARCH_DICTIONARY,
    payload,
});

export const getDetailWord = (payload) => ({
    type: DETAIL_WORD,
    payload,
});

export const setDetailWord = (payload) => ({
    type: SET_DETAIL_WORD,
    payload,
});

export const toggleLoading = (payload) => ({
    type: TOGGLE_LOADING,
    payload,
});

export const addDictionary = (payload) => ({
    type: ADD_DICTIONARY,
    payload,
});
export const editDictionary = (payload) => ({
    type: EDIT_DICTIONARY,
    payload,
});
