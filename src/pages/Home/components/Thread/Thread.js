import { Link } from 'react-router-dom';
import moment from 'moment';

import { useStore, actions } from '~/store';
import { convertCapitalizeFirstLetter } from '~/utils';

import icons from '~/assets/icons';

function Thread({ word }) {
    const { state, dispatch } = useStore();
    const { saved } = state;

    const addSavedHandler = (word) => {
        word.saved = !word.saved;

        let update = []

        if (word.saved)
            update = [word, ...saved.data];
        else
            update = saved.data.filter(w => w.id !== word.id)

        dispatch(actions.setSaved({ status: !!update.length, data: update }));
    };

    const setDetailHandler = (word) => {
        dispatch(actions.setDetail({ status: true, data: word }))
    }

    return (
        <div className="flex bg-[#757580]/[.12] hover:bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative">
            <button
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-gray-300/70 absolute top-0 left-0"
                onClick={() => addSavedHandler(word)}
            >
                <div className={`w-3 h-3 rounded-full ${word.saved ? 'bg-primary' : 'bg-gray-400/60'}`}></div>
            </button>

            <Link
                className="w-full py-1 pr-2 pl-8" to={'/detail/' + word.id}
                onClick={() => setDetailHandler(word)}>
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-truncate-1 first-letter:uppercase">{convertCapitalizeFirstLetter(word.word)}</p>

                    <p className="flex items-center gap-1 text-[#3c3c43]/60 text-xs italic flex-shrink-0">
                        <span>{moment(word.createdAt).format('DD/MM/YYYY')}</span>

                        <svg className="w-3 h-3">
                            <use href={icons + '#icon-chevron-right'}></use>
                        </svg>
                    </p>
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-truncate-1">{convertCapitalizeFirstLetter(word.translation)}</p>

                    <p className="flex items-center gap-1 text-[#3c3c43]/60 text-xs italic flex-shrink-0">
                        <span>{word.part_of_speech}</span>

                        <svg className="w-3 h-3">
                            <use href={icons + '#icon-type'}></use>
                        </svg>
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default Thread;
