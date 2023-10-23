export const toBool = (value: string | undefined): boolean => {
    if (value === undefined) {
        throw new Error("The value is undefined.")
    }
    const lowerCaseValue = value.toLocaleLowerCase();
    if (lowerCaseValue === "true" || value === '1') {
        return true
    }
    if (lowerCaseValue === "false" || value === '0') {
        return false
    }
    throw new Error(`Could not coerce ${value} to boolean.`)
};