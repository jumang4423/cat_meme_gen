export const GetStrByte = (str: string): number => {
    const encoder = new TextEncoder();
    return encoder.encode(str).length
}