# TypeScript Classes — Detailed Notes

> Based on the supplied class transcript. This lesson covers class creation, properties, constructors, instance methods, object creation, `readonly` and optional properties, static properties and methods, and constructor/method overloading.

## 1. What is a class?

A **class** is a blueprint used to create objects. It groups:

- **Properties** — data/values that describe an object.
- **Methods** — functions that define what an object can do.
- **Constructor** — special method used to initialize an object when it is created.

For example, a `Student` class can describe student objects with an ID, name, and email, and provide a method to display student information.

### Class naming convention

Use PascalCase (start each class name with an uppercase letter):

```ts
class Student {
  // properties and methods
}
```

TypeScript may allow a lowercase class name, but PascalCase is the standard convention.

## 2. Defining class properties

A property is a field that stores data on a class instance or, when declared `static`, on the class itself.

```ts
class Student {
  studentId: number;
  name: string;
  email?: string;
}
```

The type annotation specifies the kind of value the property is expected to hold.

### Regular properties

A regular instance property belongs to each object created from the class. Different objects can hold different values.

```ts
class Student {
  name: string = "";

  updateName(newName: string): void {
    this.name = newName;
  }
}
```

A regular property can be read and, if it is not `readonly`, reassigned.

> With `strictPropertyInitialization` enabled, TypeScript expects class properties to be initialized where they are declared or in the constructor. The example above initializes `name` at declaration.

## 3. Readonly properties

Use the `readonly` keyword when a property should not be reassigned after initialization.

```ts
class Student {
  readonly studentId: number;

  constructor(id: number) {
    this.studentId = id;
  }
}
```

Key points:

- `readonly` is written when the property is declared.
- A `readonly` property can be initialized at its declaration or assigned in the constructor.
- After initialization, code outside the constructor cannot reassign it.
- You can read the property as many times as needed.
- A regular property can be changed; a `readonly` property cannot be reassigned.

Example:

```ts
const student = new Student(101);

console.log(student.studentId); // 101

// TypeScript error: Cannot assign to 'studentId'
// because it is a read-only property.
// student.studentId = 202;
```

The transcript demonstrates assigning the ID through the constructor and then attempting to change it through an object. TypeScript reports an error for that reassignment.

## 4. Optional properties

Add `?` after a property name to make it optional.

```ts
class Student {
  email?: string;
}
```

An optional property may be absent. When read, its value may be `undefined`, so code should handle that possibility.

### Optional property versus optional constructor parameter

These are separate declarations:

```ts
class Student {
  email?: string;

  constructor(email?: string) {
    this.email = email;
  }
}
```

- `email?: string` on the class makes the property optional.
- `email?: string` in the constructor makes the argument optional.
- If the caller omits the optional argument, its value is `undefined`.
- Making the property optional does **not** automatically make a constructor parameter optional. The parameter also needs `?` (or a default value).

### Checking an optional value

The transcript checks whether an email value exists before displaying it.

```ts
class Student {
  email?: string;

  constructor(email?: string) {
    this.email = email;
  }

  displayEmail(): void {
    if (this.email !== undefined) {
      console.log(`Email: ${this.email}`);
    } else {
      console.log("Email not provided");
    }
  }
}
```

You may also use a truthiness check when an empty string should count as “not provided”:

```ts
if (this.email) {
  console.log(this.email);
} else {
  console.log("Email not provided");
}
```

The explicit `!== undefined` check distinguishes an omitted value from an empty string.

## 5. Constructors

A **constructor** is a special method that runs automatically when an object is created with `new`.

In TypeScript, use the `constructor` keyword. Its name is not the same as the class name.

```ts
class Student {
  readonly studentId: number;
  name: string;
  email?: string;

  constructor(id: number, studentName: string, studentEmail?: string) {
    this.studentId = id;
    this.name = studentName;
    this.email = studentEmail;
  }
}
```

### Purpose of a constructor

- Receives initial values as parameters.
- Assigns those values to the object's properties.
- Sets up the object's initial state.
- Is called automatically by `new`; you do not call it separately.

### Understanding `this`

`this` refers to the current object instance when used in an instance constructor or instance method.

```ts
this.studentId = id;
this.name = studentName;
this.email = studentEmail;
```

The left side (`this.name`) is the class property. The right side (`studentName`) is the constructor parameter.

### Optional constructor parameters

If the email parameter is optional, mark it with `?`:

```ts
constructor(id: number, studentName: string, studentEmail?: string) {
  this.studentId = id;
  this.name = studentName;
  this.email = studentEmail;
}
```

The caller can now omit the third argument.

## 6. Instance methods

An **instance method** is a method called through an object. It can access that object's instance properties using `this`.

```ts
class Student {
  readonly studentId: number;
  name: string;
  email?: string;

  constructor(id: number, studentName: string, studentEmail?: string) {
    this.studentId = id;
    this.name = studentName;
    this.email = studentEmail;
  }

  displayInfo(): void {
    console.log(`Student ID: ${this.studentId}`);
    console.log(`Name: ${this.name}`);

    if (this.email !== undefined) {
      console.log(`Email: ${this.email}`);
    } else {
      console.log("Email not provided");
    }
  }
}
```

`void` indicates that the method does not return a value. It can still perform an action such as printing to the console.

### Calling an instance method

```ts
const student1 = new Student(101, "John");
student1.displayInfo();
```

The method is called with `student1.displayInfo()` because it is an instance method.

## 7. Creating objects from a class

Use the `new` keyword to create an object (also called an **instance**) of a class.

```ts
const student1 = new Student(101, "John");
const student2 = new Student(102, "Bob", "bob@example.com");

student1.displayInfo();
student2.displayInfo();
```

What happens:

1. `new Student(...)` creates a new object.
2. The constructor runs automatically.
3. The supplied arguments are assigned to that object's properties.
4. Each object has its own instance-property values.
5. Instance methods can be called through the object.

### Objects are independent

Objects created from the same class have separate instance state.

```ts
class Counter {
  count: number;

  constructor(initialValue: number) {
    this.count = initialValue;
  }
}

const first = new Counter(10);
const second = new Counter(50);

first.count = 20;

console.log(first.count);  // 20
console.log(second.count); // 50
```

Changing `first.count` does not change `second.count`.

A useful distinction:

- The class defines the structure and behavior.
- Each object stores its own instance-property values.
- Methods are defined by the class and operate on the instance they are called on; they are not best thought of as a separate copied function body for every object.

## 8. Static properties

A **static property** belongs to the class itself rather than to an individual instance. It is useful for data shared by all objects of that class.

Use the `static` keyword:

```ts
class Student {
  static schoolName: string = "Greenwood High School";
}
```

Access it using the class name:

```ts
console.log(Student.schoolName);
```

### Why use a static property?

Suppose every student belongs to the same school. Storing the school name separately on every student object can create unnecessary duplication. A static property represents the shared class-level value.

```ts
class Student {
  readonly studentId: number;
  name: string;

  static schoolName: string = "Greenwood High School";

  constructor(id: number, studentName: string) {
    this.studentId = id;
    this.name = studentName;
  }
}

const student1 = new Student(101, "John");
const student2 = new Student(102, "Bob");

console.log(Student.schoolName);
```

### Updating a static property

Update it through the class name:

```ts
Student.schoolName = "Sunrise Academy";

console.log(Student.schoolName); // Sunrise Academy
```

The updated value is shared because there is one class-level static property, not a separate copy on each instance.

### Important access rule

In TypeScript, access a static member through the class:

```ts
Student.schoolName; // correct

// student1.schoolName; // TypeScript error
```

Do not treat a static property as an ordinary instance property.

## 9. Static methods

A **static method** belongs to the class and is called using the class name. It is useful for operations related to the class as a whole.

```ts
class Student {
  static schoolName: string = "Greenwood High School";

  static changeSchoolName(newName: string): void {
    Student.schoolName = newName;
  }
}

Student.changeSchoolName("Sunrise Academy");
console.log(Student.schoolName);
```

Key points:

- Declare a static method with `static`.
- Call it using the class name.
- It does not require an object to be created.
- A static method can update static properties.
- In TypeScript, do not access a static member through an instance such as `student1.changeSchoolName()`.

### Static versus instance members

| Feature | Instance member | Static member |
|---|---|---|
| Belongs to | Individual object | Class |
| Accessed through | Object name | Class name |
| Example | `student1.name` | `Student.schoolName` |
| Data behavior | Each object has its own value | Shared class-level value |

**A useful TypeScript nuance:** Inside a static method, `this` refers to the class constructor (the class side), not to an instance. The transcript uses the explicit class name, such as `Student.schoolName`, which is clear and beginner-friendly. You may also encounter `this.schoolName` inside a static method.

## 10. Constructor overloading

TypeScript supports constructor overload **signatures**, but a class can have only one constructor implementation.

The transcript's example allows either:
- no arguments (default-style call), or
- two numeric arguments.

```ts
class Calculator {
  constructor();
  constructor(a: number, b: number);
  constructor(a?: number, b?: number) {
    if (a !== undefined && b !== undefined) {
      console.log(`Sum: ${a + b}`);
    } else {
      console.log("Default constructor called");
    }
  }
}
```

### How it works

- The first line declares a signature that accepts no arguments.
- The second line declares a signature that accepts two numbers.
- The final constructor is the single implementation.
- The implementation uses optional parameters so it can handle both supported call shapes.
- The implementation checks whether the arguments were supplied.

Using it:

```ts
const calc1 = new Calculator();
// Output: Default constructor called

const calc2 = new Calculator(10, 20);
// Output: Sum: 30
```

**Important:** You cannot write multiple constructor implementations in one TypeScript class. Write overload signatures first, followed by exactly one implementation.

## 11. Method overloading

Method overloading follows the same general pattern:

- Declare multiple method signatures with the same method name.
- Provide one implementation that can handle all supported argument combinations.

The transcript's `add` example accepts either two or three numbers.

```ts
class Calculator {
  add(a: number, b: number): number;
  add(a: number, b: number, c: number): number;

  add(a: number, b: number, c?: number): number {
    if (c !== undefined) {
      return a + b + c;
    }

    return a + b;
  }
}
```

### Calling the overloaded method

```ts
const calc = new Calculator();

console.log(calc.add(10, 20));    // 30
console.log(calc.add(10, 20, 30)); // 60
```

What happens:

- With two arguments, the two-parameter overload signature matches.
- With three arguments, the three-parameter overload signature matches.
- Both calls run the same implementation.
- The implementation checks whether `c` is `undefined` to decide which calculation to perform.

### Overloading is not multiple implementations

This is the key idea: overload signatures describe the allowed ways to call a method. They do not each contain their own method body. There is one implementation that handles all supported cases.

## 12. Key syntax recap

| Concept | Syntax |
|---|---|
| Class | `class Student { }` |
| Property | `name: string;` |
| Readonly property | `readonly studentId: number;` |
| Optional property | `email?: string;` |
| Constructor | `constructor(...) { }` |
| Current instance | `this.name` |
| Instance method | `displayInfo(): void { }` |
| Create object | `new Student(...)` |
| Static property | `static schoolName: string = "...";` |
| Static method | `static changeName(): void { }` |
| Constructor overload signature | `constructor(a: number, b: number);` |
| Method overload signature | `add(a: number, b: number): number;` |

## 13. Common mistakes to avoid

1. **Making only the property optional:** If a constructor argument should also be omittable, mark the parameter optional too.
2. **Reassigning a readonly property:** It can be initialized at declaration or in the constructor, but cannot be reassigned later.
3. **Using an instance to access a static member:** Use `Student.schoolName`, not `student1.schoolName`.
4. **Calling the constructor directly:** Create an object with `new`; the constructor runs automatically.
5. **Confusing `this` with the class name:** In an instance method, `this` refers to the current object. In a static method, `this` refers to the class side.
6. **Writing multiple constructor bodies:** TypeScript allows overload signatures but only one constructor implementation.
7. **Writing multiple method bodies for overloads:** Use multiple signatures and one implementation.

## 14. How these concepts relate to Playwright

These TypeScript class features are useful when building a maintainable Playwright framework.

- **Classes and objects:** Page Object Model classes represent pages, such as `LoginPage`.
- **Constructors:** A page object constructor commonly receives Playwright's `Page` object and stores it.
- **Instance properties:** Locators and page-specific state belong to a page object instance.
- **Instance methods:** Methods such as `login()` or `open()` perform actions on that page.
- **Readonly:** A property can be marked readonly when its reference should not be reassigned after initialization.
- **Optional properties:** Useful when a configuration value or test-data field may not always be supplied.
- **Static members:** Can hold class-level constants or utility operations, though avoid using shared mutable static state for test-specific data because tests may run in parallel.

Example of a simple Page Object-style class:

```ts
import { Page, Locator } from "@playwright/test";

class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel("Username");
    this.passwordInput = page.getByLabel("Password");
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }
}
```

This is an illustrative framework example extending the class concepts from the lesson.

## 15. Practice exercises

Try these without looking at the solutions first.

### Exercise 1 — Employee class

Create an `Employee` class with:
- `readonly employeeId: number`
- `name: string`
- `email?: string`
- A constructor that initializes all three properties
- A `displayInfo()` method that prints the employee information and handles a missing email

Create two employees: one with an email and one without.

### Exercise 2 — Static company name

Extend the `Employee` class:
- Add a static property called `companyName`.
- Give it an initial value.
- Add a static method `changeCompanyName(newName: string)`.
- Change the company name using the class name and print it.

### Exercise 3 — Calculator overloads

Create a `Calculator` class:
- Add constructor overload signatures for no arguments and two numeric arguments.
- Use one constructor implementation to handle both cases.
- Add `multiply(a, b)` and `multiply(a, b, c)` overload signatures.
- Use one implementation to return the product for either two or three numbers.

## 16. Final revision checklist

- [ ] I can explain what a class, property, method, and object are.
- [ ] I can create a class using `class`.
- [ ] I understand `readonly` and when it can be initialized.
- [ ] I can declare and handle optional properties.
- [ ] I understand why an optional constructor parameter also needs `?`.
- [ ] I can initialize properties through a constructor.
- [ ] I understand `this` in instance methods.
- [ ] I can create multiple independent objects from one class.
- [ ] I can explain the difference between instance and static members.
- [ ] I can access static members through the class name.
- [ ] I understand overload signatures versus the single implementation.
- [ ] I can write constructor and method overloads.

---

**Lesson boundary:** The transcript ends after class properties, constructors, instance methods, static members, and constructor/method overloading. It previews inheritance and the `super` keyword as the next lesson; those topics are not covered in these notes.
