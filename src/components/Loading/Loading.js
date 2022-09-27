import icons from '~/assets/icons';

function Loading() {
    return (
        <div className="inline-block absolute left-1/2 top-1/2 -translate-y-2/4 -translate-x-2/4">
            <svg className="w-8 h-8 animate-spinner">
                <use href={icons + '#icon-loading'}></use>
            </svg>
        </div>
    );
}

export default Loading;
