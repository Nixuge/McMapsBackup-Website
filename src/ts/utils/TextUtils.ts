const validChars = "abcdefghijklmnopqrstuvwxyz0123456789";
export function sanitize(text: string) {
    let newText = "";
    // normalize nfd = é -> e◌́ and same for other accents and shit
    const normalized = text.toLowerCase().normalize("NFD");
    for (const char of normalized) {
        if (validChars.includes(char)) {
            newText += char;
        }
    }
    return newText;
}

const validChars2 = "abcdefghijklmnopqrstuvwxyz0123456789: ";
export function sanitizeSearch(text: string) {
    let newText = "";
    for (const char of text.toLowerCase()) {
        if (validChars2.includes(char)) {
            newText += char;
        }
    }
    return newText;
}

const trueValues = ["true", "1", "yes"];
export function textToBool(text: string) {
    return trueValues.includes(text);
}