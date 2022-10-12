import icons from '~/assets/icons';
import moment from 'moment'

function CreatedAt({ createdAt }) {
    return (
        <p className="flex gap-2 items-center">
            {moment(createdAt).format('DD/MM/YYYY')}

            <svg className="w-3 h-3">
                <use href={icons + '#icon-created-at'}></use>
            </svg>
        </p>
    );
}

export default CreatedAt;
