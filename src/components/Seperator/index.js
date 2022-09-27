import { memo } from "react";

function Seperator() {
    return (
        <div
            className="w-[1px] h-3/5 bg-current absolute left-full top-1/2 -translate-y-1/2 flex-shrink-0"
        ></div>
    );
}

export default memo(Seperator);
