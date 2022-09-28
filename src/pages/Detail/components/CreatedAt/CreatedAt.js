import icons from '~/assets/icons';
import { getDate } from '~/utils';

function CreatedAt({ createdAt }) {
    return (
        <p className="flex gap-2 items-center">
            {getDate(createdAt)}

            <svg className="w-3 h-3">
                <use href={icons + '#icon-created-at'}></use>
            </svg>
        </p>
    );
}

export default CreatedAt;
