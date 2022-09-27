import { Link } from 'react-router-dom';

import { useStore, actions } from '~/store';
import { convertPartofSpeech } from '~/helpers';

import icons from '~/assets/icons';

function Thread({ word }) {
    const { dispatch } = useStore();

    const handleAddBookmark = (id) => {
        dispatch(actions.addBookmark(id));
    };

    return (
        <div className="flex bg-[#757580]/[.06] hover:bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            <button
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-gray-300/70"
                onClick={() => handleAddBookmark(word.id)}
            >
                <div className={`${word.bookmark? "bg-primary": "bg-gray-400/60" } w-3 h-3 rounded-full`}></div>
            </button>

            <Link
                className="w-full py-1 pr-2 border-b border-gray-300"
                to={'/detail#' + word.id}
            >
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-truncate-1">{word.word}</p>

                    <p className="flex items-center gap-2 text-gray-600">
                        <span>{word.createdAt.split(',')[1].trimStart()}</span>

                        <svg className="w-3 h-3">
                            <use href={icons + '#icon-chevron-right'}></use>
                        </svg>
                    </p>
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-truncate-1">{word.translation}</p>

                    <p className="flex items-center gap-2 text-gray-600">
                        <span>{convertPartofSpeech(word.partOfSpeech)}</span>

                        <svg className="w-3 h-3">
                            <use href={icons + '#icon-type'}></use>
                        </svg>
                    </p>
                </div>

                <p className="text-gray-600 text-truncate-2">
                    {word.addTranslation}
                </p>
            </Link>
        </div>
    );
}

export default Thread;
