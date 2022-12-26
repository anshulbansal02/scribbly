import { useCallback, useState } from "react";

const useInput = (initialValue) => {
    const [value, setValue] = useState(() => {
        if (typeof initialValue == "object")
            return initialValue?.initialValue ?? "";
        return initialValue ?? "";
    });

    const onChange = useCallback(
        function ({ target: { value } }) {
            const hookReturnValue = initialValue?.changeHook?.call(null, value);
            setValue(hookReturnValue ?? value);
        },
        [initialValue]
    );

    return { value, onChange };
};

export default useInput;
