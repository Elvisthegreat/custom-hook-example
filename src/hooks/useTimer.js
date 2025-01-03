import { useState, useRef, useEffect } from 'react';

const useTimer = (initialSeconds = 0, isCountDown = false ) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isActive) {
            // if isActive update the intervalRef
            intervalRef.current = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (isCountDown && prevSeconds <= 0) {
                        clearInterval(intervalRef.current);
                        return 0;
                    }
                    // if isCountDown is true, decrement the seconds [ternary operator] 
                    return isCountDown ? prevSeconds - 1 : prevSeconds + 1;
                });
            }, 1000);
        } else if (!isActive && intervalRef.current) {
            // if isActive is false, clear the intervalRef
            clearInterval(intervalRef.current);
        }
        // clear the intervalRef when the component is destroyed
        return () => clearInterval(intervalRef.current);
    }, [isActive, isCountDown]);

    // set isActive as true whenever is a start
    const start = () => setIsActive(true);

    // set isActive as false when click
    const stop = () => setIsActive(false);

    // reset isActive as false when click
    const reset = () => {
        setIsActive(false);
        setSeconds(initialSeconds);
    }
return { seconds, start, stop, reset, isActive }
};

export default useTimer;
