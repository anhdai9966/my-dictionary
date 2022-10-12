import { useEffect } from 'react';

import { useStore, actions } from '~/store';

import LayoutDefault from '~/layouts/LayoutDefault';

import TopNavigation from './components/TopNavigation';
import TableRow from './components/TableRow';
import { useParams } from 'react-router-dom';
import CreatedAt from './components/CreatedAt';
import UpdatedAt from './components/UpdatedAt';
import ErrorPage from '../Error';
import SearchField from '~/components/SearchField';

import { database } from '~/utils/firebase';
import { child, get, ref } from 'firebase/database';
import { isEmpty } from '@firebase/util';
import { IconSpinner12 } from '~/components/Icons';

import ReactMarkdown from 'react-markdown'

function Detail() {
    const { state, dispatch } = useStore();
    const { detail, isLoading } = state;

    const { id } = useParams();

    useEffect(() => {
        if (!isEmpty(detail.data)) return;

        (async () => {
            try {
                if (!id) return;
                dispatch(actions.setIsLoading(true))
                dispatch(actions.setDetail({ status: false, data: {} }));

                const dbRef = ref(database);

                const snapshot = await get(child(dbRef, `dictionary/${id}`));

                if (!snapshot.exists()) throw new Error('No data available');

                const word = await snapshot.val();

                dispatch(actions.setDetail({ status: !isEmpty(word), data: word }));
            } catch (error) {
                console.log(error);
                dispatch(actions.setDetail({ status: false, data: {} }));
            }
            dispatch(actions.setIsLoading(false))
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <LayoutDefault>
            {isLoading && !detail.status && (
                <div className="inline-block absolute left-1/2 top-1/2 -translate-y-2/4 -translate-x-2/4">
                    <IconSpinner12 className="w-6 h-6 animate-spinner12" />
                </div>
            )}

            {!isLoading && !detail.status && <ErrorPage />}

            {detail.status && (
                <>
                    <TopNavigation word={detail.data} />

                    <SearchField />

                    <div className="w-full h-full rounded-lg overflow-x-hidden overflow-y-auto bg-[#767680]/[.12]">
                        <div className="w-full flex flex-col gap-2 p-3 text-justify">
                            <p className="font-semibold first-letter:uppercase">{detail.data.word}</p>

                            <p className="italic text-sm">
                                {detail.data.part_of_speech}
                            </p>

                            <p className="first-letter:uppercase">{detail.data.translation}</p>

                            <div className='font-semibold text-primary flex gap-2 items-center'><div className='h-2 w-2 rounded-md bg-primary'></div>Ghi chú:</div>
                            <ReactMarkdown className='[&_h1]:font-semibold [&_h1]:text-lg'>{detail.data.note}</ReactMarkdown>

                            <div className="flex flex-col items-end gap-1 text-sm italic">
                                <CreatedAt createdAt={detail.data.created_at} />

                                {!!detail.data.updated_at && (
                                    <UpdatedAt createdAt={detail.data.updated_at} />
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
