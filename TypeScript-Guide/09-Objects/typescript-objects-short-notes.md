# TypeScript Objects — Short Notes

## Object

Object = related key-value pairs.

```ts
let employee = {
    name: "John",
    age: 30,
    salary: 50000
};
```

## Properties and Methods

```ts
let employee = {
    name: "John",

    getDetails: function() {
        return this.name;
    }
};
```

- `name` → property
- `getDetails()` → method

## `this`

```ts
this.name
```

Refers to the current object's property in the object-method examples.

## Dot Notation

```ts
employee.name;
employee.getDetails();
```

## Bracket Notation

```ts
employee["name"];
employee["getDetails"]();
```

Dynamic access:

```ts
let key = "name";
employee[key];
```

## Modify Properties

```ts
employee.job = "Manager";
```

or:

```ts
employee["job"] = "Manager";
```

## Inline Object Type

```ts
let student: {
    name: string;
    age: number;
} = {
    name: "Sharan",
    age: 23
};
```

## Type Alias

Reusable object structure:

```ts
type User = {
    name: string;
    email: string;
};
```

Use:

```ts
let user: User = {
    name: "Sharan",
    email: "test@test.com"
};
```

## Type Alias + Functions

```ts
function createUser(user: User) {
}

function getUser(): User {
    return {
        name: "Sharan",
        email: "test@test.com"
    };
}
```

## Array of Objects

```ts
type User = {
    username: string;
    role: string;
};

let users: User[] = [
    {
        username: "sharan",
        role: "tester"
    },
    {
        username: "rahul",
        role: "developer"
    }
];
```

## Objects as Function Parameters

```ts
function login(user: User) {
    console.log(user.username);
}
```

## Intersection `&`

Combines types:

```ts
type Personal = {
    name: string;
};

type Contact = {
    email: string;
};

type User = Personal & Contact;
```

## `for...in`

```ts
for (let key in user) {
    console.log(key);
}
```

```text
for...in → keys
for...of → values
```

## Class

Class = blueprint for objects.

```ts
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

let person = new Person("Sharan");
```

Constructor initializes the object and runs when `new` is used.

## `readonly`

Prevents reassignment:

```ts
type User = {
    readonly id: number;
    name: string;
};
```

```ts
user.id = 102; // Error
```

## Optional `?`

Property doesn't have to exist:

```ts
type User = {
    name: string;
    email?: string;
};
```

Both are valid:

```ts
let user1: User = {
    name: "Sharan"
};
```

```ts
let user2: User = {
    name: "Sharan",
    email: "test@test.com"
};
```

## Playwright

Objects are useful for test data:

```ts
type User = {
    username: string;
    password: string;
};

let user: User = {
    username: "sharan",
    password: "1234"
};
```

Use:

```ts
await page.getByLabel("Username").fill(user.username);
await page.getByLabel("Password").fill(user.password);
```

## Mental Model

```text
Object          → one structured entity
Array           → multiple values
Array of objects→ multiple structured entities
Type alias      → reusable structure
Class           → blueprint for objects
```

## Priority

### Must know

- Object
- Properties
- Methods
- Dot notation
- Bracket notation
- `this`
- Type aliases
- Arrays of objects
- Objects as function parameters
- Optional `?`

### Understand

- `readonly`
- `for...in`
- Intersection `&`
- Object return types

### Concept only for now

- Classes
- Constructors
- Advanced OOP
