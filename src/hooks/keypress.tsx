import { useEffect } from "react";

export enum Keys {
    LETTER_N = 78,
    ENTER = 13,
    ESCAPE = 27,
}

export function useKeypressListener(keys: number[] | number, fn: () => void) {

    const watchKeys: number[] = !Array.isArray(keys) ? [keys] : keys;

    useEffect(() => {
        // console.log('use effect create')
        const keyDownHandler = (event: KeyboardEvent) => {

            // console.log(event.keyCode);
            if (watchKeys.findIndex(el => el === event.keyCode) >= 0) {
                fn();
            }
        }
        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        }
    }, [fn, watchKeys])
}