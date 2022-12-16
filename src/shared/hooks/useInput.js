import { useCallback, useState } from "react";

const useInput = (initialValue = "") => {
    const [value, setValue] = useState(initialValue);

    const onChange = useCallback(function ({ target: { value } }) {
        setValue(value);
    }, []);

    return { value, onChange };
};

export default useInput;
