import { useState } from "react";

const useInput = (initialValue = "") => {
    const [text, setText] = useState(initialValue);
    function changeHandler(e) {
        setText(e.target.value);
    }
    return [text, changeHandler];
};

export default useInput;
