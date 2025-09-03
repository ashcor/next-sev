'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { RudderAnalytics } from '@rudderstack/analytics-js';

type Maybe<T> = T | undefined;

interface RudderstackProviderProps {
    children: React.ReactNode;
}

interface ConsentContextType {
    analyticsService: Maybe<RudderAnalytics>;
    hasConsent: boolean;
    giveConsent: () => void;
}

export const RudderstackContext = createContext<Maybe<ConsentContextType>>(undefined);

export const useRudderstack = () => {
    const context = useContext(RudderstackContext);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (isClient && !context) {
        console.warn("Rudderstack analytics not available. Check your configuration.");
    }

    return context;
};

export function RudderstackProvider({ children }: RudderstackProviderProps) {
    const [analytics, setAnalytics] = useState<RudderAnalytics | undefined>(undefined);
    const [hasConsent, setHasConsent] = useState(false);

    useEffect(() => {
        if (!analytics) {
            const writeKey = process.env.NEXT_PUBLIC_RUDDERSTACK_WRITE_KEY;
            const dataPlaneUrl = process.env.NEXT_PUBLIC_RUDDERSTACK_DATA_PLANE_URL;

            if (writeKey && dataPlaneUrl) {
                const rudderAnalytics = new RudderAnalytics();

                rudderAnalytics.ready(() => {
                    console.log('Rudderstack is ready');
                });

                // Load Rudderstack with preConsent configuration
                rudderAnalytics.load(writeKey, dataPlaneUrl, {
                    preConsent: {
                        enabled: true,
                    },
                });

                setAnalytics(rudderAnalytics);
            } else {
                console.warn('Rudderstack configuration missing. Please check your environment variables.');
            }
        } else {
            console.log('Rudderstack already initialized');
        }
    }, [analytics]);

    const giveConsent = () => {
        if (analytics) {
            analytics.consent();
            setHasConsent(true);
            console.log('Consent given - Rudderstack tracking enabled');
        }
    };

    const contextValue: ConsentContextType = {
        analyticsService: analytics,
        hasConsent,
        giveConsent,
    };

    return (
        <RudderstackContext.Provider value={contextValue}>
            {children}
        </RudderstackContext.Provider>
    );
}
