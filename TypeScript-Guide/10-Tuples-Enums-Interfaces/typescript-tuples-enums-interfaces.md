# TypeScript Notes — Tuples, Enums & Interfaces

## 1. Tuples

### What is a Tuple?

A tuple is an array with a fixed structure where TypeScript knows the type of each element based on its position.

```ts
let user: [string, number] = ["Sharan", 23];
```

Structure:

```text
Position 0 → string
Position 1 → number
```

### Array vs Tuple

Normal array:

```ts
let values: (string | number)[] = ["Sharan", 23];
```

Tuple:

```ts
let user: [string, number] = ["Sharan", 23];
```

With the tuple, the first position must be a string and the second must be a number.

```ts
// Valid
let user: [string, number] = ["Sharan", 23];

// Invalid
let user: [string, number] = [23, "Sharan"];
```

### Accessing Tuple Values

```ts
let user: [string, number] = ["Sharan", 23];

console.log(user[0]); // Sharan
console.log(user[1]); // 23
```

TypeScript knows:

```ts
user[0]; // string
user[1]; // number
```

### Tuple with Multiple Types

```ts
let employee: [string, number, boolean] = [
    "Sharan",
    23,
    true
];
```

### Tuple Length

A tuple represents a fixed positional structure.

```ts
let user: [string, number] = ["Sharan", 23];

// Invalid - number is missing
let user1: [string, number] = ["Sharan"];

// Invalid - extra value
let user2: [string, number] = ["Sharan", 23, true];
```

### Tuple in Functions

A function can return a tuple:

```ts
function getUser(): [string, number] {
    return ["Sharan", 23];
}

let user = getUser();

console.log(user[0]);
console.log(user[1]);
```

### Optional Tuple Elements

```ts
let user: [string, number?] = ["Sharan"];
```

The second element can also be supplied:

```ts
let user: [string, number?] = ["Sharan", 23];
```

### Rest Elements in Tuples

```ts
let data: [string, ...number[]] = [
    "Scores",
    10,
    20,
    30
];
```

The first element is a string and the remaining elements are numbers.

### Tuple in Automation

```ts
let testData: [string, string] = [
    "Sharan",
    "1234"
];

console.log(testData[0]); // username
console.log(testData[1]); // password
```

For Playwright test data, an object can often be clearer:

```ts
let testData = {
    username: "Sharan",
    password: "1234"
};
```

### Tuple Mental Model

```text
Array  → collection of values
Tuple  → fixed positional structure
```

---

# 2. Enums

## What is an Enum?

An enum defines a set of named constants or predefined choices.

```ts
enum TestStatus {
    Passed,
    Failed,
    Skipped
}
```

Use:

```ts
TestStatus.Passed
TestStatus.Failed
TestStatus.Skipped
```

Mental model:

```text
Enum → predefined named choices
```

## Numeric Enum

By default, enum members receive numeric values starting at `0`.

```ts
enum TestStatus {
    Passed,
    Failed,
    Skipped
}
```

Values:

```text
Passed  → 0
Failed  → 1
Skipped → 2
```

Example:

```ts
console.log(TestStatus.Passed); // 0
console.log(TestStatus.Failed); // 1
```

## String Enums

String enums are easy to read and useful for automation.

```ts
enum TestStatus {
    Passed = "Passed",
    Failed = "Failed",
    Skipped = "Skipped"
}
```

Now:

```ts
console.log(TestStatus.Passed);
```

outputs:

```text
Passed
```

## Enum as a Variable Type

```ts
enum TestStatus {
    Passed = "Passed",
    Failed = "Failed",
    Skipped = "Skipped"
}

let status: TestStatus = TestStatus.Passed;
```

The variable is expected to use the defined enum values.

## Enum with an Object

```ts
enum TestStatus {
    Passed = "Passed",
    Failed = "Failed",
    Skipped = "Skipped"
}

type Test = {
    testName: string;
    status: TestStatus;
};

let test: Test = {
    testName: "Login Test",
    status: TestStatus.Passed
};
```

## Enum with a Function

```ts
enum Browser {
    Chrome = "Chrome",
    Firefox = "Firefox",
    Edge = "Edge"
}

function launchBrowser(browser: Browser): void {
    console.log(`Launching ${browser}`);
}

launchBrowser(Browser.Chrome);
launchBrowser(Browser.Firefox);
```

## Enum with Switch

```ts
enum TestStatus {
    Passed = "Passed",
    Failed = "Failed",
    Skipped = "Skipped"
}

let status: TestStatus = TestStatus.Failed;

switch (status) {
    case TestStatus.Passed:
        console.log("Test passed");
        break;

    case TestStatus.Failed:
        console.log("Test failed");
        break;

    case TestStatus.Skipped:
        console.log("Test skipped");
        break;
}
```

## Enum vs Union Literal Types

You have already used union literal types:

```ts
type LoginData = {
    testType: "Valid" | "Invalid Password" | "Empty Username";
};
```

A similar set of choices can be represented with an enum:

```ts
enum TestType {
    Valid = "Valid",
    InvalidPassword = "Invalid Password",
    EmptyUsername = "Empty Username"
}

type LoginData = {
    testType: TestType;
};
```

Then:

```ts
let login: LoginData = {
    testType: TestType.Valid
};
```

Mental model:

```text
Union literal → "Valid" | "Invalid Password" | "Empty Username"

Enum → TestType.Valid
        TestType.InvalidPassword
        TestType.EmptyUsername
```

## Enum Mental Model

```text
Enum → a predefined set of named choices
```

---

# 3. Interfaces

## What is an Interface?

An interface defines a contract or structure that an object must follow.

```ts
interface User {
    username: string;
    password: string;
    age: number;
}
```

An object using it must follow that structure:

```ts
let user: User = {
    username: "Sharan",
    password: "1234",
    age: 23
};
```

If a required property is missing or has the wrong type, TypeScript reports an error.

## Interface as a Contract

```text
interface User
      ↓
"You must follow this structure"
      ↓
object
```

## Interface for Login Data

```ts
interface LoginData {
    username: string;
    password: string;
}

let login: LoginData = {
    username: "Sharan",
    password: "1234"
};
```

## Interface vs Type Alias

You already used:

```ts
type LoginData = {
    username: string;
    password: string;
};
```

A similar object structure can be written as:

```ts
interface LoginData {
    username: string;
    password: string;
}
```

For basic object structures, both can describe the structure.

```text
type       → reusable type definition
interface  → reusable object contract/structure
```

## Interface with Multiple Objects

```ts
interface User {
    username: string;
    password: string;
    role: string;
    isActive: boolean;
}

let user1: User = {
    username: "Sharan",
    password: "1234",
    role: "Tester",
    isActive: true
};

let user2: User = {
    username: "Rahul",
    password: "5678",
    role: "Admin",
    isActive: true
};
```

## Interface with Functions

An interface can be used as a function parameter type.

```ts
interface User {
    username: string;
    password: string;
}

function login(user: User): void {
    console.log(user.username);
    console.log(user.password);
}
```

## Optional Properties

Interfaces support optional properties using `?`.

```ts
interface User {
    username: string;
    password: string;
    email?: string;
}
```

Both are valid:

```ts
let user1: User = {
    username: "Sharan",
    password: "1234"
};
```

```ts
let user2: User = {
    username: "Sharan",
    password: "1234",
    email: "sharan@email.com"
};
```

## Readonly Properties

Interfaces support `readonly`.

```ts
interface User {
    readonly id: number;
    username: string;
}

let user: User = {
    id: 101,
    username: "Sharan"
};

console.log(user.id);

// TypeScript error:
// user.id = 102;
```

## Interface with Methods

An interface can describe methods.

```ts
interface User {
    username: string;

    login(): void;
}

let user: User = {
    username: "Sharan",

    login() {
        console.log("User logged in");
    }
};
```

## Interface in Playwright-Style Test Data

```ts
interface LoginData {
    username: string;
    password: string;
    expectedMessage: string;
}

const loginData: LoginData = {
    username: "Sharan",
    password: "1234",
    expectedMessage: "Login successful"
};
```

A function can use the interface:

```ts
function performLogin(data: LoginData): void {
    console.log(data.username);
    console.log(data.password);
}
```

---

# 4. Tuple vs Enum vs Type vs Interface

## Tuple

```ts
let user: [string, number] = ["Sharan", 23];
```

Purpose: fixed positional structure.

```text
Tuple → What type belongs at each position?
```

## Enum

```ts
enum TestStatus {
    Passed = "Passed",
    Failed = "Failed"
}
```

Purpose: predefined named choices.

```text
Enum → What predefined choices are available?
```

## Type Alias

```ts
type User = {
    name: string;
    age: number;
};
```

Purpose: reusable type definition.

```text
Type → What type/structure should this represent?
```

## Interface

```ts
interface User {
    name: string;
    age: number;
}
```

Purpose: reusable object contract/structure.

```text
Interface → What structure must this object follow?
```

---

# 5. Quick Revision

```text
Array
→ collection of values

Tuple
→ fixed positional structure

Object
→ named properties describing one thing

Type Alias
→ reusable type definition

Interface
→ reusable object contract/structure

Enum
→ predefined named choices
```

## Project Priority

### Tuple

Know:

- What a tuple is
- Array vs tuple
- Fixed positional types
- Index access
- Optional tuple elements
- Basic tuple return from functions

### Enum

Know:

- What an enum is
- Numeric enums
- String enums
- Enum as a variable type
- Enum inside objects
- Enum with functions
- Enum with `switch`

### Interface

Know:

- Interface syntax
- Object structure
- Interface vs type alias
- Interfaces with functions
- Optional properties
- `readonly`
- Methods in interfaces
- Using interfaces for Playwright test data

Advanced tuple and enum features are not the main focus for your current project. The important goal is to understand the fundamentals and use them confidently.
