# 01 - TypeScript Introduction & Setup

> TypeScript fundamentals and setup notes, focused on learning TypeScript for Playwright test automation.

---

## 1. What is TypeScript?

**TypeScript (TS)** is a programming language developed by Microsoft.

It is a **superset of JavaScript**, which means:

- JavaScript code can generally be used in TypeScript.
- TypeScript adds additional features on top of JavaScript.
- The most important addition is **static typing**.
- TypeScript code is ultimately transformed into JavaScript for execution.

### Simple Example

```ts
let age: number = 23;
let username: string = "Sharan";
```

Here:

- `age` must contain a `number`.
- `username` must contain a `string`.

---

# 2. Why Learn TypeScript?

TypeScript is useful because it provides:

- Static type checking
- Better code completion
- Better IDE support
- Easier refactoring
- Easier debugging
- Better readability
- Better maintainability
- Safer large projects

This becomes especially useful in **Playwright automation**, where test projects can contain:

- Many test cases
- Page Object Models
- Fixtures
- Utility functions
- API helpers
- Test data
- Interfaces
- Classes

---

# 3. TypeScript vs JavaScript

| JavaScript | TypeScript |
|---|---|
| Dynamically typed | Statically typed |
| `.js` files | `.ts` files |
| Type errors mostly appear at runtime | Many type errors detected before runtime |
| Less strict | More strict |
| Easier to start | Better for larger projects |
| Used directly by browsers/Node.js | Usually transformed into JavaScript |

### JavaScript

```js
let value = 100;

value = "Hello";
```

JavaScript allows the variable to change from a number to a string.

### TypeScript

```ts
let value: number = 100;

value = "Hello"; // Type error
```

TypeScript detects that `"Hello"` is not a number.

---

# 4. Static Typing vs Dynamic Typing

## Dynamic Typing

JavaScript is dynamically typed.

The type of a variable can change during execution.

```js
let value = 10;

value = "Hello";
value = true;
```

---

## Static Typing

TypeScript allows us to specify the expected type.

```ts
let value: number = 10;

value = 20;

// value = "Hello"; // Type error
```

The `: number` is called a **type annotation**.

---

# 5. Compile Time vs Runtime

One of the important concepts in TypeScript is the difference between:

- Compile time
- Runtime

### Compile Time

TypeScript can identify many problems before the program runs.

Example:

```ts
let age: number = 23;

age = "twenty three";
```

TypeScript reports a type error.

### Runtime

Runtime is when the JavaScript program is actually executed.

The general flow is:

```text
TypeScript Code
      ↓
Type Checking / Compilation
      ↓
JavaScript
      ↓
Execution
```

---

# 6. Is TypeScript Executed Directly?

Normally, TypeScript is **not executed directly by the browser**.

The typical process is:

```text
.ts file
   ↓
TypeScript Compiler
   ↓
.js file
   ↓
JavaScript Runtime
```

For example:

```ts
let message: string = "Hello TypeScript";

console.log(message);
```

After compilation, JavaScript can look like:

```js
let message = "Hello TypeScript";

console.log(message);
```

---

# 7. TypeScript Compiler

The TypeScript compiler is called:

```text
tsc
```

It can:

- Check TypeScript code
- Report type errors
- Convert TypeScript into JavaScript

Example:

```bash
tsc hello.ts
```

This can produce:

```text
hello.js
```

Then JavaScript can be executed using Node.js:

```bash
node hello.js
```

---

# 8. Node.js

**Node.js** is a JavaScript runtime.

It allows JavaScript to run outside the browser.

For example:

```bash
node hello.js
```

Node.js is important for Playwright because Playwright runs in the **Node.js ecosystem**.

---

# 9. npm

**npm** stands for **Node Package Manager**.

It is used to:

- Install packages
- Manage dependencies
- Run scripts
- Manage project configuration

Example:

```bash
npm install
```

Install a package:

```bash
npm install package-name
```

---

# 10. Check Node.js and npm

After installing Node.js, verify the installation.

```bash
node --version
```

```bash
npm --version
```

Example output:

```text
v22.x.x
10.x.x
```

The exact version depends on your installation.

---

# 11. Installing TypeScript

TypeScript can be installed using npm.

### Global installation

```bash
npm install -g typescript
```

Check the installed version:

```bash
tsc --version
```

### Project-local installation

In real projects, dependencies are often installed locally.

```bash
npm install --save-dev typescript
```

This keeps the TypeScript version tied to the project.

---

# 12. VS Code

**Visual Studio Code** is commonly used for TypeScript development.

Useful features include:

- Syntax highlighting
- Auto-completion
- Error detection
- IntelliSense
- Debugging
- Extensions
- Integrated terminal

TypeScript has excellent support in VS Code.

---

# 13. Creating a TypeScript Project

Example project:

```text
typescript-project/
│
├── src/
│   └── hello.ts
│
└── package.json
```

Create a TypeScript file:

```text
hello.ts
```

---

# 14. First TypeScript Program

Create:

```text
hello.ts
```

Add:

```ts
console.log("Hello TypeScript");
```

Compile:

```bash
tsc hello.ts
```

JavaScript file:

```text
hello.js
```

Run it:

```bash
node hello.js
```

Output:

```text
Hello TypeScript
```

---

# 15. Traditional TypeScript Workflow

The traditional workflow is:

```text
Write TypeScript
      ↓
Save .ts file
      ↓
Run tsc
      ↓
JavaScript generated
      ↓
Run JavaScript
```

Example:

```bash
tsc hello.ts
```

Then:

```bash
node hello.js
```

---

# 16. Using TSX

Another tool introduced in many TypeScript courses is **tsx**.

It allows TypeScript files to be executed conveniently without manually compiling them first.

Example:

```bash
tsx hello.ts
```

This is useful during development.

However, remember:

> `tsx` is a development tool. It is not the TypeScript language itself.

---

# 17. Important File Extensions

### JavaScript

```text
.js
```

### TypeScript

```text
.ts
```

### TypeScript + JSX

```text
.tsx
```

For Playwright tests, you will commonly see:

```text
.spec.ts
```

Example:

```text
login.spec.ts
```

`.spec.ts` is not a special TypeScript extension.

It simply means:

```text
spec = specification/test file
ts   = TypeScript
```

---

# 18. Type Annotations

A type annotation explicitly tells TypeScript what type a variable should have.

Syntax:

```ts
let variableName: type = value;
```

Example:

```ts
let username: string = "admin";

let age: number = 23;

let isLoggedIn: boolean = true;
```

---

# 19. Type Inference

TypeScript can automatically determine the type in many cases.

Example:

```ts
let age = 23;

let username = "admin";

let isLoggedIn = true;
```

TypeScript infers:

```text
age         → number
username    → string
isLoggedIn  → boolean
```

Therefore, you do not always need to explicitly write the type.

---

# 20. Type Annotation vs Type Inference

### Explicit Type

```ts
let age: number = 23;
```

### Inferred Type

```ts
let age = 23;
```

Both tell TypeScript that `age` is a number.

For Playwright code, TypeScript's inference often reduces unnecessary code while still providing type safety.

---

# 21. Basic Types

Some common TypeScript types are:

```ts
let username: string = "Sharan";

let age: number = 23;

let isLoggedIn: boolean = true;
```

Other important types include:

```text
string
number
boolean
array
object
tuple
any
unknown
void
null
undefined
never
```

These will be covered in later chapters.

---

# 22. TypeScript and Playwright

Playwright supports both:

- JavaScript
- TypeScript

For this learning path, we are using:

```text
TypeScript + Playwright
```

Example Playwright test:

```ts
import { test, expect } from '@playwright/test';

test('homepage test', async ({ page }) => {
    await page.goto('https://example.com');

    await expect(page).toHaveTitle(/Example/);
});
```

Here TypeScript helps with:

- Autocomplete
- Type checking
- Playwright API suggestions
- Function parameter types
- Object types
- Page Object Models
- Better maintainability

---

# 23. TypeScript + Playwright Architecture

A typical Playwright project may look like:

```text
playwright-project/
│
├── tests/
│   ├── login.spec.ts
│   └── signup.spec.ts
│
├── pages/
│   ├── LoginPage.ts
│   └── HomePage.ts
│
├── utils/
│   └── testData.ts
│
├── playwright.config.ts
│
├── package.json
└── tsconfig.json
```

TypeScript becomes particularly useful when the project grows.

---

# 24. Why TypeScript Matters for Page Object Model

Playwright automation commonly uses the **Page Object Model (POM)**.

Example:

```ts
class LoginPage {
    constructor(private page: Page) {}

    async login(username: string, password: string) {
        // login steps
    }
}
```

This requires knowledge of:

- Classes
- Constructors
- Access modifiers
- Types
- Functions
- Parameters
- `async`
- `await`
- Modules

Therefore, TypeScript fundamentals are directly useful for Playwright.

---

# 25. TypeScript Topics Important for Playwright

You do **not** need to become an advanced TypeScript developer before starting Playwright.

Focus on these topics:

### Core

- Variables
- `let`
- `const`
- Data types
- Type annotations
- Type inference
- Operators

### Functions

- Function declaration
- Parameters
- Return types
- Optional parameters
- Default parameters
- Arrow functions

### Arrays & Objects

- Arrays
- Array methods
- Objects
- Object types
- Destructuring

### Type System

- Interfaces
- Type aliases
- Union types
- Type narrowing
- Optional properties
- `any`
- `unknown`

### OOP

- Classes
- Constructors
- Methods
- Access modifiers
- `public`
- `private`
- `protected`
- `readonly`
- Inheritance

### Async Programming

- Promises
- `async`
- `await`
- Error handling

### Modules

- `import`
- `export`

These are particularly important for Playwright.

---

# 26. TypeScript Topics You Don't Need to Master First

You can postpone advanced TypeScript topics such as:

- Complex generic types
- Advanced conditional types
- Mapped types
- Template literal types
- Declaration files
- Advanced decorators
- Complex compiler internals

Learn them later if your automation project requires them.

---

# 27. Common Misunderstandings

### TypeScript is not Java

TypeScript syntax can sometimes look similar to Java because both support concepts such as:

- Classes
- Types
- Interfaces
- Access modifiers

But TypeScript is based on JavaScript.

```text
TypeScript
    ↓
JavaScript ecosystem
```

It is **not** Java.

---

### TypeScript does not replace JavaScript

TypeScript adds features to JavaScript.

A useful way to think about it:

```text
JavaScript
    +
Static Types
    +
Additional TypeScript Features
    ↓
TypeScript
```

---

### TypeScript is not a separate runtime

Normally:

```text
TypeScript
    ↓
JavaScript
    ↓
Runtime
```

Node.js, browsers, and other JavaScript runtimes execute JavaScript.

---

# 28. TypeScript Development Flow

The complete basic flow:

```text
Write TypeScript
       ↓
TypeScript Compiler / Tooling
       ↓
Type Checking
       ↓
JavaScript
       ↓
Node.js / Browser / Runtime
```

For Playwright:

```text
Write Playwright Test
       ↓
TypeScript
       ↓
Playwright Test Runner
       ↓
Browser Automation
       ↓
Test Result
```

---

# 29. Important Commands

### Check Node.js

```bash
node --version
```

### Check npm

```bash
npm --version
```

### Check TypeScript

```bash
tsc --version
```

### Install TypeScript

```bash
npm install -g typescript
```

### Install TypeScript locally

```bash
npm install --save-dev typescript
```

### Compile TypeScript

```bash
tsc hello.ts
```

### Execute JavaScript

```bash
node hello.js
```

### Execute TypeScript using TSX

```bash
tsx hello.ts
```

---

# 30. Important Terminology

| Term | Meaning |
|---|---|
| TypeScript | Superset of JavaScript with static typing |
| JavaScript | Programming language executed by JS runtimes |
| `tsc` | TypeScript compiler |
| Node.js | JavaScript runtime |
| npm | Node Package Manager |
| Type annotation | Explicitly specifying a type |
| Type inference | TypeScript automatically determining a type |
| Compile time | Before program execution |
| Runtime | When the program is executing |
| `.ts` | TypeScript file |
| `.js` | JavaScript file |
| `.tsx` | TypeScript file supporting JSX |
| `.spec.ts` | Common naming convention for test files |

---

# 31. Quick Revision

### What is TypeScript?

A superset of JavaScript that adds static typing and other development features.

### What is `tsc`?

The TypeScript compiler/type checker.

### What is Node.js?

A runtime for executing JavaScript outside the browser.

### What is npm?

A package manager for the Node.js ecosystem.

### What is type annotation?

Explicitly specifying the expected type.

```ts
let age: number = 23;
```

### What is type inference?

TypeScript automatically determining the type.

```ts
let age = 23;
```

### Does TypeScript run directly in the browser?

Normally, no. It is transformed into JavaScript.

### Does Playwright support TypeScript?

Yes.

### Which TypeScript topics are important for Playwright?

Focus on:

```text
Variables
Data Types
Functions
Arrays
Objects
Interfaces
Type Aliases
Union Types
Classes
Modules
Promises
async / await
Error Handling
```

---

# 32. Learning Direction

The learning path for this project is:

```text
TypeScript Fundamentals
        ↓
Variables & Data Types
        ↓
Functions
        ↓
Arrays & Objects
        ↓
Interfaces & Type Aliases
        ↓
Classes & OOP
        ↓
Modules
        ↓
Promises + async/await
        ↓
Error Handling
        ↓
Playwright
        ↓
Locators
        ↓
Assertions
        ↓
Test Runner
        ↓
Fixtures
        ↓
Page Object Model
        ↓
API Testing
        ↓
Test Data
        ↓
Reports
        ↓
CI/CD
```

---

# 33. Key Takeaways

- TypeScript is a superset of JavaScript.
- TypeScript adds static typing.
- `tsc` is the TypeScript compiler.
- Node.js runs JavaScript outside the browser.
- npm manages Node.js packages.
- `.ts` is the standard TypeScript file extension.
- Type annotations explicitly specify types.
- Type inference allows TypeScript to determine types automatically.
- TypeScript is highly useful for large automation projects.
- Playwright works well with TypeScript.
- Classes, interfaces, functions, modules, and async/await are especially important for Playwright.
- You do not need to master advanced TypeScript before starting Playwright.

---

## Next Chapter

**02 - Variables & Data Types**

Topics:

- `let`
- `const`
- `var`
- Strings
- Numbers
- Booleans
- `null`
- `undefined`
- Arrays
- Objects
- `any`
- `unknown`
- Type annotations
- Type inference
- `readonly`