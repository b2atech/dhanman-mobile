import { format, parseISO } from 'date-fns';

/**
 * Format date to YYYY-MM-DD format
 * @param date Date string or Date object
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'yyyy-MM-dd');
};

/**
 * Format time to hh:mm A format (12-hour format with AM/PM)
 * @param date Date string or Date object
 * @returns Formatted time string
 */
export const formatTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'hh:mm a');
};

/**
 * Format date to DD MMM YYYY format
 * @param date Date string or Date object
 * @returns Formatted date string
 */
export const formatDisplayDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd MMM yyyy');
};
