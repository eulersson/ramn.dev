import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

/**
 * Utility function to conditionally join class names together and merge Tailwind CSS classes.
 *
 * This function combines the functionality of `clsx` (for conditional class name joining)
 * and `twMerge` (for intelligently merging Tailwind CSS classes to avoid conflicts).
 *
 * @param inputs - A list of class names, arrays, or objects representing conditional classes.
 * @returns A single string of merged class names.
 *
 * @see https://ayberkyavas.com/blogs/wtf-is-clsx-twmerge-cn-in-tailwindcss
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(...inputs));
}