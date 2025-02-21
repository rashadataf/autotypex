import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join, resolve } from "path";

/**
 * Saves the inferred TypeScript type definition to a file inside the `types/` folder.
 * @param name - The name of the type (used for the file name).
 * @param content - The TypeScript type definition string.
 */
export function saveTypeToFile(name: string, content: string): void {
    const outputDir = resolve(process.cwd(), "types");

    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
    }

    const filePath = join(outputDir, `${name}.d.ts`);
    writeFileSync(filePath, content, "utf8");

    console.log(`✅ Type definition saved as ${filePath}`);
}
