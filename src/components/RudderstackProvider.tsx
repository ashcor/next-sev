'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { RudderAnalytics } from '@rudderstack/analytics-js';

type Maybe<T> = T | undefined;

interface RudderstackProviderProps {
    children: React.ReactNode;
}

export const RudderstackContext = createContext<Maybe<RudderAnalytics>>(undefined);

export const useRudderstack = () => {
    const analyticsService = useContext(RudderstackContext);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (isClient && !analyticsService) {
        console.warn("Rudderstack analytics not available. Check your configuration.");
    }

    return { analyticsService };
};

export function RudderstackProvider({ children }: RudderstackProviderProps) {
    const [analytics, setAnalytics] = useState<RudderAnalytics | undefined>(undefined);

    useEffect(() => {
        if (!analytics) {
            const writeKey = process.env.NEXT_PUBLIC_RUDDERSTACK_WRITE_KEY;
            const dataPlaneUrl = process.env.NEXT_PUBLIC_RUDDERSTACK_DATA_PLANE_URL;

            if (writeKey && dataPlaneUrl) {
                const rudderAnalytics = new RudderAnalytics();
                rudderAnalytics.ready(() => {
                    console.log('Rudderstack is ready');
                });
                rudderAnalytics.load(writeKey, dataPlaneUrl);

                setAnalytics(rudderAnalytics);
            } else {
                console.warn('Rudderstack configuration missing. Please check your environment variables.');
            }
        } else {
            console.log('Rudderstack already initialized');
        }
    }, [analytics]);

    return (
        <RudderstackContext.Provider value={analytics}>
            {children}
        </RudderstackContext.Provider>
    );
}
