import {
    SET_DICTIONARY,
    SET_SAVED,
    SET_DETAIL,
    SET_ISLOADING,
    SET_ISSELECTED,
    SET_SEARCH,
    SET_EDIT,
} from './constants';

const initialState = {
    dictionary: { status: false, data: [] },
    saved: JSON.parse(localStorage.getItem('saved')) || { status: false, data: [] },
    detail: { status: false, data: {} },
    edit: { status: false, data: {} },
    search: '',
    isLoading: false,
    isSelected: true,
};

function reducer(state, action) {

    switch (action.type) {
        case SET_DICTIONARY:
            return {
                ...state,
                dictionary: action.payload,
            };

        case SET_SAVED: {
            localStorage.setItem('saved', JSON.stringify(action.payload))

            return {
                ...state,
                saved: action.payload,
            };
        }

        case SET_DETAIL:
            return {
                ...state,
                detail: action.payload,
            };

        case SET_EDIT:
            return {
                ...state,
                edit: action.payload,
            };

        case SET_SEARCH:
            return {
                ...state,
                search: action.payload,
            };

        case SET_ISLOADING:
            return {
                ...state,
                isLoading: action.payload,
            };

        case SET_ISSELECTED:
            return {
                ...state,
                isSelected: action.payload,
            };

        default:
            throw Error('💥💥💥 Invalid action!');
    }
}

export { initialState };
export default reducer;
