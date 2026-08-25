import { useState, useRef, useEffect } from "react";

export default function useDebouncedState(initialValue: string, delay = 500) {
    const [value, setValue] = useState(initialValue);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        debounceRef.current = setTimeout(() => {
            setValue((prev) => prev || " ");
        }, delay);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [delay]);

    const setDebouncedValue = (newValue: string) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            setValue(newValue || " ");
        }, delay);
    };

    return [value, setDebouncedValue] as const;
}