# TypeScript Objects — Detailed Notes

## 1. What is an Object?

An object is a collection of related information represented as **key-value pairs**.

Example:

```ts
let employee = {
    name: "John",
    age: 30,
    salary: 50000,
    job: "Engineer"
};
```

Properties are data. Methods represent actions/behavior.

```text
Object
├── Properties → data
└── Methods    → behavior/actions
```

## 2. Object Literal

Objects can be created directly without a class.

```ts
let employee = {
    name: "John",
    age: 30,
    salary: 50000
};
```

TypeScript infers the property types from their values.

## 3. Properties

Properties are key-value pairs:

```ts
let employee = {
    name: "John",
    age: 30
};
```

`name` and `age` are properties.

## 4. Methods

A function inside an object is a method.

```ts
let employee = {
    name: "John",

    getDetails: function() {
        return "Employee details";
    }
};

employee.getDetails();
```

## 5. `this`

`this` refers to the current object in these object-method examples.

```ts
let employee = {
    name: "John",
    salary: 50000,

    getDetails: function() {
        return `${this.name} - ${this.salary}`;
    }
};
```

`this.name` means the `name` property of the current object.

## 6. `typeof`

```ts
let employee = {
    name: "John"
};

console.log(typeof employee);
```

Output:

```text
object
```

## 7. The `object` Type

TypeScript has an `object` type:

```ts
let employee: object = {
    name: "John",
    age: 30
};
```

It represents a non-primitive value. However, generic `object` does not describe specific properties, so inferred object types, inline types, or type aliases are usually more useful when you need property access.

## 8. Dot Notation

```ts
employee.name;
employee.salary;
employee.getDetails();
```

Syntax:

```ts
objectName.propertyName
```

## 9. Bracket Notation

```ts
employee["name"];
employee["salary"];
employee["getDetails"]();
```

Useful for dynamic property names:

```ts
let key = "name";
console.log(employee[key]);
```

Remember:

```text
.  → normal/known property access
[] → dynamic property access
```

## 10. Modifying Properties

```ts
employee.job = "Manager";
```

or:

```ts
employee["job"] = "Manager";
```

Objects are mutable by default.

## 11. Inline Object Types

You can explicitly describe an object's structure:

```ts
let student: {
    name: string;
    age: number;
    grade: string;
} = {
    name: "Sharan",
    age: 23,
    grade: "A"
};
```

The first part describes the structure; the second supplies actual values.

## 12. Why Inline Types Become Repetitive

Repeated structures become lengthy:

```ts
let student1: {
    name: string;
    age: number;
    grade: string;
} = {
    name: "Sharan",
    age: 23,
    grade: "A"
};
```

```ts
let student2: {
    name: string;
    age: number;
    grade: string;
} = {
    name: "Rahul",
    age: 22,
    grade: "B"
};
```

This leads to type aliases.

## 13. Type Alias

A type alias gives a reusable name to a type structure.

```ts
type User = {
    name: string;
    email: string;
    isActive: boolean;
};
```

Reuse it:

```ts
let user1: User = {
    name: "Sharan",
    email: "sharan@test.com",
    isActive: true
};

let user2: User = {
    name: "Rahul",
    email: "rahul@test.com",
    isActive: false
};
```

A type alias describes structure; it does not create an actual object.

## 14. Type Alias with Functions

```ts
type User = {
    name: string;
    email: string;
    isActive: boolean;
};

function createUser(user: User) {
}

function updateUser(user: User) {
}

function displayUser(user: User) {
}
```

This avoids repeating a large object structure in every function.

## 15. Type Alias as a Return Type

```ts
type User = {
    name: string;
    email: string;
    isActive: boolean;
};

function createUser(): User {
    return {
        name: "Sharan",
        email: "sharan@test.com",
        isActive: true
    };
}
```

TypeScript checks that the returned object matches `User`.

## 16. Arrays of Objects

```ts
let users = [
    {
        username: "sharan",
        role: "tester"
    },
    {
        username: "rahul",
        role: "developer"
    },
    {
        username: "john",
        role: "admin"
    }
];
```

This is an **array of objects**.

## 17. Typed Arrays of Objects

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

Every element must follow the `User` structure.

## 18. Objects as Function Parameters

```ts
type User = {
    username: string;
    password: string;
};

function login(user: User) {
    console.log(user.username);
    console.log(user.password);
}

login({
    username: "sharan",
    password: "1234"
});
```

Related data can be passed as one structured value.

## 19. Objects Returned from Functions

```ts
type User = {
    username: string;
    role: string;
};

function getUser(): User {
    return {
        username: "sharan",
        role: "tester"
    };
}

let user = getUser();

console.log(user.username);
```

## 20. Object Methods with Function Types

An object type can specify a method:

```ts
type Product = {
    name: string;
    price: number;
    getInfo: () => string;
};
```

Implementation:

```ts
let book: Product = {
    name: "Learn JavaScript",
    price: 300,

    getInfo: () => {
        return "Book information";
    }
};
```

## 21. Intersection Types

`&` combines types.

```ts
type Personal = {
    name: string;
    age: number;
};

type Contact = {
    email: string;
    phone: string;
};

type Candidate = Personal & Contact;
```

Now:

```ts
let candidate: Candidate = {
    name: "Scott",
    age: 30,
    email: "scott@test.com",
    phone: "9999999999"
};
```

`Candidate` must contain everything from both types.

## 22. `for...in` with Objects

`for...in` iterates through object keys.

```ts
let book = {
    name: "JavaScript",
    price: 300
};

for (let key in book) {
    console.log(key);
}
```

To access values:

```ts
for (let key in book) {
    console.log(book[key]);
}
```

Remember:

```text
for...in → keys/properties
for...of → values
```

## 23. Classes

A class is a blueprint for creating objects.

```ts
class Person {
    firstName: string;
    lastName: string;

    getFullName(): string {
        return this.firstName + " " + this.lastName;
    }
}
```

## 24. Constructor

A constructor initializes an object when it is created.

```ts
class Person {
    ssn: string;
    firstName: string;
    lastName: string;

    constructor(
        ssn: string,
        firstName: string,
        lastName: string
    ) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
```

In:

```ts
this.ssn = ssn;
```

`this.ssn` is the object property and `ssn` is the constructor parameter.

## 25. Creating Class Objects

Use `new`:

```ts
let person1 = new Person(
    "111",
    "John",
    "Kennedy"
);
```

The constructor runs automatically.

Multiple objects can be created from the same class:

```ts
let person2 = new Person(
    "222",
    "David",
    "Smith"
);
```

## 26. Constructor vs Method

Constructor:
- initializes object data
- runs automatically during `new`

Method:
- represents behavior
- is called explicitly

```ts
let person = new Person(...); // constructor
person.getFullName();         // method
```

## 27. `readonly`

`readonly` prevents reassignment of a property.

```ts
type User = {
    readonly id: number;
    name: string;
};

let user: User = {
    id: 101,
    name: "Sharan"
};
```

Allowed:

```ts
console.log(user.id);
user.name = "Rahul";
```

Not allowed:

```ts
user.id = 102;
```

## 28. Optional Properties — `?`

`?` makes a property optional.

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
    email: "sharan@test.com"
};
```

## 29. `readonly` + Optional

They can be combined:

```ts
type User = {
    readonly id: number;
    name: string;
    email?: string;
    role: string;
};
```

Meaning:

```text
id    → required + readonly
name  → required
email → optional
role  → required
```

## 30. Playwright Connection

Objects are useful for test data.

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

Use the data:

```ts
await page.getByLabel("Username").fill(user.username);
await page.getByLabel("Password").fill(user.password);
```

Multiple users:

```ts
let users: User[] = [
    {
        username: "admin",
        password: "admin123"
    },
    {
        username: "tester",
        password: "test123"
    }
];
```

Then:

```ts
for (let user of users) {
    console.log(user.username);
}
```

## 31. Four Object Approaches

### Object literal

```ts
let user = {
    name: "Sharan"
};
```

### Inline object type

```ts
let user: {
    name: string;
} = {
    name: "Sharan"
};
```

### Type alias

```ts
type User = {
    name: string;
};

let user: User = {
    name: "Sharan"
};
```

### Class

```ts
class User {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

let user = new User("Sharan");
```

## 32. Complete Mental Model

```text
Object
→ one entity + related data

Array
→ multiple values

Array of objects
→ multiple structured entities

Type alias
→ reusable structure

Class
→ blueprint for objects
```

## 33. Checklist

- [ ] Object and key-value pairs
- [ ] Properties
- [ ] Methods
- [ ] Object literals
- [ ] `typeof`
- [ ] `object` type
- [ ] Dot notation
- [ ] Bracket notation
- [ ] Dynamic property access
- [ ] Modifying properties
- [ ] `this`
- [ ] Inline object types
- [ ] Type aliases
- [ ] Arrays of objects
- [ ] Objects as function parameters
- [ ] Objects returned from functions
- [ ] Intersection types
- [ ] `for...in`
- [ ] Classes
- [ ] Constructors
- [ ] `new`
- [ ] `readonly`
- [ ] Optional `?`
- [ ] Playwright test data

## 34. Priority for Playwright

### Must know well

- Objects
- Properties
- Methods
- Dot notation
- Bracket notation
- `this`
- Type aliases
- Optional properties
- Arrays of objects
- Objects as function parameters

### Understand

- Inline object types
- `readonly`
- Object return types
- `for...in`
- Intersection types

### Know conceptually for now

- Classes
- Constructors
- Advanced OOP
