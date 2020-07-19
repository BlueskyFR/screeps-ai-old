// We include number in the Extract return types to also support numbers not as strings
export const keys = Object.keys as <T>(o: T) => Extract<keyof T, string | number>[];
// The following version also works but includes Symbols, which Object.keys don't return normally
//export const keys = Object.keys as <T>(o: T) => Array<keyof T>;
