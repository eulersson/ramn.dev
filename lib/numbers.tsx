/**
 * Converts an integer to its Roman numeral representation.
 *
 * @param num - The number to convert (must be between 1 and 3999).
 * @returns The Roman numeral as a string, or "Invalid number" if out of range.
 */
export function toRoman(num: number) {
  if (num < 1 || num > 3999) return "Invalid number"; // Roman numerals usually 1 to 3999

  const romanMap = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" },
  ];

  let result = "";

  for (const { value, numeral } of romanMap) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }

  return result;
}
