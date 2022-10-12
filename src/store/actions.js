import {
    SET_DICTIONARY,
    SET_SAVED,
    SET_DETAIL,
    SET_EDIT,
    SET_SEARCH,
    SET_ISLOADING,
    SET_ISSELECTED,
} from './constants';

export const setDictionary = (payload) => ({
    type: SET_DICTIONARY,
    payload,
});

export const setSaved = (payload) => ({
    type: SET_SAVED,
    payload,
});

export const setDetail = (payload) => ({
    type: SET_DETAIL,
    payload,
});

export const setEdit = (payload) => ({
    type: SET_EDIT,
    payload,
});

export const setSearch = (payload) => ({
    type: SET_SEARCH,
    payload,
});

export const setIsLoading = (payload) => ({
    type: SET_ISLOADING,
    payload,
});

export const setIsSelected = (payload) => ({
    type: SET_ISSELECTED,
    payload,
});
