#!/usr/bin/env node
import { Command } from "commander";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { inferType } from "../utils/types";

const program = new Command();

program
    .version("1.0.0")
    .description("Infer TypeScript types from JavaScript/JSON files")
    .argument("<file>", "Path to JSON or JavaScript file")
    .option("-n, --name <typeName>", "Specify the TypeScript type name", "InferredType")
    .option("-s, --save", "Save the output as a `.d.ts` file")
    .action((file, options) => {
        try {
            const filePath = resolve(file);
            if (!existsSync(filePath)) {
                console.error("❌ Error: File not found!");
                process.exit(1);
            }

            const fileContent = readFileSync(filePath, "utf8");
            let jsonObject;

            if (file.endsWith(".json")) {
                jsonObject = JSON.parse(fileContent);
            } else if (file.endsWith(".js")) {
                jsonObject = require(filePath);
            } else {
                console.error("❌ Error: Only JSON or JavaScript files are supported!");
                process.exit(1);
            }

            const typeDefinition = inferType(jsonObject, options.name, options.save);
            console.log(`\n✅ Inferred TypeScript Type:\n${typeDefinition}\n`);
        } catch (error) {
            const err = error as any;
            console.error("❌ Error:", err.message);
            process.exit(1);
        }
    });

program.parse(process.argv);
