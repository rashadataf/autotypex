# Changelog

All notable changes to the **AutoTypeX VS Code Extension** will be documented in this file.  
This project follows the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format.  

## [1.0.0] - 2025-02-21
### 🚀 Initial Release
- **Infer TypeScript types from JavaScript objects.**
- **Support nested objects and arrays** in the inferred TypeScript types.
- **Convert JavaScript functions to `() => void`** when inferring types.
- **Use `JSON.parse()`** for safe object parsing.
- **Automatically insert inferred TypeScript types into the editor.**
- **Configurable Settings:**
  - `autotypex.formatOutput` → **Formats the output TypeScript interface**. *(Default: `true`)*
  - `autotypex.typeName` → **Sets the default name for the generated TypeScript type**. *(Default: `"InferredType"`)*
  - `autotypex.saveToFile` → **Automatically saves inferred TypeScript types to a `.d.ts` file**. *(Default: `false`)*

---

### **🚀 How to Use**
1. **Select a JavaScript object** in an open editor.
2. **Open the Command Palette** (`Cmd/Ctrl + Shift + P`).
3. **Run `"Infer TypeScript Type from Object"`**.
4. **The TypeScript interface is automatically inserted into the editor!** 🎯
