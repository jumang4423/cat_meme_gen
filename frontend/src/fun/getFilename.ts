export function GetFileNameFromUrl(url: string): string {
    if (!url) {
        return '';
    }
    const fileNameEncoded = url.substring(url.lastIndexOf('/') + 1);
    const fileName = decodeURIComponent(fileNameEncoded);
    const lastDotIndex = fileName.lastIndexOf('.');

    return lastDotIndex === -1 ? fileName : fileName.substring(0, lastDotIndex);
}