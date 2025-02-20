import { writeFileSync } from "fs";
import { resolve } from "path";
import { saveTypeToFile } from "../src/utils/files";

jest.mock("fs");

describe("saveTypeToFile", () => {
    it("should write the correct content to the types/ folder", () => {
        const typeName = "TestType";
        const typeContent = "type TestType = { name: string; age: number; };";
        const expectedPath = resolve(process.cwd(), "types", `${typeName}.d.ts`);

        saveTypeToFile(typeName, typeContent);

        expect(writeFileSync).toHaveBeenCalledWith(expectedPath, typeContent, "utf8");
    });
});
