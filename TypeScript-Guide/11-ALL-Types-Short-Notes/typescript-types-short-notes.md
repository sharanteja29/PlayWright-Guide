# TypeScript Types — Short Notes

## 1. Primitive Types

### string
Represents text.

```ts
let username: string = "Sharan";
```

### number
Represents numbers.

```ts
let age: number = 23;
```

### boolean
Represents `true` or `false`.

```ts
let isActive: boolean = true;
```

### null
Explicitly represents no value.

```ts
let value: null = null;
```

### undefined
Represents an undefined value.

```ts
let value: undefined = undefined;
```

---

## 2. `any`

Allows almost any value.

```ts
let value: any = "Sharan";
value = 23;
value = true;
```

It reduces TypeScript's type safety, so avoid it when a better type is available.

---

## 3. Type Annotation

Explicitly specify a variable's type.

```ts
let age: number = 23;
```

## 4. Type Inference

TypeScript can infer the type from the assigned value.

```ts
let age = 23; // inferred as number
```

---

## 5. Union Types

A variable can accept more than one type.

```ts
let value: string | number;

value = "Sharan";
value = 23;
```

---

## 6. Literal Types

Restrict a value to specific exact values.

```ts
let status: "Passed" | "Failed";

status = "Passed";
```

This is useful for predefined choices without an enum.

---

## 7. Arrays

### Array of one type

```ts
let names: string[] = ["Sharan", "Teja"];
let numbers: number[] = [10, 20, 30];
```

### Union array

```ts
let values: (string | number)[] = ["Sharan", 23];
```

### `Array<T>` syntax

```ts
let names: Array<string> = ["Sharan", "Teja"];
```

---

## 8. Tuples

A tuple is a fixed positional structure.

```ts
let user: [string, number] = ["Sharan", 23];
```

Meaning:

```text
index 0 → string
index 1 → number
```

Tuple vs array:

```text
Array  → collection of values
Tuple  → fixed positional structure
```

Optional tuple element:

```ts
let user: [string, number?] = ["Sharan"];
```

---

## 9. Objects

An object contains named properties.

```ts
let user = {
    username: "Sharan",
    age: 23,
    isActive: true
};
```

Access properties:

```ts
user.username;
user["age"];
```

---

## 10. Type Aliases

A type alias gives a reusable name to a type or structure.

```ts
type User = {
    username: string;
    age: number;
    isActive: boolean;
};
```

Use it:

```ts
let user: User = {
    username: "Sharan",
    age: 23,
    isActive: true
};
```

### Optional property

```ts
type User = {
    username: string;
    email?: string;
};
```

### Readonly property

```ts
type User = {
    readonly id: number;
    username: string;
};
```

---

## 11. Function Types

### Parameter type

```ts
function add(a: number, b: number): number {
    return a + b;
}
```

### `void`

Used when a function does not return a useful value.

```ts
function printName(name: string): void {
    console.log(name);
}
```

### Function type

```ts
let operation: (a: number, b: number) => number;

operation = (a, b) => a + b;
```

---

## 12. `never`

Represents a function that never completes normally.

```ts
function handleError(message: string): never {
    throw new Error(message);
}
```

---

## 13. `unknown`

`unknown` can hold an unknown value but is safer than `any`.

```ts
let value: unknown = "Sharan";
```

You generally need to narrow/check an `unknown` value before using it as a specific type.

---

## 14. Enums

An enum defines named predefined choices.

```ts
enum TestStatus {
    Passed = "Passed",
    Failed = "Failed",
    Skipped = "Skipped"
}
```

Use:

```ts
let status: TestStatus = TestStatus.Passed;
```

Enums can also be numeric by default:

```ts
enum Direction {
    Up,
    Down,
    Left,
    Right
}
```

---

## 15. Interfaces

An interface defines a reusable object contract/structure.

```ts
interface User {
    username: string;
    password: string;
    age: number;
}
```

Use:

```ts
let user: User = {
    username: "Sharan",
    password: "1234",
    age: 23
};
```

### Optional property

```ts
interface User {
    username: string;
    email?: string;
}
```

### Readonly property

```ts
interface User {
    readonly id: number;
    username: string;
}
```

### Interface method

```ts
interface User {
    username: string;
    login(): void;
}
```

---

# 16. Type vs Interface

Both can describe object structures.

```ts
type User = {
    name: string;
    age: number;
};
```

```ts
interface User {
    name: string;
    age: number;
}
```

Mental model:

```text
type       → reusable type definition
interface  → reusable object contract/structure
```

---

# 17. Type Relationships

```text
Primitive
 ├── string
 ├── number
 ├── boolean
 ├── null
 └── undefined

Other type features
 ├── any
 ├── unknown
 ├── union
 ├── literal
 ├── array
 ├── tuple
 ├── object
 ├── type alias
 ├── interface
 ├── enum
 ├── function types
 ├── void
 └── never
```

## Quick Mental Model

```text
Array      → collection of values
Tuple      → fixed positional values
Object     → named properties
Type       → reusable type definition
Interface  → reusable object contract
Enum       → predefined named choices
Union      → one of multiple allowed types
Literal    → one of specific exact values
unknown    → value whose type is not yet known
any        → disables most type checking
void       → no useful return value
never      → never completes normally
```
