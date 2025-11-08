/**
 * LocalStorage utilities for persisting user preferences
 */

const STORAGE_PREFIX = 'project-management-';

/**
 * Get item from localStorage
 */
function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Set item in localStorage
 */
function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

/**
 * View preference keys
 */
export const STORAGE_KEYS = {
  VIEW: 'view',
  FILTERS: 'filters',
  SORT: 'sort',
  AUTO_REFRESH: 'auto-refresh',
  REFRESH_INTERVAL: 'refresh-interval',
} as const;

/**
 * Get view preference (list or kanban)
 */
export function getViewPreference(): 'list' | 'kanban' {
  return getItem(STORAGE_KEYS.VIEW, 'list');
}

/**
 * Set view preference
 */
export function setViewPreference(view: 'list' | 'kanban'): void {
  setItem(STORAGE_KEYS.VIEW, view);
}

/**
 * Get filter preferences
 */
export function getFilterPreferences(): {
  statuses: string[];
  priorities: string[];
  showCompleted: boolean;
} {
  return getItem(STORAGE_KEYS.FILTERS, {
    statuses: [],
    priorities: [],
    showCompleted: true,
  });
}

/**
 * Set filter preferences
 */
export function setFilterPreferences(filters: {
  statuses: string[];
  priorities: string[];
  showCompleted: boolean;
}): void {
  setItem(STORAGE_KEYS.FILTERS, filters);
}

/**
 * Get sort preference
 */
export function getSortPreference(): 'completion' | 'priority' | 'status' | 'id' {
  return getItem(STORAGE_KEYS.SORT, 'completion');
}

/**
 * Set sort preference
 */
export function setSortPreference(sort: 'completion' | 'priority' | 'status' | 'id'): void {
  setItem(STORAGE_KEYS.SORT, sort);
}

/**
 * Get auto-refresh preference
 */
export function getAutoRefreshPreference(): boolean {
  return getItem(STORAGE_KEYS.AUTO_REFRESH, true);
}

/**
 * Set auto-refresh preference
 */
export function setAutoRefreshPreference(enabled: boolean): void {
  setItem(STORAGE_KEYS.AUTO_REFRESH, enabled);
}

/**
 * Get refresh interval preference (in milliseconds)
 */
export function getRefreshIntervalPreference(): number {
  return getItem(STORAGE_KEYS.REFRESH_INTERVAL, 30000); // Default 30 seconds
}

/**
 * Set refresh interval preference
 */
export function setRefreshIntervalPreference(interval: number): void {
  setItem(STORAGE_KEYS.REFRESH_INTERVAL, interval);
}

// Note: Use these functions directly in components with useState for state synchronization

