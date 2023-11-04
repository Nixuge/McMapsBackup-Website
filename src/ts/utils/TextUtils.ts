const validChars = "abcdefghijklmnopqrstuvwxyz0123456789";
export function sanitize(text: string) {
    let newText = "";
    for (const char of text.toLowerCase()) {
        if (validChars.includes(char)) {
            newText += char;
        } else if ("éè".includes(char)) {
            newText += "e"; //dirty 
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