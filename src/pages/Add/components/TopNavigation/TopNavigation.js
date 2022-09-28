import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import icons from '~/assets/icons';
import Loading from '~/components/Loading';
import { useToggle } from '~/hooks';

function TopNavigation({ action }) {
    const [loading, handleLoading] = useToggle(true);

    useEffect(() => {
        if (loading) return;
        action();
    }, [loading]);

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
                Add Dictionary
            </p>

            <div
                className={`absolute top-1/2 -translate-y-1/2 ${
                    loading ? 'right-0' : 'right-6'
                }`}
            >
                {loading ? (
                    <button
                        className="rounded-xl font-semibold flex items-center gap-2 hover:scale-[1.03] active:scale-[0.96] transition-transform ease-out text-primary after:content-[attr(after)] after:inline-block"
                        onClick={() => handleLoading(true)}
                    >
                        Save
                    </button>
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
}

export default TopNavigation;
