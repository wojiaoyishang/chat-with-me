import { generateUUID } from "@/lib/tools.jsx";

let buttons = [];
let onChange = null;

export const setOnChange = (cb) => {
    onChange = cb;
};

export const registerButton = (component) => {
    const id = generateUUID();
    buttons.push({ id, component });
    if (onChange) onChange([...buttons]);
    return () => {
        buttons = buttons.filter(b => b.id !== id);
        if (onChange) onChange([...buttons]);
    };
};