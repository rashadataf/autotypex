import { saveTypeToFile } from "./files";

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
    if (typeof value === "object") {
        return `{ ${Object.entries(value)
            .map(([key, val]) => `${key}: ${getType(val)}`)
            .join("; ")} }`;
    }
    return typeof value;
}

/**
 * Infers the TypeScript type definition from a JavaScript object.
 * 
 * @param obj - The JavaScript object to infer the type from.
 * @param name - The name of the generated TypeScript type (default: "InferredType").
 * @param saveToFile - Whether to save the inferred type as a `.d.ts` file (default: false).
 * @returns The inferred TypeScript type as a string.
 * 
 * @example
 * ```ts
 * const sample = { name: "John", age: 30 };
 * console.log(inferType(sample, "UserType"));
 * ```
 * Output:
 * ```ts
 * type UserType = { name: string; age: number; };
 * ```
 */
export function inferType(
    obj: any,
    name: string = "InferredType",
    saveToFile: boolean = false
): string {
    const typeDef = `type ${name} = ${getType(obj)};`;

    if (saveToFile) {
        saveTypeToFile(name, typeDef);
    }

    return typeDef;
}
