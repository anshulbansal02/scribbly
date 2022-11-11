import { useState } from "react";

const useInput = (initialValue = "") => {
    const [value, setValue] = useState(initialValue);
    function onChange({ target: { value } }) {
        setValue(value);
    }
    return { value, onChange };
};

export default useInput;
