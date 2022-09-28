import { useRef } from 'react';

import { useStore, actions } from '~/store';

import icons from '~/assets/icons';
import { loadDictionary } from '~/services';
import { useNavigate } from 'react-router-dom';

function SearchField() {
    const { state, dispatch } = useStore();
    const { search } = state;

    const searchInputRef = useRef();
    const iconSearchRef = useRef();

    const navigate = useNavigate()

    const handleFocus = (e) => {
        if (e.target.value !== '') {
            searchInputRef.current.select();
            searchInputRef.current.setSelectionRange(0, 99999);
        }
        searchInputRef.current.style.paddingLeft = '8px';
        iconSearchRef.current.style.left = '-8px';
        iconSearchRef.current.style.opacity = '0';
    };

    const handleBlur = () => {
        if (search) return;
        searchInputRef.current.style.paddingLeft = '30px';
        iconSearchRef.current.style.left = '8px';
        iconSearchRef.current.style.opacity = '.6';
    };

    const handleClear = () => {
        dispatch(actions.getSearch(''));
        searchInputRef.current.focus();
    };

    const handleChange = (e) => {
        dispatch(actions.getSearch(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataArr = new FormData(e.target);
        const data = Object.fromEntries(dataArr);
        searchInputRef.current.blur();
        dispatch(actions.toggleLoading(true));
        dispatch(actions.searchDictionary([]));
        try {
            if (!data.search.trim()) return;

            navigate('/')

            const res = await loadDictionary(
                `word=${encodeURIComponent(data.search)}`
            );

            dispatch(actions.searchDictionary(res.words));
            dispatch(actions.toggleLoading(false));
        } catch (error) {
            dispatch(actions.toggleLoading(false));
            console.log(error);
        }
    };

    return (
        <div className="h-9 overflow-hidden relative flex-shrink-0 text-[#3c3c43]">
            <form className="w-full h-full" onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    placeholder="Search"
                    name="search"
                    className="w-full h-full rounded-lg px-8 outline-none bg-[#767680]/[.12] transition-[padding-left] ease-out"
                    value={search}
                    onChange={handleChange}
                    ref={searchInputRef}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </form>

            <svg
                className="opacity-60 w-4 h-4 absolute top-1/2 left-2 -translate-y-1/2 transition-all ease-out"
                ref={iconSearchRef}
            >
                <use href={icons + '#icon-search'}></use>
            </svg>

            {search && (
                <button
                    className="flex items-center absolute top-1/2 right-2 -translate-y-1/2 opacity-60"
                    onClick={handleClear}
                >
                    <svg className="w-4 h-4">
                        <use href={icons + '#icon-xmark-circle'}></use>
                    </svg>
                </button>
            )}
        </div>
    );
}

export default SearchField;
