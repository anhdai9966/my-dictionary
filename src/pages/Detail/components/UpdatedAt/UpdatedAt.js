import icons from '~/assets/icons';
import { getDate } from '~/utils';

function UpdatedAt({ updatedAt }) {
    return (
        <p className="flex gap-2 items-center">
            {getDate(updatedAt)}

            <svg className="w-3 h-3">
                <use href={icons + '#icon-updated-at'}></use>
            </svg>
        </p>
    );
}

export default UpdatedAt;
