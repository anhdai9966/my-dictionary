import { Link } from 'react-router-dom';

import { ArrowUpDocIcon, IconChevronBackward, IconSpinner8 } from '~/components/Icons';
import { useStore } from '~/store';

function TopNavigation({ onClickRight }) {
    const { state } = useStore()
    const { isLoading, edit } = state

    return (
        <div className="h-20 flex items-center justify-center relative">
            <div className="absolute top-1/2 left-0 -translate-y-1/2">
                <Link
                    className="flex items-center gap-1 bg-[#767680]/[12%] rounded-xl px-3 py-2"
                    to={`/detail/${edit.data.id}`}>
                    <IconChevronBackward className="h-5 w-5 text-[#3c3c43]/60" />
                    {/* <span className='font-semibold'>Back</span> */}
                </Link>
            </div>

            <p className="text-truncate text-center font-semibold">
                Edit Dictionary
            </p>

            <div className="absolute top-1/2 -translate-y-1/2 right-0">
                {!isLoading && (
                    <button
                        className="flex items-center gap-2 bg-[#767680]/[12%] rounded-xl px-3 py-2"
                        onClick={onClickRight}>
                        {/* <span className='font-semibold'>Update</span> */}
                        <ArrowUpDocIcon className="w-5 h-5 text-primary" />
                    </button>
                )}

                {isLoading && <IconSpinner8 className="w-6 h-6 mr-3 animate-spinner8" />}
            </div>
        </div>
    );
}

export default TopNavigation;
