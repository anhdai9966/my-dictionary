import { Link } from 'react-router-dom';

import { IconChevronBackward, IconPlus } from '~/components/Icons';
import { actions, useStore } from '~/store';
import { convertCapitalizeFirstLetter } from '~/utils';

function TopNavigation({ word }) {
    const { dispatch } = useStore();

    // const rightBtnHandler = () => {
    //     dispatch(actions.setEdit({ status: true, data: word }))
    // }

    const addLinkHandler = () => {
        dispatch(actions.setEdit({ status: false, data: {} }))
    }

    return (
        <div className="h-20 flex items-center justify-center relative border-b px-20">
            <div className="absolute top-1/2 left-0 -translate-y-1/2">
                <Link
                    className="rounded-xl font-semibold flex items-center gap-1 text-gray-500"
                    to="/"
                >
                    <IconChevronBackward className="w-4 h-4" />
                    <span className='font-semibold'>Back</span>
                </Link>
            </div>

            <p className="text-truncate-1 text-center font-semibold text-[17px] first-letter:uppercase">
                {convertCapitalizeFirstLetter(word.word)}
            </p>

            <div className="absolute top-1/2 right-0 -translate-y-1/2">
                <Link
                    className="flex items-center gap-2 text-primary rounded-xl"
                    to="/add"
                    onClick={addLinkHandler}
                >
                    <span className='font-semibold'>Add</span>
                    <IconPlus className="h-6 w-6" />
                    {/* <IconPlus className="h-6 w-6 text-primary" /> */}
                </Link>

                {/* <Link
                    className="rounded-xl font-semibold flex items-center gap-2 text-primary"
                    to={`/edit/${word.id}`}
                    onClick={() => rightBtnHandler(word)}
                >
                    Edit
                    <SquareAndPencilIcon className='w-5 h-5'/>
                </Link> */}
            </div>
        </div>
    );
}

export default TopNavigation;
