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

const initState = {
    search: '',
    dictionary: [],
    detail: {},
    loading: false,
    addDictionary: {},
    editDictionary: {},
};

function reducer(state, action) {
    switch (action.type) {
        case GET_SEARCH:
            return {
                ...state,
                search: action.payload,
            };
        case SEARCH_DICTIONARY: {
            console.log('🚀 action.payload: ', action.payload);
            return {
                ...state,
                dictionary: action.payload,
            };
        }
        case ADD_BOOKMARK: {
            const id = action.payload;
            const update = state.dictionary.map((word) => {
                if (word.id === id) {
                    word.bookmark = !word.bookmark;
                }
                return word;
            });
            return {
                ...state,
                dictionary: update,
            };
        }
        case DETAIL_WORD: {
            const id = action.payload;
            const result = state.dictionary.find((word) => word.id === id);
            return {
                ...state,
                detail: result,
            };
        }
        case SET_DETAIL_WORD: {
            return {
                ...state,
                detail: action.payload,
            };
        }
        case TOGGLE_LOADING: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case ADD_DICTIONARY: {
            return {
                ...state,
                addDictionary: action.payload,
            };
        }
        case EDIT_DICTIONARY: {
            return {
                ...state,
                editDictionary: action.payload
            };
        }
        default:
            throw Error('💥💥💥 Invalid action!');
    }
}

export { initState };
export default reducer;
