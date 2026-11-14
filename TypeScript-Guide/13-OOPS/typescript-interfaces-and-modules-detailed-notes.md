# TypeScript — Interfaces and Modules

> Detailed notes based on the uploaded lesson transcript. The lesson covers interface basics, optional and readonly properties, method signatures, implementing and extending interfaces, class-versus-interface differences, and TypeScript modules using `export` and `import`.
>
> **Accuracy note:** The transcript uses some simplified comparisons with Java and describes interfaces as containing only abstract methods. TypeScript has a few additional capabilities and distinctions; these are clarified where useful.

---

# Part 1 — Interfaces

## 1. What is an interface?

An **interface** defines the shape or structure that an object must follow. It specifies which properties and methods are expected, together with their types.

Think of an interface as a contract or blueprint:

- It describes what an object should contain.
- It does not normally provide the implementation of the object's behavior.
- A class can implement the interface and provide the actual method implementations.
- Multiple objects can be created with a type that follows the same interface.

### Basic syntax

```ts
interface Person {
  name: string;
  age: number;
}
```

This interface says that a `Person` object must have:
- `name`, with type `string`
- `age`, with type `number`

### Creating an object using an interface

```ts
interface Person {
  name: string;
  age: number;
}

const student: Person = {
  name: "John",
  age: 23
};

console.log(student.name);
console.log(student.age);
```

Notice the difference:

- `Person` defines the expected structure.
- `student` is the actual JavaScript object containing the data.

You do **not** use `new Person()` because an interface is erased during compilation and does not exist as a runtime constructor.

You can create multiple objects that follow the same interface:

```ts
const student1: Person = {
  name: "John",
  age: 23
};

const student2: Person = {
  name: "Smith",
  age: 25
};
```

Each object has its own values, but both satisfy the same contract.

---

## 2. Required properties

Unless marked optional, every property declared in an interface is required when creating an object of that type.

```ts
interface Employee {
  id: number;
  name: string;
  department: string;
}

const employee: Employee = {
  id: 101,
  name: "John",
  department: "QA"
};
```

If you omit `department`, TypeScript reports an error because the object does not satisfy the interface.

The property names and types must match the declared structure.

---

## 3. Optional properties (`?`)

A property becomes optional when you add `?` after its name.

```ts
interface Employee {
  id: number;
  name: string;
  department?: string;
}

const employee1: Employee = {
  id: 101,
  name: "John"
};

const employee2: Employee = {
  id: 102,
  name: "Smith",
  department: "Accounts"
};
```

Both objects are valid.

### What happens when an optional property is missing?

```ts
console.log(employee1.department); // undefined
console.log(employee2.department); // Accounts
```

The property may be absent, so reading it can produce `undefined`.

### Important: handle optional values safely

```ts
if (employee1.department) {
  console.log(employee1.department.toUpperCase());
} else {
  console.log("Department not provided");
}
```

For a string property, a truthiness check is often suitable. If valid values could include `""`, use an explicit check:

```ts
if (employee1.department !== undefined) {
  console.log(employee1.department);
}
```

**Remember:** `department?: string` means the property may be absent. When present, its value must be a string (or `undefined` under the usual optional-property reading rules).

---

## 4. Readonly properties

Use `readonly` when an object property should not be reassigned after the object is created.

```ts
interface Book {
  readonly isbn: string;
  title: string;
  author: string;
}

const book: Book = {
  isbn: "978-1234567890",
  title: "TypeScript Basics",
  author: "Alex"
};

book.title = "Advanced TypeScript"; // Allowed

// book.isbn = "978-0000000000"; // Error
```

`readonly` prevents reassignment through that TypeScript-typed reference. It does not make the entire object deeply immutable.

For example, if a readonly property points to an object, nested properties may still be mutable unless they are also readonly.

---

## 5. Methods in interfaces

An interface can describe methods that an object or implementing class must provide.

A method signature contains:
- method name
- parameters and their types
- return type

It does not contain the method body.

```ts
interface Book {
  readonly isbn: string;
  title: string;

  displayDetails(): void;
}
```

The `displayDetails()` method is part of the contract, but the interface does not say how it should work.

### Implementing the method in an object

```ts
const book: Book = {
  isbn: "978-1234567890",
  title: "TypeScript Basics",

  displayDetails(): void {
    console.log(`${this.title} - ${this.isbn}`);
  }
};

book.displayDetails();
```

Here, the object supplies the method implementation.

### Implementing the method in a class

```ts
interface Book {
  title: string;
  displayDetails(): void;
}

class PrintedBook implements Book {
  title: string;

  constructor(title: string) {
    this.title = title;
  }

  displayDetails(): void {
    console.log(`Book title: ${this.title}`);
  }
}
```

The class must provide the required members, unless it is declared `abstract` and leaves some implementation for a concrete subclass.

### Important clarification

In TypeScript, interfaces describe method signatures, not method implementations. But interfaces are not limited to only methods that would be called “abstract methods” in every other language. They can describe properties, call signatures, construct signatures, index signatures, and more.

---

## 6. Function types in interfaces

An interface can also describe the type of a function.

```ts
interface AddFunction {
  (a: number, b: number): number;
}

const add: AddFunction = (a, b) => {
  return a + b;
};

console.log(add(10, 20)); // 30
```

The interface specifies that the function accepts two numbers and returns a number.

This is useful when multiple functions must follow the same input/output contract.

---

## 7. Extending interfaces

An interface can inherit the structure of another interface using `extends`.

```ts
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
  department: string;
}
```

`Employee` now requires all four properties:
- `name`
- `age`
- `employeeId`
- `department`

Example:

```ts
const employee: Employee = {
  name: "John",
  age: 25,
  employeeId: 101,
  department: "QA"
};
```

### Extending more than one interface

A TypeScript interface can extend multiple interfaces:

```ts
interface HasName {
  name: string;
}

interface HasEmail {
  email: string;
}

interface User extends HasName, HasEmail {
  id: number;
}

const user: User = {
  id: 1,
  name: "John",
  email: "john@example.com"
};
```

This combines the contracts from `HasName` and `HasEmail` with the additional `id` property.

If inherited declarations conflict, TypeScript checks whether they can be combined consistently. Incompatible property types generally produce an error.

---

## 8. A class implementing an interface

Use `implements` when a class promises to satisfy an interface.

```ts
interface Animal {
  name: string;
  sound(): void;
}

class Dog implements Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  sound(): void {
    console.log("Bark");
  }
}

const dog = new Dog("Bruno");
dog.sound();
```

The class supplies the implementation for the interface members.

### What if a class does not implement a required member?

```ts
interface Animal {
  name: string;
  sound(): void;
}

// Error: Dog does not satisfy the Animal contract
class Dog implements Animal {
  name = "Bruno";
}
```

The class is missing the required `sound()` method.

### Can a class skip an interface method?

A normal concrete class cannot simply ignore a required member. It must implement it. It could provide a method with an empty body if that is genuinely appropriate:

```ts
class Dog implements Animal {
  name = "Bruno";

  sound(): void {
    // Intentionally no action
  }
}
```

Alternatively, an `abstract` class can declare that it implements an interface while leaving some members abstract for a concrete subclass to implement. This is more precise than saying that a class can skip a method merely by redeclaring it without a body.

---

## 9. Class inheritance versus interface implementation

These two keywords have different purposes:

| Syntax | Meaning |
|---|---|
| `class Child extends Parent` | A class inherits from another class |
| `interface Child extends Parent` | An interface inherits another interface's contract |
| `class MyClass implements MyInterface` | A class promises to satisfy an interface |

Example combining them:

```ts
interface LoginActions {
  login(username: string, password: string): Promise<void>;
}

class BasePage {
  open(): void {
    console.log("Opening page");
  }
}

class LoginPage extends BasePage implements LoginActions {
  login(username: string, password: string): Promise<void> {
    console.log(`Logging in as ${username}`);
    return Promise.resolve();
  }
}
```

`LoginPage`:
- inherits `open()` from `BasePage`
- implements the `login()` contract from `LoginActions`

### Multiple inheritance clarification

TypeScript classes can extend only one class:

```ts
class Child extends Parent {
}
```

A class can implement multiple interfaces:

```ts
interface Printable {
  print(): void;
}

interface Saveable {
  save(): void;
}

class Report implements Printable, Saveable {
  print(): void {
    console.log("Printing report");
  }

  save(): void {
    console.log("Saving report");
  }
}
```

This is sometimes informally described as multiple inheritance of contracts, but it is not multiple inheritance of class implementations.

---

## 10. Class vs interface

| Feature | Class | Interface |
|---|---|---|
| Main purpose | Define a class and its runtime behavior | Define a type/contract or object shape |
| Properties | Yes | Describes property types |
| Method implementation | Yes | Describes method signatures |
| Constructor | Yes | No runtime constructor |
| Create object using `new` | Yes, if constructible | No |
| `extends` | Can extend one class | Can extend one or more interfaces |
| `implements` | A class can implement interfaces | Not used by interfaces |
| Access modifiers | `public`, `protected`, `private` | Cannot declare these access modifiers on interface members |
| Runtime presence | Exists as JavaScript class | Erased during compilation |

### Key distinction

A class provides implementation. An interface describes the structure that implementation must follow.

An interface cannot be instantiated directly:

```ts
interface User {
  name: string;
}

// const user = new User(); // Error
```

But you can create an object that follows the interface:

```ts
const user: User = {
  name: "John"
};
```

Or create an instance of a class that implements it:

```ts
class AppUser implements User {
  constructor(public name: string) {}
}

const user = new AppUser("John");
```

### A note on the transcript's comparison

The lesson contrasts normal classes, abstract classes, and interfaces. The useful TypeScript distinction is:

- **Concrete class:** can contain implemented methods and can be instantiated if it is not abstract.
- **Abstract class:** can contain implemented methods, properties, and abstract method declarations; cannot be instantiated directly.
- **Interface:** describes a type contract; it has no runtime implementation or constructor.

Interfaces are not universally “more advanced” than abstract classes. They solve different design problems.

---

# Part 2 — Modules

## 11. What is a module?

A **module** is a file whose declarations can be explicitly shared with other files using `export` and brought into another file using `import`.

Modules help organize code and reuse:
- variables and constants
- functions
- classes
- types and interfaces

### Why do we need modules?

Imagine three test files all need the same utility functions:

- `add()`
- `subtract()`
- `formatName()`

Copying the same functions into every test file creates duplication. Instead, put the shared code in one utility module and import it wherever needed.

Benefits:
1. Reuse code instead of repeating it.
2. Keep related functionality in separate files.
3. Make maintenance easier.
4. Keep dependencies explicit.
5. Organize larger automation frameworks.

---

## 12. `export` keyword

A declaration must be exported before another module can import it.

Create a file called `utilities.ts`:

```ts
export const appName: string = "Calculator";

export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export class Formatter {
  toUpper(text: string): string {
    return text.toUpperCase();
  }
}
```

The `export` keyword makes each selected declaration available to other modules.

### Exporting at the end of the file

You can also declare items first and export them later:

```ts
const appName = "Calculator";

function add(a: number, b: number): number {
  return a + b;
}

export { appName, add };
```

Both approaches are valid.

---

## 13. `import` keyword

In another file, import the exported declarations.

Create `main.ts`:

```ts
import { appName, add, subtract, Formatter } from "./utilities";

console.log(appName);
console.log(add(10, 20));
console.log(subtract(20, 5));

const formatter = new Formatter();
console.log(formatter.toUpper("welcome"));
```

### Understand the import path

```ts
import { add } from "./utilities";
```

- `import` brings an exported declaration into the current module.
- `{ add }` names the declaration to import.
- `./` means the current directory.
- `utilities` is the module file name.
- TypeScript tooling commonly resolves the extension automatically, depending on the module configuration.

Other common relative paths:

| Path | Meaning |
|---|---|
| `./file` | A file in the current directory |
| `../file` | A file in the parent directory |
| `./utils/helper` | A file inside a subfolder |

The exact extension rules depend on the TypeScript and runtime module configuration. Follow the project's existing convention.

---

## 14. Named exports and named imports

The previous example uses **named exports**:

```ts
export const appName = "Calculator";
export function add(a: number, b: number): number {
  return a + b;
}
```

Import them by their exported names:

```ts
import { appName, add } from "./utilities";
```

You can import only what you need:

```ts
import { add } from "./utilities";
```

Or import several names in one statement:

```ts
import { appName, add, subtract, Formatter } from "./utilities";
```

This is clearer than writing one import statement per declaration.

### Import using an alias

You can give an imported name a local alias:

```ts
import { add as sum } from "./utilities";

console.log(sum(10, 20));
```

The exported name is `add`; the local name in this file is `sum`.

---

## 15. Default exports

TypeScript also supports a **default export**. A module can have one default export.

`logger.ts`:

```ts
export default function logMessage(message: string): void {
  console.log(message);
}
```

`main.ts`:

```ts
import logMessage from "./logger";

logMessage("Test started");
```

Unlike named imports, a default import does not use curly braces. The importing file can choose its local name:

```ts
import writeLog from "./logger";
```

Named exports and default exports are both valid. Use the convention adopted by your project.

---

## 16. Importing an entire module as a namespace

The transcript briefly mentions importing the module as one object-like namespace.

```ts
import * as utilities from "./utilities";

console.log(utilities.appName);
console.log(utilities.add(10, 20));

const formatter = new utilities.Formatter();
console.log(formatter.toUpper("hello"));
```

Here, `utilities` is a namespace-like object containing the module's named exports.

This is useful when you want to keep imported names grouped together.

---

## 17. Modules and `export {}`

A TypeScript file with a top-level `import` or `export` is treated as a module.

Sometimes you may see this at the bottom of a file:

```ts
export {};
```

This exports no values. It marks the file as a module, rather than a global script, under the relevant TypeScript module-detection rules.

Why it matters:
- In a script file, top-level declarations can participate in shared global scope.
- In a module, declarations are scoped to that module unless exported.
- This can prevent accidental naming conflicts between files.

If a file already contains an `import` or `export`, you generally do not need an additional `export {}`.

---

## 18. Modules in a Playwright project

Modules are heavily used in Playwright frameworks.

A typical project might contain:

```text
tests/
  login.spec.ts

pages/
  LoginPage.ts

utils/
  testData.ts
  helpers.ts
```

### Example: utility module

`utils/testData.ts`:

```ts
export const validUser = {
  username: "testuser",
  password: "example-password"
};

export const invalidUser = {
  username: "wronguser",
  password: "wrong-password"
};
```

### Example: importing test data

`tests/login.spec.ts`:

```ts
import { test, expect } from "@playwright/test";
import { validUser } from "../utils/testData";

test("valid user can log in", async ({ page }) => {
  await page.goto("https://example.com/login");

  await page.getByLabel("Username").fill(validUser.username);
  await page.getByLabel("Password").fill(validUser.password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/dashboard/);
});
```

This is an illustrative example. Replace the URL, labels, credentials, and expected destination with the actual application details. Do not store real passwords in source files; use the project's approved secret-management approach.

### Example: exporting a Page Object

`pages/LoginPage.ts`:

```ts
import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.username = page.getByLabel("Username");
    this.password = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
```

`tests/login.spec.ts`:

```ts
import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("login test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto("https://example.com/login");
  await loginPage.login("testuser", "example-password");
});
```

The key connection:
- `export` makes the Page Object available outside its file.
- `import` allows the test file to use it.
- The class organizes page behavior.
- The module system organizes code across files.

---

## 19. Common mistakes

1. **Using `new` with an interface:** interfaces have no runtime constructor.
2. **Forgetting a required property:** every non-optional interface property must be supplied.
3. **Using `=` instead of `:` in an object literal:** use `name: "John"`, not `name = "John"`.
4. **Reassigning a readonly property:** TypeScript rejects reassignment through a readonly reference.
5. **Forgetting a required method:** a concrete class implementing an interface must satisfy its contract.
6. **Confusing `extends` and `implements`:** classes extend classes; classes implement interfaces; interfaces extend interfaces.
7. **Forgetting `export`:** another module cannot import a declaration that is not exported.
8. **Forgetting `import`:** exporting a declaration does not automatically place it in another file's scope.
9. **Incorrect import path:** check relative paths and filename spelling.
10. **Confusing a module with a class:** a module is a file-level organization and sharing mechanism; a class is a language construct for defining objects and behavior.

---

## 20. Quick revision table

| Concept | Meaning |
|---|---|
| `interface` | Defines the structure or contract of a type |
| Required property | Must be present in a matching object |
| `?` | Makes a property optional |
| `readonly` | Prevents reassignment through the typed reference |
| Method signature | Describes method name, parameters, and return type |
| `extends` on an interface | Inherits another interface's contract |
| `implements` on a class | Requires the class to satisfy an interface |
| `export` | Makes a declaration available to other modules |
| `import` | Brings an exported declaration into the current module |
| `./` | Current directory |
| `../` | Parent directory |
| `export {}` | Marks a file as a module without exporting a value |
| `import * as name` | Imports named exports under one namespace-like name |

---

## 21. Practice exercises

### Exercise 1 — User interface

Create an interface named `User` with:
- `id`: number and readonly
- `name`: string
- `email`: optional string
- `role`: `"Admin" | "Tester" | "Developer"`

Create two user objects:
- one without an email
- one with an email

Print their details. Try changing the `id` and observe the TypeScript error.

### Exercise 2 — Interface and class

Create an interface named `LoginActions` with:
- `username`: string
- `password`: string
- `login()`: returns `void`

Create a class named `LoginPage` that implements `LoginActions`.
- Initialize username and password in the constructor.
- Implement `login()`.
- Create an object and call the method.

Then add a second interface named `LogoutActions` and make `LoginPage` implement both interfaces.

### Exercise 3 — Modules

Create two files:

`mathUtils.ts`
- Export an `add()` function.
- Export a `subtract()` function.
- Export a constant called `appName`.

`main.ts`
- Import all three declarations in one statement.
- Call both functions.
- Print the constant.

Then change the import to use an alias for `add()` and call it through the alias.

---

## 22. Revision checklist

Before moving on, make sure you can do these without copying:

- [ ] Explain what an interface is and why it is useful.
- [ ] Create an object using an interface type.
- [ ] Distinguish required and optional properties.
- [ ] Use `readonly` in an interface.
- [ ] Declare and implement a method described by an interface.
- [ ] Use an interface to describe a function type.
- [ ] Extend one interface from another.
- [ ] Implement one or more interfaces in a class.
- [ ] Explain `extends` versus `implements`.
- [ ] Explain the difference between a class and an interface.
- [ ] Export a variable, function, class, and interface.
- [ ] Import named exports from another file.
- [ ] Use aliases and namespace imports.
- [ ] Explain how modules help organize a Playwright project.

**Recommended priority for Playwright:** modules, imports/exports, interfaces, optional properties, and readonly properties are especially useful. Interfaces are not something you need to force into every test; use them when they make test data, fixtures, or reusable contracts clearer.
