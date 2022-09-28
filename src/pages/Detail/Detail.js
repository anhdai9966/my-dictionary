import { useEffect } from 'react';

import { useStore, actions } from '~/store';
import { convertPartofSpeech, isEmpty } from '~/utils';

import LayoutDefault from '~/layouts/LayoutDefault';
import SearchField from '~/layouts/components/SearchField';

import TopNavigation from './components/TopNavigation';
import TableRow from './components/TableRow';
import { useParams } from 'react-router-dom';
import Loading from '~/components/Loading';
import { loadDictionary } from '~/services';
import Examples from './components/Examples';
import CreatedAt from './components/CreatedAt';
import UpdatedAt from './components/UpdatedAt';
import AddTranslation from './components/AddTranslation';
import { useToggle } from '~/hooks';
import ErrorPage from '../ErrorPage';

function Detail() {
    const { state, dispatch } = useStore();
    const { detail } = state;
    
    const [error, handleError] = useToggle();

    const { id } = useParams();

    useEffect(() => {
        (async () => {
            try {
                if (!id) return;
                dispatch(actions.setDetailWord({}));

                const res = await loadDictionary(`id=${id}`);
                
                if (!res.dictionary) handleError();

                dispatch(actions.setDetailWord(res.words));
            } catch (error) {
                console.log(error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <LayoutDefault>
            {isEmpty(detail) && !error && <Loading />}
            
            {error && <ErrorPage />}
            
            {!isEmpty(detail) && !error && (
                <>
                    <TopNavigation title={detail.word} />

                    <SearchField />

                    <div className="w-full h-full rounded-lg overflow-x-hidden overflow-y-auto bg-[#767680]/[.12]">
                        <div className="w-full flex flex-col gap-2 p-3 text-justify">
                            <p className="font-semibold">{detail.word}</p>

                            <p className="italic text-sm">
                                {convertPartofSpeech(detail.partOfSpeech)}
                            </p>

                            <p className="">{detail.translation}</p>

                            {!!detail.addTranslation && (
                                <AddTranslation
                                    addTranslation={detail.addTranslation}
                                />
                            )}

                            {!!detail.example && (
                                <Examples example={detail.example} />
                            )}

                            <div className="flex flex-col items-end gap-3 text-sm italic">
                                <CreatedAt createdAt={detail.createdAt} />

                                {!!detail.updatedAt && (
                                    <UpdatedAt createdAt={detail.updatedAt} />
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
