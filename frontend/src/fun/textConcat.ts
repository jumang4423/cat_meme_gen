
const getRealTextLength = (text: string) => {
    // get byte length
    let len = 0
    for (let i = 0; i < text.length; i++) {
        const c = text.charCodeAt(i)
        len += c <= 255 ? 1 : 2
    }
    return len
}

export function TextConcat(orText: string) {
    const ddd = "..."
    const maxLen = 10
    const realLen = getRealTextLength(orText)

    return realLen > maxLen ? orText.slice(0, maxLen) + ddd : orText
}