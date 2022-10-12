import moment from 'moment';
import icons from '~/assets/icons';

function UpdatedAt({ updatedAt }) {
    return (
        <p className="flex gap-2 items-center">
            {moment(updatedAt).format('DD/MM/YYYY')}

            <svg className="w-3 h-3">
                <use href={icons + '#icon-updated-at'}></use>
            </svg>
        </p>
    );
}

export default UpdatedAt;
