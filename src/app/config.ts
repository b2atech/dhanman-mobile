import Config from 'react-native-config';

export interface AppConfig {
  apiBaseUrl: string;
  salesApiBaseUrl: string;
  purchaseApiBaseUrl: string;
  myhomeApiBaseUrl: string;
  sentryDsn: string;
  appEnv: string;
  debugMode: boolean;
  apiTimeout: number;
  enableLogging: boolean;
  enableCrashReporting: boolean;
}

const config: AppConfig = {
  apiBaseUrl: Config.API_BASE_URL || 'https://qa.common.dhanman.com/api/',
  salesApiBaseUrl: Config.SALES_API_BASE_URL || 'https://qa.sales.dhanman.com/api/',
  purchaseApiBaseUrl: Config.PURCHASE_API_BASE_URL || 'https://qa.purchase.dhanman.com/api/',
  myhomeApiBaseUrl: Config.MYHOME_API_BASE_URL || 'https://qa.myhome.dhanman.com/api/',
  sentryDsn: Config.SENTRY_DSN || '',
  appEnv: Config.APP_ENV || 'qa',
  debugMode: Config.DEBUG_MODE === 'true',
  apiTimeout: parseInt(Config.API_TIMEOUT || '10000', 10),
  enableLogging: Config.ENABLE_LOGGING === 'true',
  enableCrashReporting: Config.ENABLE_CRASH_REPORTING === 'true',
};

export default config;
