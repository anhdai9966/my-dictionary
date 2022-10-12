import { useRef } from "react"
import { ref, query, orderByChild, startAt, endAt, get } from 'firebase/database';
import { isEmpty } from "@firebase/util";

import { database } from '~/utils/firebase';
import { actions, useStore } from "~/store";

import { IconDeleteLeftFill, IconSearch } from "~/components/Icons"
import { useNavigate } from "react-router-dom";

function SearchField() {
    const { state, dispatch } = useStore()
    const { search, saved } = state;

    const searchInputRef = useRef()
    const navigate = useNavigate();

    const searchInputChangeHandler = () => {
        dispatch(actions.setSearch(searchInputRef.current.value))
    }

    const searchInputFocusHandler = () => {
        if (!searchInputRef.current.value) return

        searchInputRef.current.select();
        searchInputRef.current.setSelectionRange(0, 99999);
    };

    const deleteBtnHandler = () => {
        dispatch(actions.setSearch(''))
        searchInputRef.current.focus()
    }

    const formSubmissionHandler = async (event) => {
        event.preventDefault()
        // submit
        searchInputRef.current.blur()

        const searchValue = searchInputRef.current.value.toLowerCase().trim()

        if (!searchValue) return;

        navigate('/')

        dispatch(actions.setIsSelected(true))
        dispatch(actions.setDictionary({ status: false, data: [] }))
        dispatch(actions.setIsLoading(true))

        const queryText = encodeURIComponent(searchValue)

        const queryDictionary = query(
            ref(database, 'dictionary/'),
            orderByChild('word'),
            startAt(queryText),
            endAt(queryText + '\uf8ff')
        );

        const snapshot = await get(queryDictionary)

        const words = Object.values(snapshot.val() || []).map(word => {
            if (saved.data.some(w => w.id === word.id))
                word.saved = true
            else
                word.saved = false

            return word
        })
        dispatch(actions.setDictionary({ status: !isEmpty(snapshot), data: words }))
        dispatch(actions.setIsLoading(false))
    }

    return (
        <div className="h-9 w-full relative bg-[#767680]/[12%] rounded-[10px] overflow-hidden flex-shrink-0">
            <form
                className="w-full h-full"
                onSubmit={formSubmissionHandler}>

                <input
                    ref={searchInputRef}
                    type='text'
                    placeholder="Search"
                    className="outline-none w-full h-full px-[30px] bg-transparent"
                    value={search}
                    onChange={searchInputChangeHandler}
                    onFocus={searchInputFocusHandler} />
            </form>

            <div className="absolute top-1/2 -translate-y-1/2 left-2">
                <IconSearch className="w-4 h-4 text-[#3C3C43]/60" />
            </div>

            {!!search && (
                <button
                    className="absolute top-1/2 -translate-y-1/2 right-2"
                    onClick={deleteBtnHandler}>
                    <IconDeleteLeftFill className="w-5 h-5 text-[#3C3C43]/60" />
                </button>
            )}
        </div>
    )
}

export default SearchField