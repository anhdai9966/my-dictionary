import { memo } from 'react';
import { Link } from 'react-router-dom';

import icons from '~/assets/icons';

function TopNavigation({ title = '' }) {
    return (
        <div className="h-20 flex items-center justify-center relative border-b">
            <div className="absolute top-1/2 left-0 -translate-y-1/2">
                <Link
                    after="Back"
                    className="rounded-xl font-semibold flex items-center gap-2 hover:scale-[1.03] active:scale-[0.96] transition-transform ease-out text-gray-500 after:content-[attr(after)] after:inline-block"
                    to="/"
                >
                    <svg className="h-5 w-5 fill-current">
                        <use href={icons + '#icon-left'}></use>
                    </svg>
                </Link>
            </div>

            <p className="text-truncate-1 text-center font-semibold text-[17px]">
                {title}
            </p>

            <div className="absolute top-1/2 right-0 -translate-y-1/2">
                <button className="rounded-xl font-semibold flex items-center gap-2 hover:scale-[1.03] active:scale-[0.96] transition-transform ease-out text-primary after:content-[attr(after)] after:inline-block">
                    Edit
                </button>
            </div>
        </div>
    );
}

export default memo(TopNavigation);
