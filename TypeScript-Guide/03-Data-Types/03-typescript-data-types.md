# TypeScript --- Data Types, Type Safety & Type Inference

> Notes covering dynamically typed vs statically typed programming, type
> safety, type annotation, type inference, primitive data types, `any`,
> union types, `void`, functions, and TypeScript execution.

------------------------------------------------------------------------

# 1. JavaScript vs TypeScript

JavaScript is a **dynamically typed** programming language.

TypeScript is a **statically typed superset of JavaScript** that adds a
type system.

The main purpose of TypeScript's type system is to catch type-related
problems during development before the code is executed.

------------------------------------------------------------------------

# 2. Dynamically Typed Programming

In a dynamically typed language, the type of a variable is determined
during **runtime**.

JavaScript is dynamically typed.

## Example

``` javascript
let age = 23;

age = "Sharan";

console.log(age);
```

The variable `age` can hold different types of values.

------------------------------------------------------------------------

# 3. Statically Typed Programming

In a statically typed language, types are checked during
development/compilation before the program runs.

TypeScript provides static type checking.

## Example

``` typescript
let age: number = 23;

age = "Sharan";
```

The above code produces a TypeScript error because `age` was declared as
a `number`.

------------------------------------------------------------------------

# 4. Type Safety

Type safety means that a variable or expression is used according to its
expected type.

TypeScript helps prevent invalid type assignments.

## Example

``` typescript
let age: number = 23;

age = 25;
```

This is valid because both values are numbers.

``` typescript
let age: number = 23;

age = "twenty-three";
```

This is invalid because `"twenty-three"` is a string.

------------------------------------------------------------------------

# 5. `typeof` Operator

JavaScript provides the `typeof` operator to determine the type of a
value at runtime.

## Example

``` typescript
let age = 23;

console.log(typeof age);
```

Output:

``` text
number
```

------------------------------------------------------------------------

# 6. What Is a Type?

A **type** describes what kind of value a variable can contain.

Common types include:

``` text
number
string
boolean
null
undefined
any
void
```

Example:

``` typescript
let age: number = 23;
```

Here:

``` text
age    → variable
number → type
23     → value
```

------------------------------------------------------------------------

# 7. Type Annotation

Type annotation means explicitly specifying the type of a variable.

Syntax:

``` typescript
let variableName: type = value;
```

Example:

``` typescript
let age: number = 23;
let name: string = "Sharan";
let isStudent: boolean = true;
```

------------------------------------------------------------------------

# 8. Type Inference

Type inference means TypeScript automatically determines the type from
the assigned value.

Example:

``` typescript
let age = 23;
```

TypeScript infers:

``` text
age → number
```

Other examples:

``` typescript
let name = "Sharan";
let isLoggedIn = true;
```

TypeScript infers:

``` text
name       → string
isLoggedIn → boolean
```

> **Important:** TypeScript performs type inference during static
> analysis/type checking, not at JavaScript runtime.

------------------------------------------------------------------------

# 9. Type Annotation vs Type Inference

## Type Annotation

The developer explicitly specifies the type.

``` typescript
let age: number = 23;
```

## Type Inference

TypeScript determines the type automatically.

``` typescript
let age = 23;
```

  Feature             Type Annotation          Type Inference
  ------------------- ------------------------ ----------------
  Type specified by   Developer                TypeScript
  Explicit            Yes                      No
  Example             `let age: number = 23`   `let age = 23`

------------------------------------------------------------------------

# 10. Primitive and Non-Primitive Types

Common primitive/built-in types include:

``` text
number
string
boolean
null
undefined
any
void
```

Common non-primitive types include:

``` text
arrays
functions
objects
interfaces
classes
tuples
```

------------------------------------------------------------------------

# 11. Number Type

The `number` type is used for numeric values.

``` typescript
let age: number = 23;
let price: number = 499.99;
let marks: number = 85;
let temperature: number = 32;
```

It can represent integers and floating-point numbers.

------------------------------------------------------------------------

# 12. String Type

The `string` type is used for textual values.

``` typescript
let name: string = "Sharan";
let city: string = "Hyderabad";
let company: string = "Accenture";
```

Strings can use:

``` typescript
"Hello"
```

``` typescript
'Hello'
```

``` typescript
`Hello`
```

------------------------------------------------------------------------

# 13. Template Literals

Template literals use backticks and allow variables to be inserted using
`${}`.

``` typescript
let name = "Sharan";
let age = 23;

let message = `My name is ${name} and I am ${age} years old.`;

console.log(message);
```

Output:

``` text
My name is Sharan and I am 23 years old.
```

------------------------------------------------------------------------

# 14. Boolean Type

The `boolean` type has two values:

``` text
true
false
```

Example:

``` typescript
let isLoggedIn: boolean = true;
let isAdmin: boolean = false;
```

------------------------------------------------------------------------

# 15. Null Type

`null` represents an intentional absence of a value.

``` typescript
let data: null = null;
```

------------------------------------------------------------------------

# 16. Undefined Type

`undefined` represents a value that has not been assigned.

``` typescript
let data: undefined = undefined;
```

Example:

``` typescript
let username;

console.log(username);
```

Output:

``` text
undefined
```

------------------------------------------------------------------------

# 17. `null` vs `undefined`

## `null`

Usually represents an intentionally empty value.

``` typescript
let selectedUser = null;
```

## `undefined`

Usually means a value has not been assigned or is unavailable.

``` typescript
let username;

console.log(username);
```

------------------------------------------------------------------------

# 18. `any` Type

The `any` type allows a variable to hold values of different types.

``` typescript
let value: any = 10;

value = "Hello";

value = true;
```

`any` weakens TypeScript's type safety, so it should generally be used
carefully.

------------------------------------------------------------------------

# 19. Union Types

A union type allows a variable to contain one of several specified
types.

The union operator is:

``` text
|
```

Example:

``` typescript
let value: number | string;
```

This means `value` can contain either a number or a string.

``` typescript
value = 100;
value = "Hello";
```

But:

``` typescript
value = true;
```

is invalid because `boolean` is not part of the union.

------------------------------------------------------------------------

# 20. `any` vs Union Type

`any`:

``` typescript
let value: any;
```

allows values of different types.

Union:

``` typescript
let value: number | string;
```

allows only the specified types.

Example:

``` typescript
let value: number | string;

value = 10;       // Valid
value = "Hello";  // Valid
value = true;     // Error
```

Union types provide more type safety than `any`.

------------------------------------------------------------------------

# 21. Void Type

The `void` type is mainly used for functions that do not return a value.

``` typescript
function greet(): void {
    console.log("Hello");
}
```

------------------------------------------------------------------------

# 22. Function Parameters and Return Types

Function parameters can have type annotations.

``` typescript
function greet(name: string): void {
    console.log(`Hello ${name}`);
}
```

Here:

``` text
name → string
return type → void
```

A function can also return a value:

``` typescript
function sum(x: number, y: number): number {
    return x + y;
}
```

Here:

``` text
x → number
y → number
return value → number
```

------------------------------------------------------------------------

# 23. `console.log()` vs `return`

`console.log()` displays information in the console.

``` typescript
function greet(): void {
    console.log("Hello");
}
```

`return` sends a value back from a function.

``` typescript
function add(a: number, b: number): number {
    return a + b;
}
```

The returned value can be stored:

``` typescript
let result = add(10, 20);

console.log(result);
```

Output:

``` text
30
```

------------------------------------------------------------------------

# 24. TypeScript Execution

TypeScript is generally converted/transpiled into JavaScript.

TypeScript:

``` typescript
let age: number = 23;

console.log(age);
```

Conceptually becomes JavaScript:

``` javascript
let age = 23;

console.log(age);
```

The browser/runtime executes the JavaScript.

TypeScript-specific type information is mainly used during development
and type checking.

------------------------------------------------------------------------

# 25. Combined Example

``` typescript
let age: number = 23;

let name = "Sharan";

let isStudent: boolean = false;

let value: number | string = 100;

value = "Hello";

function add(a: number, b: number): number {
    return a + b;
}

function greet(name: string): void {
    console.log(`Hello ${name}`);
}

let result = add(10, 20);

console.log(age);
console.log(name);
console.log(isStudent);
console.log(value);
console.log(result);

greet("Sharan");
```

This example demonstrates:

``` text
number
string
boolean
type annotation
type inference
union type
function parameters
function return type
void
return
console.log()
template literals
```

------------------------------------------------------------------------

# 26. TypeScript Data Types Summary

  -----------------------------------------------------------------------------------
  Type                    Description             Example
  ----------------------- ----------------------- -----------------------------------
  `number`                Numeric values          `let age: number = 23`

  `string`                Text values             `let name: string = "Sharan"`

  `boolean`               `true` or `false`       `let active: boolean = true`

  `null`                  Intentional empty value `let data: null = null`

  `undefined`             Value not assigned      `let data: undefined = undefined`

  `any`                   Allows different types  `let value: any = 10`

  `void`                  Function with no useful `function test(): void {}`
                          return value            

  Union                   One of multiple         `number \| string`
                          specified types         
  -----------------------------------------------------------------------------------

------------------------------------------------------------------------

# 27. Interview Questions

## Q1. What is the difference between JavaScript and TypeScript?

JavaScript is dynamically typed, while TypeScript adds static typing and
type checking.

## Q2. What is type annotation?

Explicitly specifying a type.

``` typescript
let age: number = 23;
```

## Q3. What is type inference?

TypeScript automatically determines the type.

``` typescript
let age = 23;
```

TypeScript infers `number`.

## Q4. What is type safety?

Type safety helps prevent invalid type assignments.

``` typescript
let age: number = 23;

age = "Hello"; // Error
```

## Q5. What is `any`?

`any` allows values of different types.

``` typescript
let value: any = 10;

value = "Hello";
value = true;
```

## Q6. What is a union type?

A union allows one of several specified types.

``` typescript
let value: number | string;
```

## Q7. What does `|` mean in TypeScript?

It represents a union type.

## Q8. What is `void`?

It is mainly used for functions that do not return a value.

``` typescript
function greet(): void {
    console.log("Hello");
}
```

## Q9. Difference between `console.log()` and `return`?

`console.log()` displays information, while `return` sends a value back
from a function.

## Q10. What happens to TypeScript types after conversion to JavaScript?

TypeScript-specific type annotations are removed from the resulting
JavaScript.

------------------------------------------------------------------------

# 28. Quick Revision

``` text
JavaScript
    ↓
Dynamically typed

TypeScript
    ↓
Static type checking
```

``` text
Type Annotation
    ↓
Developer specifies the type
```

``` typescript
let age: number = 23;
```

``` text
Type Inference
    ↓
TypeScript determines the type
```

``` typescript
let age = 23;
```

``` text
number
    ↓
Numeric values
```

``` text
string
    ↓
Text values
```

``` text
boolean
    ↓
true / false
```

``` text
null
    ↓
Intentional absence of value
```

``` text
undefined
    ↓
Unassigned / unavailable value
```

``` text
any
    ↓
Allows different types
    ↓
Weakens type safety
```

``` text
Union
    ↓
Allows specified types
```

``` typescript
number | string
```

``` text
void
    ↓
Function does not return a value
```

------------------------------------------------------------------------

# 29. TypeScript Examples Useful for Playwright

Since TypeScript is commonly used with Playwright, these concepts will
appear frequently in test automation code.

## String

``` typescript
let username: string = "testuser";
```

## Boolean

``` typescript
let isLoggedIn: boolean = false;
```

## Number

``` typescript
let timeout: number = 5000;
```

## Function Parameters

``` typescript
function login(username: string, password: string): void {
    console.log(username);
    console.log(password);
}
```

## Function Returning a Value

``` typescript
function getUsername(): string {
    return "testuser";
}
```

## Union Type

``` typescript
let browser: string | undefined;

browser = "chromium";

browser = undefined;
```

------------------------------------------------------------------------

# 30. Example Related to Playwright

A simple Playwright-style function could look like:

``` typescript
async function login(
    username: string,
    password: string
): Promise<void> {
    console.log(username);
    console.log(password);
}
```

Here:

``` text
username → string
password → string
Promise<void> → asynchronous function that does not return a useful value
```

These TypeScript concepts form the foundation for writing
TypeScript-based Playwright tests.

------------------------------------------------------------------------

# 31. Mental Model

Think about TypeScript types as rules.

``` text
Variable
   ↓
Has a type
   ↓
Type determines allowed values
   ↓
TypeScript checks those values
   ↓
Invalid assignments produce errors
```

Example:

``` typescript
let age: number = 23;
```

Think:

``` text
age
 ↓
number
 ↓
23 ✅
25 ✅
"Hello" ❌
true ❌
```

For a union:

``` typescript
let value: number | string;
```

Think:

``` text
value
 ↓
number OR string
 ↓
100 ✅
"Hello" ✅
true ❌
```

------------------------------------------------------------------------

# 32. Key Takeaways

1.  JavaScript is dynamically typed.
2.  TypeScript provides static type checking.
3.  Type safety helps prevent invalid type assignments.
4.  Type annotation means explicitly specifying a type.
5.  Type inference means TypeScript determines the type automatically.
6.  `number` is used for numeric values.
7.  `string` is used for text.
8.  `boolean` contains `true` or `false`.
9.  `null` represents an intentional absence of a value.
10. `undefined` represents an unassigned or unavailable value.
11. `any` allows different types but weakens type safety.
12. Union types allow a specific set of possible types.
13. `void` is mainly used for functions that don't return a value.
14. `console.log()` displays information.
15. `return` sends a value back from a function.
16. TypeScript is converted/transpiled to JavaScript for execution.
17. TypeScript type checking happens during development/static analysis.
18. These concepts are foundational for writing TypeScript-based
    Playwright tests.

------------------------------------------------------------------------

# 33. Final Revision Example

``` typescript
let age: number = 23;

let name = "Sharan";

let isWorking: boolean = true;

let value: number | string = 100;

value = "Hello";

function add(a: number, b: number): number {
    return a + b;
}

function greet(name: string): void {
    console.log(`Hello ${name}`);
}

let result = add(10, 20);

console.log(age);
console.log(name);
console.log(isWorking);
console.log(value);
console.log(result);

greet("Sharan");
```

This single example demonstrates:

``` text
number
string
boolean
type annotation
type inference
union type
function parameters
function return type
void
return
console.log()
template literals
```

------------------------------------------------------------------------

# End of Notes
