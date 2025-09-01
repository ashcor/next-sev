'use client';

import { useEffect } from 'react';
import { useRudderstack } from './RudderstackProvider';

export function SampleAnalytics() {
  const { analyticsService } = useRudderstack();

  useEffect(() => {
    // Track page view when component mounts
    if (analyticsService) {
      analyticsService.page('Home', {
        path: '/',
        title: 'Home Page',
        timestamp: new Date().toISOString()
      });
    }
  }, [analyticsService]);

  const handleTrackEvent = () => {
    if (analyticsService) {
      analyticsService.track('Button Clicked', {
        button: 'example-button',
        page: 'home',
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <div>
      <button
        onClick={handleTrackEvent}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Track Event Example
      </button>
      <p className="text-sm text-gray-600 mt-2">
        This button demonstrates Rudderstack event tracking
      </p>
    </div>
  );
}
