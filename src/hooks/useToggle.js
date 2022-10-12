import { useState } from "react";

/**
 * 
 * @param {false} intital defaul = false
 * @returns [toggle, handleToggle]
 */
const useToggle = function (intital = false) {
    const [toggle, setToggle] = useState(intital);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    return [toggle, handleToggle];
};

export default useToggle