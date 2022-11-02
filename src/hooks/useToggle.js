import { useState } from "react";

const useToggle = (initialValue = false) => {
    const [toggleValue, setToggleValue] = useState(!!initialValue);
    function toggle() {
        setToggleValue(!toggleValue);
    }
    return [toggleValue, toggle];
};

export default useToggle;
