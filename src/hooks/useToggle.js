import { useState } from "react";

const useToggle = function (intital = false) {
    const [toggle, setToggle] = useState(intital);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    return [toggle, handleToggle];
};

export default useToggle