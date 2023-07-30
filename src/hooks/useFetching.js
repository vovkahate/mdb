import { useState } from 'react';

export const useFetching = (callback) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState('');

    const fetching = async () => {
        try {
            setIsLoaded(true);
            await callback();
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoaded(false);
        }
    };

    return [fetching, isLoaded, error];
};
