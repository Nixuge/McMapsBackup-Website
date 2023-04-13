const validChars = "abcdefghijklmnopqrstuvwxyz0123456789"
export function sanitize(text: string) {
    let newText = ""
    for (const char of text.toLowerCase()) {
        if (validChars.includes(char)) {
            newText += char;
        }
    }
    return newText;
}