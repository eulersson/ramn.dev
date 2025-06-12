/**
 * Expresses the size of a two-dimensional object.
 */
export type Size = { w: number; h: number };

/**
 * Expresses the position in a two-dimensional point.
 */
export type Position = { x: number; y: number };

/**
 * Expresses the resolution of a grid.
 */
export type GridDimensions = { rows: number; cols: number };

/**
 * Represents the possible breakpoint keys for responsive design.
 * - "xs": Extra small
 * - "sm": Small
 * - "md": Medium
 * - "lg": Large
 * - "xl": Extra large
 * - "2xl": Double extra large
 */
export type BreakpointKey = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Defines a mapping from each BreakpointKey to its corresponding value (e.g., a CSS width).
 */
export type Breakpoints = {
  [key in BreakpointKey]: string;
};

