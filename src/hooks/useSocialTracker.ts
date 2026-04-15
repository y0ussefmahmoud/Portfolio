import { useCallback } from 'react';

export const useSocialTracker = () => {
    const trackClick = useCallback(async (linkName: string) => {
        // Dummy function - no Firebase tracking
        console.log('Social click tracked:', linkName);
    }, []);

    return { trackClick };
};
