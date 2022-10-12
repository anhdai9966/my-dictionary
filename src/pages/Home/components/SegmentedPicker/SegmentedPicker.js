import { IconDocTextMagnifyingGlass, IconTextBookClosed } from "~/components/Icons";
import { actions, useStore } from "~/store";
import Button from "./Button";

function SegmentedPicker() {
    const { state, dispatch } = useStore();
    const { isSelected } = state

    const homeBtnHandler = () => {
        dispatch(actions.setIsSelected(true))
    }

    const savedBtnHandler = () => {
        dispatch(actions.setIsSelected(false))
    }

    return (
        <div className="h-8 p-[2px] rounded-lg relative flex flex-shrink-0 bg-[#757580]/[12%]">
            <Button btnConfig={{
                title: <><IconDocTextMagnifyingGlass className="w-3 h-3" />Home</>,
                selected: isSelected,
                handler: homeBtnHandler
            }} />

            <Button btnConfig={{
                title: <><IconTextBookClosed className="w-3 h-3" />Saved</>,
                selected: !isSelected,
                handler: savedBtnHandler
            }} />
        </div>
    );
}

export default SegmentedPicker;
