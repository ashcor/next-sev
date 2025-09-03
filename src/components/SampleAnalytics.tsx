'use client';

import { useEffect } from 'react';
import { useRudderstack } from './RudderstackProvider';

export default function SampleAnalytics() {
  const context = useRudderstack();
  const analyticsService = context?.analyticsService;
  const hasConsent = context?.hasConsent;
  const giveConsent = context?.giveConsent;

  useEffect(() => {
    // Track page view when component mounts and consent is given
    if (analyticsService) {
      analyticsService.page('Home', {
        path: '/',
        title: 'Home Page',
        timestamp: new Date().toISOString()
      });
    }
  }, [analyticsService, hasConsent]);

  const handleTrackEvent = () => {
    if (analyticsService) {
      analyticsService.track('Button Clicked', {
        button: 'example-button',
        page: 'home',
        timestamp: new Date().toISOString(),
        consentStatus: hasConsent ? 'given' : 'pending'
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Consent Management */}
      <div className="border p-4 rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Cookie Consent</h3>
        <p className="text-sm text-gray-600 mb-3">
          We use analytics to improve your experience.
          Status: <span className={hasConsent ? 'text-green-600' : 'text-orange-600'}>
            {hasConsent ? 'Consent Given - Events sent immediately' : 'No Consent - Events buffered'}
          </span>
        </p>
        <div className="space-x-2">
          {!hasConsent ? (
            <button
              onClick={giveConsent}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Give Consent
            </button>
          ) : (
              <p>Consent given</p>
          )}
        </div>
      </div>

      {/* Analytics Demo */}
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Analytics Demo</h3>
        <button
          onClick={handleTrackEvent}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Track Event Example
        </button>
        <p className="text-sm text-gray-600 mt-2">
          This button tracks events with Rudderstack.
          {!hasConsent && ' Events are buffered and will be sent once consent is given.'}
          {hasConsent && ' Events are sent immediately.'}
        </p>
      </div>
    </div>
  );
}
