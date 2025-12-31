/**
 * This file is kept for backward compatibility
 * Main data fetching now happens on the server in lib/tokens.ts
 * 
 * The useTokens hook is no longer the primary data source.
 * Initial data comes from server via props.
 * Real-time updates come from useWebSocket hook.
 */

export { useSortedTokens } from "./useSortedTokens";
