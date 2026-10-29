/**
 * ⚠️ DEPRECATED — This file is no longer used.
 *
 * The auth store has been moved to:
 *   src/stores/useAuthStore.js
 *
 * It now uses Zustand's `persist` middleware so auth state
 * survives page refreshes (no more logout on F5).
 *
 * All imports have been updated to the new location.
 * This file can be safely deleted.
 */

export { useAuthStore } from "../../stores/useAuthStore";