import { memo, useCallback, useRef } from 'react';
import Button from './Button';

function SegmentedPicker() {
    const selected = useRef();

    const animateSelected = (e) => {
        selected.current.style.left = e.target.offsetLeft + 'px';
    };

    const tapHome = useCallback((e) => {
        animateSelected(e);
    }, []);

    const tapSaved = useCallback((e) => {
        animateSelected(e);
    }, []);

    return (
        <div className="h-8 p-[2px] rounded-lg relative flex flex-shrink-0 bg-[#757580]/[.12]">
            <div
                ref={selected}
                className="h-[calc(100%_-_4px)] mb-[2px] w-1/2 bg-white shadow-lg font-semibold text-sm rounded-[7px] absolute top-[2px] left-[2px] transition-[left] ease-in-out"
            ></div>

            <Button title={'Home'} onClick={tapHome} />
            <Button title={'Saved'} onClick={tapSaved} />
        </div>
    );
}

export default memo(SegmentedPicker);
