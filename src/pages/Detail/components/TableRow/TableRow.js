import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SquareAndPencilIcon } from '~/components/Icons';
import Switch from '~/components/Switch';
import { actions, useStore } from '~/store';

function TableRow({ word }) {
    const { state, dispatch } = useStore();
    const { saved, detail, dictionary } = state;

    const [isSwitch, setIsSwitch] = useState(detail.data.saved)
    const [onlyOne, setOnlyOne] = useState(false)

    useEffect(() => {
        if (!onlyOne) return;

        let savedUpdate = saved.data;

        dispatch(actions.setDetail({ ...detail, data: { ...detail.data, saved: isSwitch } }))

        const dictionaryUpdate = dictionary.data.map(word => {
            if (word.id === detail.data.id) {
                word.saved = isSwitch
            }
            return word
        })

        dispatch(actions.setDictionary({ status: true, data: dictionaryUpdate }))

        if (isSwitch) {
            savedUpdate = [{ ...detail.data, saved: isSwitch }, ...saved.data]
        } else {
            savedUpdate = saved.data.filter(w => w.id !== detail.data.id)
        }

        dispatch(actions.setSaved({ status: !!savedUpdate.length, data: savedUpdate }))
    }, [isSwitch])

    const switchChangeHandler = () => {
        setIsSwitch(!isSwitch)
        setOnlyOne(true)
    }

    const rightBtnHandler = () => {
        dispatch(actions.setEdit({ status: true, data: word }))
    }

    // const handleDelete = () => {
    //     console.log('🚀 handleDelete: ', 'delete');
    // };

    return (
        <div className="w-full h-20 flex justify-between items-center border-t">
            <Link
                className="font-semibold flex items-center gap-2 bg-[#767680]/[12%] rounded-xl px-3 py-1"
                to={`/edit/${word.id}`}
                onClick={() => rightBtnHandler(word)}
            >
                <SquareAndPencilIcon className='w-5 h-5 text-[#3c3c43]/60' />
                {/* <span>Edit</span> */}
            </Link>
            {/* <button
                className="flex items-center gap-3 text-[#FF3B30] font-semibold rounded-3xl"
                onClick={handleDelete}
            >
                <div className="w-6 h-6 bg-current rounded-full relative">
                    <div className="w-3 h-[2px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <span>Delete</span>
            </button> */}

            <div className="flex items-center gap-3 text-[#3c3c43]/60 font-semibold">
                <span>Add to Saved</span>

                <Switch
                    // onChange={() => setIsSaved(!isSaved)}
                    onChange={switchChangeHandler}
                    checked={isSwitch}
                />
            </div>
        </div>
    );
}

export default TableRow;
