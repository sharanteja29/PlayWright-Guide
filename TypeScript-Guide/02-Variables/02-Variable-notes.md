# TypeScript — Variables, Scope & Basic Data Types

> Notes from our discussion covering comments, naming conventions, variables, `var` / `let` / `const`, scope, declaration, initialization, redeclaration, reassignment, hoisting, `number`, `boolean`, and type inference.

---

## 1. Code Comments

Comments are ignored during execution. They are used to explain code, document logic, or temporarily disable code.

### Single-Line Comment

```ts
// This is a single-line comment

let age = 23;
```

### Multi-Line Comment

```ts
/*
  This is a multi-line comment.
  It can span multiple lines.
*/

let name = "Sharan";
```

### Commenting Out Code

```ts
let username = "admin";

// let password = "1234";
```

### VS Code Shortcut

```text
Shift + Alt + A
```

---

## 2. Naming Conventions

Use meaningful variable names instead of unclear names.

### Avoid

```ts
let x = 23;
let a = "admin";
let d = 5000;
```

### Prefer

```ts
let age = 23;
let username = "admin";
let salary = 5000;
```

### camelCase

Variables and functions commonly use `camelCase`.

```ts
let firstName = "Sharan";
let totalAmount = 1500;
let isLoggedIn = true;
```

### File Names

Use descriptive file names.

```text
variables.ts
scope.ts
data-types.ts
```

---

# 3. Variables

A variable is a named container used to store a value.

### General Syntax

```text
keyword variableName: dataType = value;
```

### Example

```ts
let age: number = 23;
```

### Breakdown

```text
let       → keyword
age       → variable name
number    → data type
23        → value
```

TypeScript can often determine the type automatically.

```ts
let age = 23;
```

TypeScript infers:

```text
age → number
```

---

# 4. `var`, `let`, and `const`

TypeScript supports three variable declaration keywords:

```text
var
let
const
```

### Modern TypeScript Preference

```text
const → default choice
let   → use when the value needs to change
var   → generally avoid
```

---

# 5. `let`

Use `let` when the value needs to change later.

```ts
let age = 22;

age = 23;

console.log(age);
```

Output:

```text
23
```

`let` allows reassignment.

---

# 6. `const`

Use `const` when the variable should not be reassigned.

```ts
const country = "India";

console.log(country);
```

### Reassignment Is Not Allowed

```ts
const country = "India";

country = "USA"; // ❌ Error
```

### `const` Must Be Initialized

Correct:

```ts
const age: number = 23;
```

Invalid:

```ts
const age: number; // ❌ Error
```

A `const` variable must receive its initial value during declaration.

---

# 7. `var`

`var` is the older JavaScript way of declaring variables.

```ts
var age = 23;
```

TypeScript supports `var`, but modern TypeScript code generally prefers `let` and `const`.

The main reason is that `var` has different scoping and redeclaration behavior.

---

# 8. Scope

Scope determines where a variable can be accessed.

```text
var   → Function scope
let   → Block scope
const → Block scope
```

---

# 9. Block Scope

A block is code surrounded by `{ }`.

```ts
if (true) {
    let message = "Hello";
    const age = 23;

    console.log(message);
    console.log(age);
}
```

`let` and `const` are available only inside their block.

Trying to access them outside causes an error.

```ts
if (true) {
    let message = "Hello";
    const age = 23;
}

console.log(message); // ❌ Error
console.log(age);     // ❌ Error
```

### Example

```ts
let outside = "I am outside";

if (true) {
    let inside = "I am inside";

    console.log(outside); // ✅
    console.log(inside);  // ✅
}

console.log(outside); // ✅
console.log(inside);  // ❌ Error
```

---

# 10. Function Scope of `var`

`var` is function-scoped.

```ts
function test() {
    if (true) {
        var message = "Hello";
    }

    console.log(message); // ✅
}

test();
```

Even though `message` was declared inside the `if` block, it can be accessed within the function.

Compare with `let`:

```ts
function test() {
    if (true) {
        let message = "Hello";
    }

    console.log(message); // ❌ Error
}
```

### Remember

```text
var
└── Function scope

let
└── Block scope

const
└── Block scope
```

---

# 11. Declaration vs Initialization

These are different concepts.

## Declaration

Creating the variable:

```ts
let age;
```

## Initialization

Giving the variable its first value:

```ts
age = 23;
```

## Declaration + Initialization

Both can happen together:

```ts
let age = 23;
```

---

# 12. `var` and `let` Without Initialization

Both `var` and `let` can be declared without immediately assigning a value.

```ts
var age;
let score;

console.log(age);
console.log(score);
```

Output:

```text
undefined
undefined
```

The value can be assigned later.

```ts
let age;

age = 23;

console.log(age);
```

Output:

```text
23
```

---

# 13. `const` Must Be Initialized

Invalid:

```ts
const age; // ❌ Error
```

Correct:

```ts
const age = 23;
```

---

# 14. Redeclaration

**Redeclaration** means declaring another variable with the same name in the same scope.

## `var` Allows Redeclaration

```ts
var age = 22;

var age = 23;

console.log(age);
```

Output:

```text
23
```

## `let` Does Not Allow Redeclaration

```ts
let age = 22;

let age = 23; // ❌ Error
```

## `const` Does Not Allow Redeclaration

```ts
const age = 22;

const age = 23; // ❌ Error
```

### Summary

```text
var   → redeclaration allowed
let   → redeclaration not allowed
const → redeclaration not allowed
```

---

# 15. Reassignment

**Reassignment** means changing the value of an existing variable.

## `let` Allows Reassignment

```ts
let age = 22;

age = 23;

console.log(age);
```

Output:

```text
23
```

## `const` Does Not Allow Reassignment

```ts
const age = 22;

age = 23; // ❌ Error
```

### Redeclaration vs Reassignment

```text
Redeclaration
→ declaring the variable again

Reassignment
→ changing the value of an existing variable
```

---

# 16. Hoisting

Hoisting is JavaScript behavior where declarations are processed before normal code execution.

## `var`

```ts
console.log(age);

var age = 23;
```

Output:

```text
undefined
```

Conceptually, it behaves roughly like:

```ts
var age;

console.log(age);

age = 23;
```

The declaration is hoisted, but the assignment is not.

---

# 17. `let` and `const` with Hoisting

`let` and `const` are also hoisted internally, but they cannot be accessed before initialization.

This period is called the **Temporal Dead Zone (TDZ)**.

```ts
console.log(age);

let age = 23; // ❌ Error
```

Similarly:

```ts
console.log(age);

const age = 23; // ❌ Error
```

Correct:

```ts
const age = 23;

console.log(age); // ✅
```

### Practical Rule

Declare variables before using them.

---

# 18. Number Type

TypeScript uses `number` for numeric values.

There is no separate `int` and `float` type like in some other languages.

```ts
let age: number = 23;
let price: number = 99.99;
let temperature: number = -5;
```

All of these are:

```text
number
```

### Integer and Decimal

```ts
let integerValue: number = 100;
let decimalValue: number = 10.5;
```

Both use the `number` type.

---

# 19. Boolean Type

A boolean has only two possible values:

```text
true
false
```

Example:

```ts
let isLoggedIn: boolean = true;
let isAdmin: boolean = false;
```

Booleans are commonly used in conditions.

```ts
let isLoggedIn = true;

if (isLoggedIn) {
    console.log("User is logged in");
}
```

### Playwright-Style Example

```ts
let isTestPassed: boolean = true;

if (isTestPassed) {
    console.log("Test passed");
}
```

---

# 20. Type Inference

**Type inference** means TypeScript automatically determines a variable's type from its value.

```ts
let age = 23;
```

TypeScript infers:

```text
age → number
```

### Examples

```ts
let name = "Sharan";
// inferred as string

let age = 23;
// inferred as number

let isLoggedIn = true;
// inferred as boolean
```

---

# 21. Explicit Type vs Type Inference

## Explicit Types

You manually specify the type.

```ts
let age: number = 23;
let name: string = "Sharan";
let isLoggedIn: boolean = true;
```

## Type Inference

TypeScript determines the type automatically.

```ts
let age = 23;
let name = "Sharan";
let isLoggedIn = true;
```

When the type is obvious, type inference is usually cleaner.

---

# 22. Type Inference Is Still Type-Safe

TypeScript remembers the inferred type.

```ts
let age = 23;

age = 24; // ✅

age = "twenty-three"; // ❌ Error
```

Why?

```text
age → number
```

Another example:

```ts
let username = "admin";

username = "user1"; // ✅
username = 123;     // ❌ Error
```

Because:

```text
username → string
```

---

# 23. Complete Example

```ts
const username = "Sharan";
let age = 23;
let isLoggedIn = true;

console.log(username);
console.log(age);
console.log(isLoggedIn);

age = 24;

if (isLoggedIn) {
    const message = `${username} is logged in`;

    console.log(message);
}
```

### Inferred Types

```text
username   → string
age        → number
isLoggedIn → boolean
message    → string
```

### Variable Behavior

```text
username
→ const
→ cannot be reassigned

age
→ let
→ can be reassigned

message
→ const
→ block-scoped
```

---

# 24. `var` vs `let` vs `const`

| Feature | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function | Block | Block |
| Declaration without value | Yes | Yes | No |
| Must initialize immediately | No | No | Yes |
| Redeclaration | Yes | No | No |
| Reassignment | Yes | Yes | No |
| Modern TypeScript preference | Avoid | Use when needed | Default choice |

---

# 25. Quick Memory Trick

```text
const
→ value should not be reassigned

let
→ value needs to change

var
→ old style; generally avoid
```

Example:

```ts
const name = "Sharan";

let score = 0;

score = 10;
score = 20;
```

---

# 26. Playwright Connection

These TypeScript concepts appear constantly in Playwright.

```ts
import { test, expect } from "@playwright/test";

test("Login test", async ({ page }) => {
    const username = "admin";
    const password = "1234";

    await page.goto("https://example.com");

    await page.locator("#username").fill(username);
    await page.locator("#password").fill(password);

    await page.locator("#login").click();

    await expect(page.locator("#dashboard")).toBeVisible();
});
```

### What We Are Using

```text
const username
const password
→ values are not reassigned

page
→ provided by Playwright as a parameter

async
→ test performs asynchronous operations

await
→ waits for asynchronous Playwright operations
```

---

# 27. Key Takeaways

1. TypeScript adds static type checking to JavaScript.
2. Variables can be declared using `var`, `let`, or `const`.
3. Prefer `const` by default.
4. Use `let` when a value needs to change.
5. Avoid `var` in modern TypeScript.
6. `var` is function-scoped.
7. `let` and `const` are block-scoped.
8. `let` can be declared without initialization.
9. `const` must be initialized during declaration.
10. `var` allows redeclaration.
11. `let` and `const` do not allow redeclaration.
12. `let` allows reassignment.
13. `const` does not allow reassignment.
14. `var` declarations are hoisted and initially have the value `undefined`.
15. `let` and `const` cannot be accessed before initialization.
16. The period before initialization is called the Temporal Dead Zone.
17. `number` is used for integers and decimal values.
18. `boolean` represents `true` or `false`.
19. Type inference allows TypeScript to determine obvious types automatically.
20. Inferred types are still type-safe.
21. These concepts are frequently used in Playwright tests.

---

# 28. Quick Revision

### `const`

```ts
const name = "Sharan";
```

### `let`

```ts
let age = 23;

age = 24;
```

### Explicit Type

```ts
let price: number = 99.99;
```

### Type Inference

```ts
let score = 100;
```

### Boolean

```ts
let isLoggedIn: boolean = true;
```

### Block Scope

```ts
if (true) {
    let message = "Hello";
    const version = 1;

    console.log(message);
    console.log(version);
}
```

### Playwright-Style Usage

```ts
const username = "admin";
const password = "1234";

await page.locator("#username").fill(username);
await page.locator("#password").fill(password);
```

---

# 29. Learning Path From Here

```text
Variables
    ↓
Data Types
    ↓
Functions
    ↓
Arrays
    ↓
Objects
    ↓
Interfaces
    ↓
Classes / OOP
    ↓
Modules
    ↓
Promises
    ↓
async / await
    ↓
Generics
    ↓
Error Handling
    ↓
Playwright
```

> **For Playwright, pay special attention to:** `const` vs `let`, block scope, type inference, functions, objects, interfaces, `async/await`, and Promises.