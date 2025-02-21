import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Saves the inferred TypeScript type to a `.d.ts` file in the workspace.
 */
function saveTypeToFile(fileName: string, content: string) {
	const workspaceFolders = vscode.workspace.workspaceFolders;
	if (!workspaceFolders) {
		vscode.window.showErrorMessage("No workspace folder found.");
		return;
	}

	const filePath = path.join(workspaceFolders[0].uri.fsPath, "types", `${fileName}.d.ts`);

	// Ensure the `types` folder exists
	fs.mkdirSync(path.dirname(filePath), { recursive: true });

	// Write the file
	fs.writeFileSync(filePath, content);
	vscode.window.showInformationMessage(`Saved inferred type to: ${filePath}`);
}

/**
 * Cleans the selected text to extract a valid JSON object.
 */
function sanitizeObjectString(text: string): string {
	// Remove variable declarations (`const user = ...`)
	text = text.replace(/^\s*(const|let|var)?\s*\w+\s*=\s*/, '').trim();

	// Wrap object keys without quotes to valid JSON keys
	text = text.replace(/([{,])\s*(\w+)\s*:/g, '$1 "$2":');

	// Convert single quotes to double quotes (valid JSON)
	text = text.replace(/'/g, '"');

	// Remove trailing commas before closing braces/brackets
	text = text.replace(/,\s*([}\]])/g, '$1');

	// replace functions with the word function
	text = text.replace(/"(\w+)"\s*:\s*\([^)]*\)\s*=>\s*\{[^}]*\}/g, '"$1": "function"'); // Arrow functions
	text = text.replace(/"(\w+)"\s*:\s*function\s*\([^)]*\)\s*\{[^}]*\}/g, '"$1": "function"'); // Regular functions

	return text;
}


/**
 * Recursively determines the TypeScript type of a given JavaScript value.
 */
function getType(value: any): string {
	if (Array.isArray(value)) {
		const arrayType = value.length ? getType(value[0]) : "any";
		return `${arrayType}[]`;
	}
	if (value === null) { return "null"; }
	if (value === "function") { return "() => void"; }
	if (value instanceof Date) { return "Date"; }
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
 * Properly formats TypeScript output with correct indentation.
 */
function formatType(typeString: string, indentLevel = 0): string {
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




/**
 * Infers the TypeScript type definition from a JavaScript object.
 */
function inferType(obj: any): string {
	const formatOutput = vscode.workspace.getConfiguration("autotypex").get<boolean>("formatOutput", true);
	const typeName = vscode.workspace.getConfiguration("autotypex").get<string>("typeName", "InferredType");
	const saveToFile = vscode.workspace.getConfiguration("autotypex").get<boolean>("saveToFile", false);

	let typeDef = `type ${typeName} = `;

	typeDef += formatOutput ? formatType(getType(obj)) : getType(obj);

	// Save to file if enabled
	if (saveToFile) {
		saveTypeToFile(typeName, typeDef);
	}

	return typeDef;
}


/**
 * Activate function: Registers the VS Code command.
 */
export function activate(context: vscode.ExtensionContext) {
	console.log('AutoTypeX extension is now active!');

	// Register the command
	const inferTypeCommand = vscode.commands.registerCommand('autotypex-vscode.inferType', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active editor found.');
			return;
		}

		const selection = editor.selection;
		let selectedText = editor.document.getText(selection);

		if (!selectedText.trim()) {
			vscode.window.showErrorMessage('Please select a JavaScript object.');
			return;
		}

		try {
			selectedText = sanitizeObjectString(selectedText); // Sanitize before parsing

			// Parse safely using JSON.parse
			const obj = JSON.parse(selectedText);
			const inferredType = inferType(obj);

			// Insert the inferred type in the editor
			editor.edit(editBuilder => {
				editBuilder.insert(editor.selection.active, `\n\n${inferredType}\n\n`);
			});

			vscode.window.showInformationMessage('Inferred TypeScript type inserted.');
		} catch (error) {
			vscode.window.showErrorMessage('Failed to infer TypeScript type. Make sure your selection is a valid JSON-like object.');
			console.error(error);
		}
	});

	context.subscriptions.push(inferTypeCommand);
}

/**
 * Deactivate function: Cleanup when the extension is disabled.
 */
export function deactivate() { }
