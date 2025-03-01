import { saveTypeToFile } from "./files";
import { formatType } from "./formatters";

/**
 * Recursively determines the TypeScript type of a given JavaScript value.
 * Handles primitives, arrays, and nested objects.
 * 
 * @param value - The JavaScript value to infer the type from.
 * @returns A TypeScript-compatible type definition string.
 */
function getType(value: any): string {
    if (Array.isArray(value)) {
        const arrayType = value.length ? getType(value[0]) : "any";
        return `${arrayType}[]`;
    }
    if (value === null) return "null";
    if (value instanceof Date) return "Date";
    if (typeof value === "function") { return "() => void"; }
    if (typeof value === "object") {
        if (Object.keys(value).length === 0) {
            return "{}";
        }
        const properties = Object.entries(value)
            .map(([key, val]) => `${key}: ${getType(val)};`)
            .join(" ");

        return `{ ${properties} }`;
    }
    return typeof value;
}

/**
 * Infers the TypeScript type definition from a JavaScript object.
 * 
 * @param obj - The JavaScript object to infer the type from.
 * @param name - The name of the generated TypeScript type (default: "InferredType").
 * @param saveToFile - Whether to save the inferred type as a `.d.ts` file (default: false).
 * @param format - Whether to format the output type definition (default: true).
 *                  - `true`: Formats the output for readability (multi-line, indented).
 *                  - `false`: Returns the output as a compact, single-line type definition.
 * @returns The inferred TypeScript type as a string.
 * 
 * @example
 * ```ts
 * const sample = { name: "John", age: 30 };
 * console.log(inferType(sample, "UserType", false, true));
 * ```
 * Output (formatted):
 * ```ts
 * type UserType = {
 *   name: string;
 *   age: number;
 * };
 * ```
 * 
 * @example
 * ```ts
 * console.log(inferType(sample, "UserType", false, false));
 * ```
 * Output (compact):
 * ```ts
 * type UserType = { name: string; age: number; };
 * ```
 */
export function inferType(
    obj: any,
    name: string = "InferredType",
    saveToFile: boolean = false,
    format: boolean = true,
): string {
    let typeDef = `type ${name} = `;

    typeDef += format ? formatType(getType(obj)) : getType(obj);

    if (saveToFile) {
        saveTypeToFile(name, typeDef);
    }

    return typeDef;
}
