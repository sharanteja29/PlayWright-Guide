# TypeScript — Inheritance, `super`, Method Overriding & Access Modifiers

> Detailed notes based on the uploaded lesson transcript. The lesson covers inheritance, parent/child classes, constructors in inheritance, method overriding, `super`, parent-typed references, and the `public`, `protected`, and `private` access modifiers.
>
> A few explanations below add TypeScript-specific precision where the spoken lesson simplifies a rule. Those clarifications are labelled so they are not confused with the instructor's examples.

---

## 1. What is inheritance?

**Inheritance** allows one class to reuse the properties and methods of another class. It creates a parent–child relationship between classes and reduces repeated code.

- **Parent class**: the class whose members are inherited.
- **Child class**: the class that extends the parent and can add its own members or customize inherited behavior.

Other names used in the lesson:

| Parent class | Child class |
|---|---|
| Base class | Derived class |
| Superclass | Subclass |

### Why use inheritance?

Suppose `Car` already defines common car details and behavior. `Honda` and `Maruti` can reuse those details instead of redefining them.

```ts
class Car {
  name: string;
  color: string;
  model: string;

  constructor(name: string, color: string, model: string) {
    this.name = name;
    this.color = color;
    this.model = model;
  }

  start(): void {
    console.log("Car started");
  }

  stop(): void {
    console.log("Car stopped");
  }

  displayInformation(): void {
    console.log(`${this.name}, ${this.color}, ${this.model}`);
  }
}

class Honda extends Car {
  year: number;

  constructor(name: string, color: string, model: string, year: number) {
    super(name, color, model);
    this.year = year;
  }

  displayYear(): void {
    console.log(`Year of manufacture: ${this.year}`);
  }
}
```

`extends` establishes the inheritance relationship:

```ts
class Honda extends Car
```

`Honda` inherits the accessible members of `Car` and adds its own `year` property and `displayYear()` method.

**Important:** inheritance does not mean the parent object is copied into the child object as a separate nested object. It means an instance of the derived class has the inherited class behavior and members available through its type and prototype chain.

---

## 2. Parent class and child class constructors

A constructor initializes an object when it is created.

When a child class declares its own constructor, it must call the parent constructor using `super(...)` before it can use `this`.

```ts
class Car {
  name: string;
  color: string;
  model: string;

  constructor(name: string, color: string, model: string) {
    this.name = name;
    this.color = color;
    this.model = model;
  }
}

class Honda extends Car {
  year: number;

  constructor(name: string, color: string, model: string, year: number) {
    super(name, color, model);
    this.year = year;
  }
}
```

### What happens when `new Honda(...)` is executed?

```ts
const honda = new Honda("Honda", "Blue", "City", 2024);
```

1. The `Honda` constructor is entered.
2. `super(name, color, model)` invokes the `Car` constructor.
3. The parent constructor initializes `name`, `color`, and `model`.
4. Control returns to the `Honda` constructor.
5. `this.year = year` initializes the child-specific property.

The child constructor receives the values needed by both classes. It forwards the parent-class values to `super(...)` and initializes its own additional values.

### Rules to remember

- If a derived class has an explicit constructor, it must call `super(...)`.
- The `super(...)` call must happen before using `this` in the derived constructor.
- Pass the arguments in the order and types expected by the parent constructor.
- If the child class does not declare a constructor, JavaScript/TypeScript can provide a default derived constructor that forwards arguments to the parent constructor.

A useful way to think about it: the child constructor coordinates initialization of the parent part and the child-specific part of the instance.

---

## 3. Method overriding

**Method overriding** occurs when a child class provides its own implementation of an inherited method.

The method name and compatible method signature are retained, but the child changes the implementation.

```ts
class Car {
  start(): void {
    console.log("Car started");
  }
}

class Honda extends Car {
  override start(): void {
    console.log("Honda started");
  }
}
```

```ts
const honda = new Honda();
honda.start(); // Honda started
```

Because the object is a `Honda`, the overridden implementation is selected.

### Another example

```ts
class Maruti extends Car {
  override start(): void {
    console.log("Maruti started");
  }
}
```

`Honda` and `Maruti` both inherit from `Car`, but each can provide a different `start()` implementation.

### What can be overridden?

A child class can override an inherited instance method with a compatible signature. TypeScript checks that the override is type-compatible.

**TypeScript tip:** use the `override` keyword when replacing an inherited method. It makes the intention explicit and, with `noImplicitOverride` enabled, helps catch accidental mismatches.

### Do not confuse overriding with overloading

- **Overriding**: a child class replaces/customizes an inherited method implementation.
- **Overloading**: one function or method has multiple permitted call signatures, backed by one implementation.

---

## 4. Inherited methods and child-specific methods

A child object can use:
1. Methods declared in the child class.
2. Inherited methods declared in the parent class.
3. The child's implementation of methods it overrides.

Example:

```ts
class Car {
  start(): void {
    console.log("Car started");
  }

  stop(): void {
    console.log("Car stopped");
  }

  displayInformation(): void {
    console.log("Displaying car information");
  }
}

class Honda extends Car {
  override start(): void {
    console.log("Honda started");
  }

  displayYear(): void {
    console.log("2024");
  }
}

const honda = new Honda();

honda.start();               // Honda started
honda.stop();                // Car stopped
honda.displayInformation();  // Displaying car information
honda.displayYear();         // 2024
```

`start()` is overridden, so the child implementation runs. `stop()` and `displayInformation()` are not overridden, so the inherited parent implementations are used.

### Multiple child classes

One parent class can have multiple child classes:

```ts
class Honda extends Car {
  override start(): void {
    console.log("Honda started");
  }
}

class Maruti extends Car {
  override start(): void {
    console.log("Maruti started");
  }
}
```

Both children reuse `Car` while customizing their own `start()` behavior.

---

## 5. The `super` keyword

In a derived class, `super` refers to the immediate parent class. The lesson demonstrates two main uses.

### Use 1: call the parent constructor

Use `super(...)` inside the child constructor:

```ts
class Employee {
  constructor(public name: string) {}
}

class Tester extends Employee {
  constructor(name: string, public tool: string) {
    super(name);
  }
}
```

### Use 2: call a parent-class method

Use `super.methodName()` inside a child method:

```ts
class Car {
  display(): void {
    console.log("Display from Car");
  }
}

class Honda extends Car {
  override display(): void {
    super.display();
    console.log("Display from Honda");
  }
}

const honda = new Honda();
honda.display();
```

Output:

```text
Display from Car
Display from Honda
```

The normal call `honda.display()` selects the child override. Inside that override, `super.display()` explicitly calls the parent implementation.

### Does `super` access parent properties?

The transcript demonstrates that `super.num` does not work for its example where `num` is a class field declared in the parent and redeclared in the child.

**TypeScript/JavaScript precision:** class fields are initialized as properties on the instance, not as methods on the parent prototype. `super` property lookup is primarily used to access members on the parent prototype (such as methods and accessors); it is not a general mechanism for retrieving a shadowed parent instance field. If both parent and child declare an instance field with the same name, `this.num` refers to the instance's current field and does not provide a way to retrieve a separate hidden parent-field value.

A clearer design is usually to avoid redeclaring the same field, or to give the parent and child values different names. If a parent value must be exposed, provide a parent method/getter designed for that purpose.

### Summary of `super`

| Syntax | Purpose |
|---|---|
| `super(...)` | Calls the immediate parent constructor |
| `super.methodName()` | Calls the immediate parent implementation of a method |
| `super.someField` | Not a general way to retrieve a shadowed parent class field |

`super` is relevant when working with class inheritance.

---

## 6. Parent-class type holding a child-class object

The lesson demonstrates this pattern:

```ts
class Car {
  start(): void {
    console.log("Car started");
  }

  stop(): void {
    console.log("Car stopped");
  }
}

class Honda extends Car {
  year: number;

  constructor(year: number) {
    super();
    this.year = year;
  }

  displayYear(): void {
    console.log(this.year);
  }

  override start(): void {
    console.log("Honda started");
  }
}

const honda: Car = new Honda(2024);
```

This is valid because a `Honda` is also a `Car` (a derived instance can be used where its base type is expected).

### What can be accessed through `honda`?

```ts
honda.start(); // Allowed: declared on Car; Honda's override runs
honda.stop();  // Allowed: declared on Car

// honda.displayYear(); // TypeScript error: not declared on Car
// honda.year;           // TypeScript error: not declared on Car
```

There are two separate ideas:

- **Runtime object:** the actual object is a `Honda`, so overridden methods dispatch to the `Honda` implementation.
- **Compile-time reference type:** the variable is typed as `Car`, so TypeScript only allows members declared on `Car` (and its accessible base contract).

This is commonly called **upcasting** or treating a derived instance as its base type.

### Key rule

A parent-typed variable can refer to a child object, but you can only access members exposed by the variable's declared type.

This does not mean the child-only members have disappeared from the object. They are simply not available through that parent-typed reference without narrowing or a suitable type guard.

If you genuinely need the child-specific member, use a type guard:

```ts
if (honda instanceof Honda) {
  honda.displayYear();
}
```

In this exact example, `honda` is declared as `Car`, and `instanceof Honda` narrows it to `Honda` inside the block.

---

## 7. Access modifiers

Access modifiers control where a class property or method can be accessed.

The lesson covers three TypeScript access modifiers:

- `public`
- `protected`
- `private`

### Comparison

| Modifier | Inside declaring class | In child class | Outside the class |
|---|---:|---:|---:|
| `public` | Yes | Yes | Yes |
| `protected` | Yes | Yes | No |
| `private` | Yes | No | No |

### 7.1 `public`

A public member can be accessed from the class, its subclasses, and external code.

```ts
class Person {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const person = new Person("John");
console.log(person.name); // Allowed
```

`public` is the default visibility in TypeScript. Writing it explicitly is optional.

### 7.2 `protected`

A protected member can be accessed inside the declaring class and its subclasses, but not through an ordinary external object reference.

```ts
class Person {
  protected age: number;

  constructor(age: number) {
    this.age = age;
  }
}

class Employee extends Person {
  showAge(): void {
    console.log(this.age); // Allowed in subclass
  }
}

const employee = new Employee(30);
employee.showAge();

// console.log(employee.age); // Error: protected member
```

### 7.3 `private`

A private member can be accessed only inside the class in which it is declared. A subclass cannot directly access a parent's TypeScript `private` member.

```ts
class Person {
  private ssn: number;

  constructor(ssn: number) {
    this.ssn = ssn;
  }

  showSSN(): void {
    console.log(this.ssn); // Allowed inside Person
  }
}

class Employee extends Person {
  showDetails(): void {
    // console.log(this.ssn); // Error: private in Person
  }
}
```

A private property declared in the child class can be accessed inside that child class, but not from outside it.

### TypeScript-specific note about `private`

TypeScript's ordinary `private` modifier is enforced by the TypeScript type checker. It is not the same as JavaScript's hard runtime-private `#field` syntax. If runtime privacy is required, JavaScript private fields use `#`, for example `#ssn`.

---

## 8. Access modifiers on methods

Access modifiers apply to methods as well as properties.

```ts
class Account {
  public displayBalance(): void {
    console.log("Balance displayed");
  }

  protected calculateBalance(): number {
    return 1000;
  }

  private validatePin(): boolean {
    return true;
  }
}
```

- `displayBalance()` can be called from outside the class.
- `calculateBalance()` can be used inside `Account` and its subclasses.
- `validatePin()` can only be used inside `Account`.

Do not take the transcript's suggestion that methods should always be public as a strict rule. A method should be public only when it is intended to be part of the class's external API. `private` and `protected` methods are useful for hiding internal implementation details and exposing only the operations callers need.

---

## 9. Putting access modifiers and inheritance together

The lesson's `Person` and `Employee` example can be represented as:

```ts
class Person {
  public name: string;
  protected age: number;
  private ssn: number;

  constructor(name: string, age: number, ssn: number) {
    this.name = name;
    this.age = age;
    this.ssn = ssn;
  }

  public displayInfo(): void {
    console.log(this.name, this.age, this.ssn);
  }
}

class Employee extends Person {
  private employeeId: number;

  constructor(
    name: string,
    age: number,
    ssn: number,
    employeeId: number
  ) {
    super(name, age, ssn);
    this.employeeId = employeeId;
  }

  public showEmployeeDetails(): void {
    console.log(this.name);       // public parent property: allowed
    console.log(this.age);        // protected parent property: allowed
    console.log(this.employeeId); // private child property: allowed

    // console.log(this.ssn);     // Error: private in Person
  }
}

const employee = new Employee("John", 30, 123456, 101);

employee.displayInfo();        // Inherited public method
employee.showEmployeeDetails(); // Child method

console.log(employee.name); // Allowed
// console.log(employee.age); // Error: protected
// console.log(employee.ssn); // Error: private
// console.log(employee.employeeId); // Error: private
```

This demonstrates the visibility rules both inside and outside the class hierarchy.

---

## 10. Applying these concepts to Playwright

Inheritance is useful when multiple Page Object classes share common browser actions.

For example, a `BasePage` can contain reusable navigation behavior, while a `LoginPage` adds login-specific locators and actions.

```ts
import { Page, Locator } from "@playwright/test";

class BasePage {
  constructor(protected page: Page) {}

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }
}

class LoginPage extends BasePage {
  private username: Locator;
  private password: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    super(page);

    this.username = page.getByLabel("Username");
    this.password = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async login(user: string, pass: string): Promise<void> {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginButton.click();
  }
}
```

What this demonstrates:

- `LoginPage extends BasePage`: the page object inherits common navigation behavior.
- `super(page)`: passes the Playwright `Page` object to the base class constructor.
- `protected page`: allows `BasePage` and subclasses to access the page object.
- `private` locators: keeps implementation details inside `LoginPage`.
- `login()` is public by default, so tests can call it.

Example use:

```ts
import { test } from "@playwright/test";

test("user can log in", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate("https://example.com/login");
  await loginPage.login("testuser", "password");
});
```

This is an illustrative Playwright application of the lesson's concepts, not code copied from the transcript. In a real project, use the application's actual accessible labels, URL, and test credentials.

---

## 11. Common mistakes to avoid

1. **Forgetting `extends`:** without `extends`, there is no inheritance relationship.
2. **Forgetting `super(...)`:** an explicit derived-class constructor must call the parent constructor before using `this`.
3. **Calling `this` before `super(...)`:** invalid in a derived constructor.
4. **Passing parent constructor arguments in the wrong order:** the values may be assigned to the wrong properties or cause a type error.
5. **Expecting the parent implementation after overriding:** a normal method call uses the child's override; use `super.methodName()` inside the child when you also need the parent implementation.
6. **Assuming a parent-typed reference exposes child-only members:** the reference type controls what TypeScript lets you access.
7. **Trying to access `protected` or `private` members externally:** those modifiers intentionally restrict access.
8. **Treating `private` as runtime security:** TypeScript's `private` is a type-checking restriction; use `#privateField` for JavaScript runtime-private fields.
9. **Using inheritance for every kind of reuse:** if classes do not have a genuine “is-a” relationship, composition or a shared helper may be clearer.

---

## 12. Quick revision table

| Concept | Remember |
|---|---|
| Inheritance | Reuse and extend another class |
| `extends` | Establishes the child–parent relationship |
| Parent/base/superclass | Class being inherited from |
| Child/derived/subclass | Class that extends the parent |
| `super(...)` | Calls the parent constructor |
| `super.method()` | Calls the parent method implementation |
| Method overriding | Child supplies a compatible implementation of an inherited method |
| Parent-typed reference | Can hold a child instance; exposes members declared on the parent type |
| `public` | Accessible from anywhere |
| `protected` | Accessible in declaring class and subclasses |
| `private` | Accessible only in declaring class |

---

## 13. Practice exercises

### Exercise 1 — Vehicle inheritance

Create a `Vehicle` class with:
- `brand` and `color` properties
- a constructor to initialize them
- a `start()` method

Create a `Bike` class that extends `Vehicle`:
- add a `cc` property
- call the parent constructor using `super(...)`
- override `start()` to print `"Bike started"`
- add a `showCC()` method

Create a `Bike` object and call both inherited and child-specific methods.

### Exercise 2 — Parent reference and narrowing

Using `Vehicle` and `Bike`:
1. Create a variable typed as `Vehicle` and assign a `new Bike(...)` object to it.
2. Call `start()`.
3. Try to access `showCC()` directly and observe the TypeScript error.
4. Use `instanceof Bike` to narrow the type and then call `showCC()`.

Explain why `start()` is available but `showCC()` is not.

### Exercise 3 — Access modifiers

Create a `User` class with:
- `public username`
- `protected email`
- `private password`

Create an `Admin` class extending `User`. Add a method that accesses all three properties and note which access is rejected by TypeScript. Then create an object and try accessing all three properties externally.

---

## 14. Revision checklist

Before moving to the next lesson, make sure you can explain and write these without copying:

- [ ] Define inheritance and explain why it is useful.
- [ ] Use `extends` to create a child class.
- [ ] Write a child constructor that calls `super(...)`.
- [ ] Explain the order of parent and child constructor execution.
- [ ] Override a parent method and explain which implementation runs.
- [ ] Call a parent method with `super.methodName()`.
- [ ] Explain why a parent-typed variable can hold a child object.
- [ ] Explain why child-only members are not accessible through a parent-typed variable.
- [ ] Distinguish `public`, `protected`, and `private`.
- [ ] Apply inheritance and access modifiers in a simple Playwright Page Object.

**Suggested next step:** complete Exercises 1 and 2 in TypeScript first. They test the most important inheritance behavior; then do Exercise 3 to verify access-modifier rules.
