export const formatType = (typeString: string, indentLevel = 0): string => {
    let formatted = "";
    let depth = indentLevel;
    let insideObject = false;

    for (let i = 0; i < typeString.length; i++) {
        const char = typeString[i];

        // Increase depth when opening a new block
        if (char === "{") {
            insideObject = true;
            formatted += " {\n" + "\t".repeat(depth + 1);
            depth++;
        }
        // Ensure properties are on new lines
        else if (char === ";") {
            formatted += ";\n" + "\t".repeat(depth);
        }
        // Decrease depth before closing a block
        else if (char === "}") {
            depth--; // Reduce depth before adding the closing brace
            formatted = formatted.trimEnd(); // Trim any extra spaces before closing brace
            formatted += "\n" + "\t".repeat(depth) + "}";
            insideObject = false;
        }
        // Append everything else normally
        else {
            formatted += char;
        }
    }

    return formatted;
}