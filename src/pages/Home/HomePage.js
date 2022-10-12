import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { actions, useStore } from '~/store';

import LayoutDefault from '~/layouts/LayoutDefault';
import Loading from '~/components/Loading';
import SearchField from '~/components/SearchField';
import { IconCharacterBookClosedFill, IconPaperplaneFill, IconPlus, IconPlusCircle, IconSearch } from '~/components/Icons';

import Thread from './components/Thread';
import SegmentedPicker from './components/SegmentedPicker';

function HomePage() {
    const { state, dispatch } = useStore();
    const { dictionary, saved, search, isLoading, isSelected } = state;

    const [searchView, setSearchView] = useState(search)
    const [dictionaryView, setDictionaryView] = useState(dictionary)

    useEffect(() => {
        isSelected ? setDictionaryView(dictionary) : setDictionaryView(saved)
    }, [isSelected, dictionary, saved])

    useEffect(() => {
        setSearchView(search)
    }, [search])

    const addLinkHandler = () => {
        dispatch(actions.setEdit({ status: false, data: {} }))
    }

    return (
        <LayoutDefault>
            <div className="flex justify-between items-end h-20">
                <div className='flex gap-2 items-center text-[#333]' >
                    <IconCharacterBookClosedFill className="w-5 h-5" />
                    <h1 className="font-display text-2xl font-bold capitalize">My dictionary</h1>
                </div>

                <Link
                    className="bg-[#767680]/[12%] rounded-xl px-2 py-1"
                    to="./add"
                    onClick={addLinkHandler}
                >
                    <IconPlus className="h-6 w-6 text-primary" />
                </Link>
            </div>

            <SearchField />

            <SegmentedPicker />

            <div className="w-full h-full rounded-lg overflow-x-hidden overflow-y-auto relative">
                {isLoading && <Loading />}

                {!dictionaryView.data.length && !isLoading && (
                    <div className="flex flex-col items-center justify-center gap-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <IconPaperplaneFill className="h-20 w-20 text-[#767680]/[12%]" />

                        <div className='text-[#3c3c43]/60 text-sm'>
                            {dictionaryView.status && isSelected && (
                                <p className="text-center whitespace-nowrap">Không tìm thấy "{searchView}"<br />trong My Dictionary!</p>
                            )}

                            {!dictionaryView.status && !isSelected && (
                                <div className='flex justify-center items-center gap-1 whitespace-nowrap'>
                                    <div className="w-2 h-2 rounded-full bg-gray-400/60"></div>
                                    <p>Lưu từ điển!</p>
                                </div>
                            )}

                            {!dictionaryView.status && isSelected && (
                                <>
                                    <p className="flex justify-center items-center gap-1 whitespace-nowrap">
                                        <span><IconSearch className="w-3 h-3" /></span>
                                        <span>Tìm!</span>
                                    </p>
                                    <p className='flex justify-center items-center gap-1 whitespace-nowrap'>
                                        <span><IconPlusCircle className="w-3 h-3" /></span>
                                        <span>Tạo từ điển!</span>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {dictionaryView.status && !!dictionaryView.data.length && !isLoading && (
                    <div className="w-full flex flex-col gap-2">
                        {dictionaryView.data.map((word) => (
                            <Thread key={word.id} word={word} />
                        ))}
                    </div>
                )}
            </div>
        </LayoutDefault>
    );
}

export default HomePage;
