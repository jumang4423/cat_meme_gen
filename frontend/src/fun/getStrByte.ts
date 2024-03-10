export const GetStrByte = (str: string): number => {
    const encoder = new TextEncoder();
    const encodes = str.split("").map((c) => encoder.encode(c).length === 1 ? 1 : 2).reduce((a, b) => a + b, 0);

    return encodes;
}