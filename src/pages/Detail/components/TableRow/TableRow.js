import Switch from '~/components/Switch';

function TableRow() {
    const handleBookmark = () => {
        console.log('🚀 handleDelete: ', 'bookmark');
    };

    const handleDelete = () => {
        console.log('🚀 handleDelete: ', 'delete');
    };

    return (
        <div className="w-full h-20 flex justify-between items-center border-t">
            <button
                className="flex items-center gap-3 text-[#FF3B30] font-semibold rounded-3xl"
                onClick={handleDelete}
            >
                <div className="w-6 h-6 bg-current rounded-full relative">
                    <div className="w-3 h-[2px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <span>Delete</span>
            </button>

            <div className="flex items-center gap-3 text-gray-600 font-semibold">
                <span>Add to Favorites</span>

                <Switch onChange={handleBookmark} />
            </div>
        </div>
    );
}

export default TableRow;
