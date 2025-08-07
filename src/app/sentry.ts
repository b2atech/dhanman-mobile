import * as Sentry from '@sentry/react-native';
import config from './config';

export const initSentry = () => {
  if (config.enableCrashReporting && config.sentryDsn) {
    Sentry.init({
      dsn: config.sentryDsn,
      debug: config.debugMode,
      environment: config.appEnv,
      enableNative: true,
      enableNativeCrashHandling: true,
      beforeSend: (event) => {
        // Filter out events in development mode if needed
        if (config.debugMode && !config.enableLogging) {
          return null;
        }
        return event;
      },
    });

    if (config.enableLogging) {
      console.log('Sentry initialized for environment:', config.appEnv);
    }
  }
};

export const captureException = (error: Error, context?: any) => {
  if (config.enableCrashReporting) {
    Sentry.captureException(error, {
      contexts: context ? { custom: context } : undefined,
    });
  }

  if (config.enableLogging) {
    console.error('Error captured:', error, context);
  }
};

export const addBreadcrumb = (message: string, category?: string, level?: 'info' | 'warning' | 'error') => {
  if (config.enableCrashReporting) {
    Sentry.addBreadcrumb({
      message,
      category: category || 'app',
      level: level || 'info',
      timestamp: Date.now() / 1000,
    });
  }
};
