import { inferType } from "../src/utils/types";
import { saveTypeToFile } from "../src/utils/files";

jest.mock("../src/utils/files");

describe("inferType", () => {
    it("should infer types for a simple object", () => {
        const obj = { name: "John", age: 30 };
        const expectedType = "type UserType = { name: string; age: number; }";

        expect(inferType(obj, "UserType", false, false)).toBe(expectedType);
    });

    it("should infer types for nested objects", () => {
        const obj = {
            user: { id: 1, name: "Alice" },
            active: true,
        };
        const expectedType = "type NestedType = { user: { id: number; name: string; }; active: boolean; }";

        expect(inferType(obj, "NestedType", false, false)).toBe(expectedType);
    });

    it("should infer types for arrays", () => {
        const obj = { tags: ["JS", "TS"] };
        const expectedType = "type ArrayType = { tags: string[]; }";

        expect(inferType(obj, "ArrayType", false, false)).toBe(expectedType);
    });

    it("should handle empty arrays as any[]", () => {
        const obj = { values: [] };
        const expectedType = "type EmptyArrayType = { values: any[]; }";

        expect(inferType(obj, "EmptyArrayType", false, false)).toBe(expectedType);
    });

    it("should handle null values", () => {
        const obj = { value: null };
        const expectedType = "type NullType = { value: null; }";

        expect(inferType(obj, "NullType", false, false)).toBe(expectedType);
    });

    it("should handle mixed types in an array (use first type)", () => {
        const obj = { data: [1, "string"] };
        const expectedType = "type MixedArrayType = { data: number[]; }";

        expect(inferType(obj, "MixedArrayType", false, false)).toBe(expectedType);
    });

    it("should save the type definition to a file when saveToFile is true", () => {
        const obj = { name: "Test" };
        const typeName = "TestType";

        inferType(obj, typeName, true, false);

        expect(saveTypeToFile).toHaveBeenCalledWith(
            typeName,
            "type TestType = { name: string; }"
        );
    });
});
