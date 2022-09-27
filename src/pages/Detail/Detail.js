import { useCallback, useEffect } from 'react';

import { useStore, actions } from '~/store';
import { convertPartofSpeech, isEmpty, AJAX } from '~/helpers';
import { API_URL } from '~/configs';

import LayoutDefault from '~/layouts/LayoutDefault';
import SearchField from '~/layouts/components/SearchField';

import TopNavigation from './components/TopNavigation';
import TableRow from './components/TableRow';

import icons from '~/assets/icons';

function Detail() {
    const { state, dispatch } = useStore();
    const { detailWord, dictionary } = state;

    const loadIdDictionary = useCallback(async (id) => {
        try {
            if (!id) return;
            const res = await AJAX(`${API_URL}?id=${id}`);

            dispatch(actions.setDetailWord(res.words));
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        const id = window.location.hash.slice(1);

        dispatch(actions.getSearch(''));

        if (dictionary.length) {
            dispatch(actions.getDetailWord(id));
        } else {
            loadIdDictionary(id);
        }
    }, []);

    return (
        <LayoutDefault>
            {!isEmpty(detailWord) && (
                <>
                    <TopNavigation title={detailWord.word} />
                    
                    <SearchField />

                    <div className="w-full h-full rounded-lg overflow-x-hidden overflow-y-auto bg-[#767680]/[.12]">
                        <div className="w-full flex flex-col gap-2 p-3 text-justify">
                            <p className="font-semibold">{detailWord.word}</p>

                            <p className="italic text-sm">
                                {convertPartofSpeech(detailWord.partOfSpeech)}
                            </p>

                            <p className="">{detailWord.translation}</p>

                            <div className="flex flex-col gap-3">
                                {detailWord.addTranslation
                                    .split('@enter')
                                    .map((trans, index) => (
                                        <p key={index} className="">
                                            {trans}
                                        </p>
                                    ))}
                            </div>

                            <p className="font-semibold flex gap-3 text-primary before:contents-[''] before:block before:w-[2px] before:h-6 before:bg-primary">
                                Ví dụ:
                            </p>

                            <div className="flex flex-col gap-3">
                                {detailWord.example
                                    .split('@enter')
                                    .map((examp, index) => {
                                        const exampArr = examp.split('@split');

                                        return (
                                            <p key={index}>
                                                <strong>{exampArr[0]}</strong>
                                                {exampArr[1]}
                                            </p>
                                        );
                                    })}
                            </div>

                            <div className="flex flex-col items-end gap-3 text-sm italic">
                                <p className="flex gap-2 items-center">
                                    {detailWord.createdAt
                                        .split(',')[1]
                                        .trimStart()}

                                    <svg className="w-3 h-3">
                                        <use
                                            href={icons + '#icon-created-at'}
                                        ></use>
                                    </svg>
                                </p>

                                {detailWord.updatedAt && (
                                    <p className="flex gap-2 items-center">
                                        {detailWord.updatedAt
                                            .split(',')[1]
                                            .trimStart()}

                                        <svg className="w-3 h-3">
                                            <use
                                                href={
                                                    icons + '#icon-updated-at'
                                                }
                                            ></use>
                                        </svg>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <TableRow />
                </>
            )}
        </LayoutDefault>
    );
}

export default Detail;
