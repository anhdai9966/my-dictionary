import { memo } from "react";

function Button({ title, onClick }) {
    return (
        <button
            className="w-full h-full relative font-semibold text-sm rounded-[7px]"
            onClick={(e) => onClick(e)}
        >
            {title}
        </button>
    );
}

export default memo(Button);
