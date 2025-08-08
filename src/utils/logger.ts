import Config from 'react-native-config';

/**
 * Conditional logging utility that respects DEBUG environment variable
 * When DEBUG=true, detailed logs are shown. When false/undefined, logs are suppressed.
 */
class Logger {
  private static isDebugMode(): boolean {
    return Config.DEBUG === 'true' || __DEV__;
  }

  /**
   * Log general information
   */
  static info(message: string, ...args: any[]): void {
    if (this.isDebugMode()) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }

  /**
   * Log error messages
   */
  static error(message: string, error?: any, ...args: any[]): void {
    if (this.isDebugMode()) {
      console.error(`[ERROR] ${message}`, error, ...args);
    }
  }

  /**
   * Log warning messages
   */
  static warn(message: string, ...args: any[]): void {
    if (this.isDebugMode()) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  /**
   * Log debug messages (most verbose)
   */
  static debug(message: string, ...args: any[]): void {
    if (this.isDebugMode()) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  /**
   * Log user authentication events
   */
  static userLogin(userId: string, roles?: string[], organizationId?: string): void {
    this.info('User login event', {
      userId,
      roles,
      organizationId,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Log user logout events
   */
  static userLogout(userId?: string): void {
    this.info('User logout event', {
      userId,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Log token storage events
   */
  static tokenStorage(action: 'store' | 'retrieve' | 'clear', success: boolean): void {
    this.info(`Token ${action} event`, {
      action,
      success,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Log role assignment events
   */
  static roleAssignment(userId: string, roles: string[], organizationId?: string): void {
    this.info('Role assignment event', {
      userId,
      roles,
      organizationId,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Log organization context changes
   */
  static organizationChange(oldOrgId?: string, newOrgId?: string, userId?: string): void {
    this.info('Organization context change', {
      oldOrgId,
      newOrgId,
      userId,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Log token refresh events
   */
  static tokenRefresh(success: boolean, error?: any): void {
    if (success) {
      this.info('Token refresh successful');
    } else {
      this.error('Token refresh failed', error);
    }
  }

  /**
   * Log API call events
   */
  static apiCall(method: string, url: string, status?: number, duration?: number): void {
    this.debug('API call', {
      method,
      url,
      status,
      duration: duration ? `${duration}ms` : undefined,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Log navigation events
   */
  static navigation(from: string, to: string, userId?: string): void {
    this.debug('Navigation event', {
      from,
      to,
      userId,
      timestamp: new Date().toISOString(),
    });
  }
}

export default Logger;
