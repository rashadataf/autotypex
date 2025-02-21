# AutoTypeX VS Code Extension 🚀

**Automatically infer TypeScript types from JavaScript objects!**

🔹 `AutoTypeX` is a **VS Code extension** that dynamically analyzes selected JavaScript objects and **generates TypeScript type definitions**, inserting them directly into your editor.  
Perfect for developers migrating from JS to TS or handling dynamic data structures.

---

## 📦 Installation

### **From the VS Code Marketplace**
1. Open **VS Code**.
2. Go to **Extensions (`Ctrl+Shift+X`)**.
3. Search for **"AutoTypeX"**.
4. Click **Install**.

### **Manual Installation**
If you have the `.vsix` package:
```sh
code --install-extension autotypex-vscode.vsix
```

---

## 🚀 Usage

### **1️⃣ Select a JavaScript Object**
Select the object in your editor:
```js
const user = {
    id: 1,
    name: "Alice",
    isActive: true
};
```

### **2️⃣ Run the Command**
Press `Ctrl + Shift + P` (or `Cmd + Shift + P` on Mac)  
Then select **"Infer TypeScript Type from Object"**.

### **3️⃣ Output**
The extension inserts the inferred TypeScript type into your file:
```ts
interface InferredType {
  id: number;
  name: string;
  isActive: boolean;
}
```

---

## 🛠 Features

✅ **Infer TypeScript types from JavaScript objects.**  
✅ **Supports nested objects and arrays.**  
✅ **Converts functions to `() => void`.**  
✅ **Works with both JavaScript and JSON objects.**  
✅ **Integrated directly into VS Code (no need to copy-paste).**  

---

## 🔧 Settings & Customization

| Setting                  | Default          | Description                            |
| ------------------------ | ---------------- | -------------------------------------- |
| `autotypex.formatOutput` | `true`           | Format the output TypeScript interface |
| `autotypex.typeName`     | `"InferredType"` | Set a default type name                |
| `autotypex.saveToFile`   | `false`          | Automatically save inferred type to a `.d.ts` file |

Modify settings via:
1. **File** → **Preferences** → **Settings** → Search `"autotypex"`  
2. Or edit **`settings.json`** manually.

---

## 🎯 Example Scenarios

### **Nested Objects**
```js
const user = {
    profile: {
        firstName: "Alice",
        age: 25
    }
};
```
✅ **Output:**
```ts
interface InferredType {
  profile: {
    firstName: string;
    age: number;
  };
}
```

### **Arrays**
```js
const data = { tags: ["JS", "TS"] };
```
✅ **Output:**
```ts
interface InferredType {
  tags: string[];
}
```

### **Functions**
```js
const obj = { log: () => console.log("Hello") };
```
✅ **Output:**
```ts
interface InferredType {
  log: () => void;
}
```

---

## 📜 License

MIT License © 2025 Rashad

---

## 🌟 Contributing

Contributions are welcome! Feel free to submit an issue or pull request.

- **GitHub Repo:** [GitHub](https://github.com/rashadataf/autotypex.git)
- **VS Code Marketplace:** [Marketplace](https://marketplace.visualstudio.com/items?itemName=rashadataf.autotypex-vscode)

🚀 **Happy Coding!**
