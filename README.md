# autotype-js 🚀

**Automatically infer TypeScript types from JavaScript objects!**

`autotype-js` is a lightweight CLI tool and NPM package that dynamically analyzes JavaScript/JSON files and generates TypeScript type definitions. Perfect for developers migrating from JS to TS or handling dynamic data structures.

---

## 📦 Installation

### **Using Yarn**  
```sh
yarn add autotype-js
```

### **Using NPM**  
```sh
npm install autotype-js
```

Or, run it directly via `npx`:
```sh
npx autotype-js <file.json>
```

---

## 🚀 Usage

### **CLI Usage**

```sh
npx autotype-js <file.json> [options]
```

#### **Example: Inferring a Type from a JSON File**

**Given `sample.json`:**
```json
{
  "id": 1,
  "name": "Alice",
  "isActive": true
}
```
Run:
```sh
npx autotype-js sample.json
```
✅ **Output:**  
```ts
type InferredType = { id: number; name: string; isActive: boolean };
```

#### **Custom Type Name**  
```sh
npx autotype-js sample.json --name UserType
```
✅ **Output:**  
```ts
type UserType = { id: number; name: string; isActive: boolean };
```

#### **Saving Output to a `.d.ts` File**  
```sh
npx autotype-js sample.json --name UserType --save
```
✅ **Creates `types/UserType.d.ts`** with:  
```ts
type UserType = { id: number; name: string; isActive: boolean };
```

#### **Working with JavaScript Files**  
If `sample.js` contains:  
```js
module.exports = { id: 1, name: "Alice", isActive: true };
```
Run:
```sh
npx autotype-js sample.js
```

---

## 🛠 Available Options

| Option       | Description                                                 |
| ------------ | ----------------------------------------------------------- |
| `-n, --name` | Specify the TypeScript type name (default: `InferredType`). |
| `-s, --save` | Save the output as a `.d.ts` file inside `types/`.          |

---

## 📌 Programmatic Usage

```ts
import { inferType } from "autotype-js";

const obj = { id: 1, name: "Alice", isActive: true };
console.log(inferType(obj, "UserType"));
```

✅ **Output:**
```ts
type UserType = { id: number; name: string; isActive: boolean };
```

---

## 📜 License

MIT License © 2025 Rashad

---

## 🌟 Contributing

Contributions are welcome! Feel free to submit an issue or pull request.

- **GitHub Repo:** [GitHub](https://github.com/rashadataf/autotype-js.git)
- **NPM Package:** [NPM](https://www.npmjs.com/package/autotype-js)

🚀 **Happy Coding!**