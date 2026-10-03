# TypeScript Functions — Complete Notes

## Chapter: Functions in TypeScript

Functions are one of the most important concepts in TypeScript and JavaScript.

The important thing is not only knowing the syntax of a function. The bigger goal is to develop the **right mindset when designing functions**.

When creating a function, always think:

```text
What input does my function need?
        ↓
What type should that input be?
        ↓
What does the function do?
        ↓
What should the function return?
        ↓
What type should it return?
```

A function can therefore be thought of as:

```text
Input → Function → Output
```

---

# 1. What Is a Function?

A function is a reusable block of code that performs a particular task.

Example:

```ts
function addTwo(value: number): number {
    return value + 2;
}
```

Calling the function:

```ts
let result = addTwo(5);

console.log(result);
```

Output:

```text
7
```

Instead of writing the same calculation repeatedly, we can reuse the function.

---

# 2. Why Do We Need Functions?

Without functions:

```ts
console.log(10 + 2);
console.log(20 + 2);
console.log(30 + 2);
console.log(40 + 2);
```

With a function:

```ts
function addTwo(value: number): number {
    return value + 2;
}

console.log(addTwo(10));
console.log(addTwo(20));
console.log(addTwo(30));
console.log(addTwo(40));
```

The second approach is:

- reusable
- easier to maintain
- easier to test
- easier to understand
- easier for teams to work with

---

# 3. Functions and TypeScript's Type Safety

One of the biggest points from the lesson is that TypeScript should prevent developers from misusing functions.

Consider:

```ts
function addTwo(value) {
    return value + 2;
}
```

If the parameter isn't properly typed, TypeScript may treat it as `any` depending on the compiler configuration.

That weakens TypeScript's type checking.

For example, a value that should logically be a number could accidentally receive a string.

Instead:

```ts
function addTwo(value: number): number {
    return value + 2;
}
```

Now TypeScript understands the contract:

```text
Input  → number
Output → number
```

Therefore:

```ts
addTwo(5);
```

is valid.

But:

```ts
addTwo("5");
```

is rejected.

---

# 4. Function Contract

A useful way to think about a TypeScript function is as a **contract**.

Example:

```ts
function addTwo(value: number): number {
    return value + 2;
}
```

The contract is:

```text
Function name: addTwo

Input:
    value → number

Output:
    number
```

This is particularly useful in team development.

Suppose 20 developers are using the same function.

If everyone knows the contract, they know exactly:

- what they can pass
- what they will receive
- what they shouldn't do

---

# 5. Basic Function Syntax

```ts
function functionName(parameter: type): returnType {
    // function body
}
```

Example:

```ts
function add(a: number, b: number): number {
    return a + b;
}
```

### Parts

```text
function
   ↓
keyword

add
   ↓
function name

(a: number, b: number)
   ↓
parameters

: number
   ↓
return type

{ }
   ↓
function body
```

---

# 6. Function Declaration

A named function is declared using the `function` keyword.

```ts
function displayMessage(): void {
    console.log("Hello TypeScript");
}
```

The function is only defined at this point.

It doesn't execute automatically.

---

# 7. Calling / Invoking a Function

To execute a function, we need to call it.

```ts
displayMessage();
```

Complete example:

```ts
function displayMessage(): void {
    console.log("Hello TypeScript");
}

displayMessage();
```

Output:

```text
Hello TypeScript
```

### Important

Defining a function:

```ts
function displayMessage() {
}
```

doesn't mean it executes.

Calling it:

```ts
displayMessage();
```

causes execution.

---

# 8. Parameters

Parameters are the variables defined inside the function declaration.

```ts
function add(a: number, b: number): number {
    return a + b;
}
```

Here:

```ts
a
b
```

are parameters.

They act as placeholders for values.

---

# 9. Arguments

Arguments are the actual values supplied when calling the function.

```ts
add(10, 20);
```

Here:

```text
Parameters:
a
b

Arguments:
10
20
```

Easy way to remember:

```text
Parameter = placeholder

Argument = actual value
```

---

# 10. Parameter Types

TypeScript allows us to specify the type of every parameter.

Example:

```ts
function signUpUser(
    name: string,
    email: string,
    isPaid: boolean
): void {
    console.log(name);
    console.log(email);
    console.log(isPaid);
}
```

The contract is:

```text
name   → string
email  → string
isPaid → boolean
```

Correct:

```ts
signUpUser(
    "Sharan",
    "sharan@example.com",
    false
);
```

Incorrect:

```ts
signUpUser(
    100,
    200,
    "yes"
);
```

TypeScript detects the mismatch.

---

# 11. Number Parameter

```ts
function addTwo(value: number): number {
    return value + 2;
}
```

Valid:

```ts
addTwo(5);
```

Invalid:

```ts
addTwo("5");
```

---

# 12. String Parameter

```ts
function getUpper(value: string): string {
    return value.toUpperCase();
}
```

Valid:

```ts
console.log(getUpper("hello"));
```

Output:

```text
HELLO
```

Invalid:

```ts
getUpper(4);
```

because:

```text
Expected → string
Received → number
```

---

# 13. Boolean Parameter

```ts
function checkUser(isPaid: boolean): void {
    console.log(isPaid);
}
```

Valid:

```ts
checkUser(true);
```

Invalid:

```ts
checkUser("true");
```

---

# 14. Multiple Parameters

A function can accept multiple parameters.

```ts
function add(
    a: number,
    b: number
): number {
    return a + b;
}
```

Calling:

```ts
console.log(add(10, 20));
```

Output:

```text
30
```

The order of arguments matters.

```ts
function displayUser(
    id: number,
    name: string
): void {
}
```

Correct:

```ts
displayUser(101, "Sharan");
```

Incorrect:

```ts
displayUser("Sharan", 101);
```

---

# 15. Fixed Number of Parameters

Consider:

```ts
function addNumbers(
    a: number,
    b: number
): number {
    return a + b;
}
```

This function expects two arguments.

Correct:

```ts
addNumbers(10, 20);
```

Too many:

```ts
addNumbers(10, 20, 30);
```

Too few:

```ts
addNumbers(10);
```

TypeScript can report compile-time errors because the function's parameter contract expects two values.

---

# 16. Return Value

A function can send a value back to the caller using `return`.

```ts
function add(
    a: number,
    b: number
): number {
    return a + b;
}
```

Now:

```ts
let result = add(10, 20);

console.log(result);
```

Output:

```text
30
```

---

# 17. `return` Is Different From `console.log()`

This distinction is extremely important.

### `console.log()`

Displays something.

```ts
function add(
    a: number,
    b: number
): void {
    console.log(a + b);
}
```

The function prints the result.

### `return`

Sends the result back.

```ts
function add(
    a: number,
    b: number
): number {
    return a + b;
}
```

Now the caller can store or use the result.

```ts
const result = add(10, 20);
```

Think:

```text
console.log()
    ↓
display something

return
    ↓
give something back
```

For automation, `return` is usually much more useful because another part of the test can use the returned value.

---

# 18. Explicit Return Type

We can explicitly specify what a function should return.

```ts
function add(
    a: number,
    b: number
): number {
    return a + b;
}
```

The `: number` says:

> This function must return a number.

---

# 19. Why Explicit Return Types Matter

Suppose:

```ts
function addTwo(value: number): number {
    return value + 2;
}
```

Another developer accidentally changes:

```ts
return value + 2;
```

to:

```ts
return "hello";
```

TypeScript will complain because:

```text
Expected → number
Received → string
```

This is especially valuable in large projects where many developers depend on the same functions.

---

# 20. Type Inference vs Type Annotation

TypeScript can infer many types automatically.

Example:

```ts
let age = 23;
```

TypeScript understands:

```text
age → number
```

This is type inference.

Explicitly specifying:

```ts
let age: number = 23;
```

is type annotation.

The same concept applies to functions.

---

# 21. Should Every Function Type Be Explicit?

Not necessarily.

TypeScript can infer many things.

For example:

```ts
function add(a: number, b: number) {
    return a + b;
}
```

TypeScript can infer:

```text
return type → number
```

However, explicit return types can make important public/team functions clearer:

```ts
function add(a: number, b: number): number {
    return a + b;
}
```

### Practical mindset

Don't add types blindly.

Use inference where the type is obvious.

Use explicit types where they improve clarity or enforce an important contract.

---

# 22. `void`

A function that doesn't return a useful value can use `void`.

```ts
function displayMessage(
    message: string
): void {
    console.log(message);
}
```

Calling:

```ts
displayMessage("Test started");
```

The function performs an action but doesn't return a value.

---

# 23. Default Parameters

A parameter can have a default value.

```ts
function loginUser(
    name: string,
    email: string,
    isPaid: boolean = false
): void {
    console.log(name);
    console.log(email);
    console.log(isPaid);
}
```

Now this works:

```ts
loginUser(
    "Sharan",
    "sharan@example.com"
);
```

Because:

```ts
isPaid = false
```

is automatically used.

We can also provide a value:

```ts
loginUser(
    "Sharan",
    "sharan@example.com",
    true
);
```

Then:

```text
isPaid = true
```

---

# 24. Optional Parameters

A parameter can be made optional using `?`.

```ts
function displayDetails(
    id: number,
    name: string,
    email?: string
): void {
    console.log(id);
    console.log(name);

    if (email) {
        console.log(email);
    }
}
```

Both are valid:

```ts
displayDetails(101, "Sharan", "sharan@example.com");
```

and:

```ts
displayDetails(101, "Sharan");
```

---

# 25. What Does `?` Mean?

```ts
email?: string
```

means:

```text
email may be provided
OR
email may be omitted
```

If omitted, its value is effectively `undefined`.

---

# 26. Optional Parameter Restriction

This is important from the transcript.

A required parameter cannot follow an optional parameter.

Invalid:

```ts
function test(
    id?: number,
    name: string
) {
}
```

Why?

Because TypeScript cannot have a required parameter after an optional one in this normal parameter arrangement.

Correct:

```ts
function test(
    id: number,
    name?: string
) {
}
```

Or:

```ts
function test(
    id?: number,
    name?: string
) {
}
```

### Remember

Once an earlier parameter is optional, parameters after it must also be optional.

---

# 27. Optional vs Default Parameter

### Optional

```ts
function test(name?: string) {
}
```

The parameter may be omitted.

### Default

```ts
function test(name: string = "Guest") {
}
```

The parameter may be omitted, but a fallback value is supplied.

Mental model:

```text
Optional
→ may be omitted

Default
→ may be omitted + fallback value
```

---

# 28. Rest Parameters

Sometimes we don't know how many arguments will be passed.

Example:

```ts
function addNumbers(...nums: number[]): number {
    let sum = 0;

    for (const num of nums) {
        sum += num;
    }

    return sum;
}
```

Now we can call:

```ts
addNumbers(1, 2);
```

or:

```ts
addNumbers(1, 2, 3);
```

or:

```ts
addNumbers(10, 20, 30, 40, 50);
```

There is no fixed number of arguments.

---

# 29. Rest Parameter Syntax

The important syntax is:

```ts
...nums: number[]
```

The three dots:

```ts
...
```

mean:

> Collect the remaining arguments.

The parameter becomes an array.

```ts
nums
```

contains:

```text
[10, 20, 30, 40, 50]
```

That's why we use:

```ts
number[]
```

---

# 30. Rest Parameters With Strings

```ts
function printNames(...names: string[]): void {
    for (const name of names) {
        console.log(name);
    }
}
```

Calling:

```ts
printNames(
    "Sharan",
    "Rahul",
    "John"
);
```

---

# 31. Rest Parameters With Multiple Types

Rest parameters can also use union types.

Example:

```ts
function displayValues(
    ...values: (number | string)[]
): void {
    console.log(values);
}
```

Valid:

```ts
displayValues(
    10,
    "Hello",
    20,
    "World"
);
```

The array can contain both numbers and strings.

---

# 32. Named Functions

A named function has an explicit function name.

```ts
function add(
    a: number,
    b: number
): number {
    return a + b;
}
```

Here:

```text
function → keyword
add      → name
```

Named functions are straightforward and useful for reusable functions with meaningful names.

---

# 33. Anonymous Functions

An anonymous function doesn't have its own function name.

Example:

```ts
let multiply = function(
    a: number,
    b: number
): number {
    return a * b;
};
```

The function has no explicit name.

Instead, it is stored in:

```ts
multiply
```

Calling:

```ts
console.log(multiply(10, 20));
```

Output:

```text
200
```

The transcript explains that anonymous functions can use the same parameter types, optional parameters, default parameters, and rest parameters as named functions.

---

# 34. Why Store an Anonymous Function in a Variable?

Because the variable becomes the reference used to call the function.

```ts
const multiply = function(
    a: number,
    b: number
): number {
    return a * b;
};
```

Then:

```ts
multiply(10, 20);
```

Think:

```text
multiply
   ↓
function
   ↓
call it using multiply()
```

---

# 35. Arrow Functions

Arrow functions are a concise way to write functions.

Basic syntax:

```ts
const add = (
    a: number,
    b: number
): number => {
    return a + b;
};
```

The transcript describes arrow functions as anonymous functions/lambda-style functions because they don't have a traditional function name and are assigned to a variable.

---

# 36. Arrow Function Structure

```ts
const add = (a: number, b: number): number => {
    return a + b;
};
```

Breakdown:

```text
const add
   ↓
variable

(a: number, b: number)
   ↓
parameters

: number
   ↓
return type

=>
   ↓
arrow / fat-arrow notation

{ }
   ↓
function body
```

---

# 37. Arrow Function vs Named Function

### Named function

```ts
function add(
    a: number,
    b: number
): number {
    return a + b;
}
```

### Arrow function

```ts
const add = (
    a: number,
    b: number
): number => {
    return a + b;
};
```

Both can perform the same operation.

The syntax is different.

---

# 38. Arrow Functions and Automation

The source specifically emphasizes that arrow functions are used frequently in TypeScript and automation.

You'll see them frequently with:

```ts
forEach()
```

```ts
map()
```

Playwright callbacks:

```ts
test("login test", async ({ page }) => {
    // test code
});
```

and event/callback-style APIs.

Therefore:

> **Arrow functions are HIGH PRIORITY for your Playwright preparation.**

---

# 39. Implicit Return

An arrow function can be shortened when it contains a single expression.

Instead of:

```ts
const add = (
    a: number,
    b: number
): number => {
    return a + b;
};
```

we can write:

```ts
const add = (
    a: number,
    b: number
): number => a + b;
```

This is called an **implicit return**.

The expression after `=>` is automatically returned.

---

# 40. Explicit vs Implicit Return

### Explicit

```ts
const add = (
    a: number,
    b: number
): number => {
    return a + b;
};
```

### Implicit

```ts
const add = (
    a: number,
    b: number
): number => a + b;
```

Use implicit return when the function is very simple.

If the function contains multiple statements, use braces:

```ts
const calculate = (value: number): number => {
    const result = value + 10;

    console.log(result);

    return result;
};
```

---

# 41. Arrow Functions With Optional Parameters

```ts
const displayDetails = (
    id: number,
    name: string,
    email?: string
): void => {
    console.log(id);
    console.log(name);

    if (email) {
        console.log(email);
    }
};
```

Calling:

```ts
displayDetails(101, "Sharan");
```

is valid.

Also:

```ts
displayDetails(
    101,
    "Sharan",
    "sharan@example.com"
);
```

is valid.

---

# 42. Arrow Functions With Default Parameters

```ts
const calculateDiscount = (
    price: number,
    discount: number = 0.5
): number => {
    return price * discount;
};
```

Calling:

```ts
calculateDiscount(1000, 0.3);
```

uses:

```text
discount = 0.3
```

Calling:

```ts
calculateDiscount(1000);
```

uses:

```text
discount = 0.5
```

---

# 43. Arrow Functions With Rest Parameters

```ts
const findElements = (
    ...elements: number[]
): number => {
    return elements.length;
};
```

Calling:

```ts
console.log(findElements(1, 2, 3));
```

Output:

```text
3
```

Calling:

```ts
console.log(findElements(1, 2, 3, 4, 5));
```

Output:

```text
5
```

---

# 44. Callback Functions

A callback is a function passed as an argument to another function.

Example:

```ts
const numbers = [1, 2, 3];

numbers.forEach((number) => {
    console.log(number);
});
```

Here:

```ts
(number) => {
    console.log(number);
}
```

is a callback function.

The callback is executed for each element.

---

# 45. `map()` and Callback Functions

Example:

```ts
const heroes = [
    "Thor",
    "Spider-Man",
    "Iron Man"
];

const result = heroes.map((hero) => {
    return `Hero: ${hero}`;
});
```

`map()` goes through the array and calls the callback for each element.

Conceptually:

```text
"Thor"
   ↓
callback
   ↓
"Hero: Thor"

"Spider-Man"
   ↓
callback
   ↓
"Hero: Spider-Man"

"Iron Man"
   ↓
callback
   ↓
"Hero: Iron Man"
```

---

# 46. Contextual Typing

One of TypeScript's useful features is that it can infer the type of callback parameters from context.

Example:

```ts
const heroes = [
    "Thor",
    "Spider-Man",
    "Iron Man"
];

heroes.map((hero) => {
    return hero.toUpperCase();
});
```

TypeScript knows:

```text
heroes → string[]
hero   → string
```

Therefore you don't necessarily need:

```ts
(hero: string)
```

TypeScript gets the information from the array.

---

# 47. Contextual Typing With Numbers

```ts
const numbers = [10, 20, 30];

numbers.map((number) => {
    return number * 2;
});
```

TypeScript knows:

```text
number → number
```

because the original array is:

```ts
number[]
```

This becomes extremely useful when working with arrays and automation data.

---

# 48. Explicit Callback Return Type

You can also explicitly specify what the callback should return.

```ts
const heroes = [
    "Thor",
    "Spider-Man",
    "Iron Man"
];

const result = heroes.map(
    (hero): string => {
        return `Hero: ${hero}`;
    }
);
```

Now the callback is required to return a string.

---

# 49. Function Types

A function itself can have a type.

Example:

```ts
let operation: (
    a: number,
    b: number
) => number;
```

This means:

```text
operation must be a function

Input:
number
number

Output:
number
```

We can assign:

```ts
operation = (a, b) => {
    return a + b;
};
```

But this would be invalid:

```ts
operation = (a, b) => {
    return "hello";
};
```

because the expected return type is:

```text
number
```

---

# 50. Function as a Parameter

A function can receive another function.

Example:

```ts
function executeTask(
    task: () => void
): void {
    task();
}
```

Calling:

```ts
executeTask(() => {
    console.log("Task executed");
});
```

Here:

```ts
task: () => void
```

means:

```text
task must be a function
that takes no parameters
and returns nothing
```

This is a function type.

---

# 51. `void` vs `never`

These are not the same.

## `void`

The function completes normally but doesn't return a useful value.

```ts
function logMessage(
    message: string
): void {
    console.log(message);
}
```

Flow:

```text
function executes
       ↓
function finishes
       ↓
no return value
```

## `never`

The function never successfully returns.

Example:

```ts
function handleError(
    message: string
): never {
    throw new Error(message);
}
```

Flow:

```text
function executes
       ↓
error thrown
       ↓
function doesn't successfully return
```

---

# 52. `never` in Error Handling

The transcript demonstrates `never` using a function that throws an error.

```ts
function handleError(
    message: string
): never {
    throw new Error(message);
}
```

`never` can represent functions that:

- always throw
- terminate execution
- never successfully return

This is an advanced concept compared with basic function usage.

For your Playwright learning, understand the difference but don't spend a large amount of time practicing `never`.

---

# 53. Union Return Types

A function may sometimes return different types.

Example:

```ts
function getValue(
    value: number
): boolean | string {

    if (value > 5) {
        return true;
    }

    return "200";
}
```

Possible results:

```text
boolean
OR
string
```

The `|` represents a union type.

This topic becomes more important when you study union types in depth.

---

# 54. Function Overloading

Function overloading allows the same function name to support different call signatures.

The function name remains the same, but the accepted parameter combinations can differ.

For example:

```ts
function getInfo(id: number): number;
function getInfo(name: string): string;
```

These are overload signatures.

The implementation is written separately.

---

# 55. Function Signature

A function signature describes the function without its implementation/body.

Example:

```ts
function getInfo(id: number): number;
```

There is no body:

```ts
{
}
```

The signature describes:

```text
Function name → getInfo
Input         → number
Output        → number
```

---

# 56. Steps in Function Overloading

The transcript explains three main steps.

### Step 1 — Write signatures

```ts
function add(a: number, b: number): number;
function add(a: number, b: number, c: number): number;
```

### Step 2 — Write one implementation

```ts
function add(
    a: number,
    b: number,
    c?: number
): number {

    if (c !== undefined) {
        return a + b + c;
    }

    return a + b;
}
```

### Step 3 — Call the function

```ts
console.log(add(10, 20));
```

or:

```ts
console.log(add(10, 20, 30));
```

Same function name, different supported calling patterns.

---

# 57. Why Optional Parameters Are Useful in Overloading

Suppose we support:

```ts
add(10, 20);
```

and:

```ts
add(10, 20, 30);
```

The implementation can use:

```ts
c?: number
```

because `c` is not always supplied.

Then:

```ts
if (c !== undefined) {
    return a + b + c;
}

return a + b;
```

This is how the implementation can support both signatures.

---

# 58. Function Overloading — Importance for You

Function overloading is useful TypeScript knowledge.

However:

> **Do not spend a lot of time mastering it right now.**

For your current goal of learning TypeScript for Playwright:

```text
Functions basics       🔥🔥🔥
Arrow functions        🔥🔥🔥
Parameters              🔥🔥🔥
Return types            🔥🔥🔥
Optional/default        🔥🔥
Rest parameters         🔥🔥
Callbacks               🔥🔥
Function types          🔥
Overloading             🟡
never                   🟡
```

---

# 59. Functions + Arrays

Functions and arrays will frequently appear together.

Example:

```ts
function getBrowsers(): string[] {
    return [
        "Chrome",
        "Firefox",
        "Edge"
    ];
}
```

Then:

```ts
const browsers = getBrowsers();

browsers.forEach((browser) => {
    console.log(browser);
});
```

This combines:

```text
function
+
array
+
return type
+
arrow function
+
callback
+
contextual typing
```

These combinations are much more important for automation than isolated syntax exercises.

---

# 60. Functions + Objects

Functions can return objects.

Example:

```ts
function getUser() {
    return {
        username: "testuser",
        password: "password123"
    };
}
```

Then:

```ts
const user = getUser();

console.log(user.username);
console.log(user.password);
```

Later, when you learn `type` and `interface`, this becomes:

```ts
type User = {
    username: string;
    password: string;
};

function getUser(): User {
    return {
        username: "testuser",
        password: "password123"
    };
}
```

This is extremely relevant to test data.

---

# 61. Functions + Playwright

For your specific goal, functions are important because Playwright test code is often organized into reusable functions and methods.

A simple helper might look like:

```ts
async function login(
    username: string,
    password: string
): Promise<void> {

    await page
        .getByLabel("Username")
        .fill(username);

    await page
        .getByLabel("Password")
        .fill(password);

    await page
        .getByRole("button", {
            name: "Login"
        })
        .click();
}
```

The important function concepts here are:

```text
async
function name
parameters
parameter types
Promise
return type
await
```

You don't need to master `Promise` yet, but you should recognize it.

---

# 62. `async` Functions

For Playwright, you will frequently see:

```ts
async function login() {
    await page.goto("https://example.com");
}
```

`async` indicates that the function works with asynchronous operations.

`await` waits for an asynchronous operation to complete before continuing.

You'll use this constantly in Playwright.

For now:

```text
async → asynchronous function

await → wait for asynchronous operation
```

Don't dive deeply into the JavaScript event loop yet.

---

# 63. `Promise<void>`

You will eventually see:

```ts
async function login(): Promise<void> {
}
```

For now, understand the basic idea:

```text
async function
      ↓
returns a Promise
      ↓
Promise<void>
      ↓
eventually completes without returning a useful value
```

This is important for Playwright, but it can be learned properly when you reach asynchronous TypeScript/Playwright concepts.

---

# 64. Function Design Mindset

Whenever you create a function, ask these questions:

### 1. What is the responsibility?

```text
What single task should this function perform?
```

### 2. What inputs are needed?

```ts
username: string
password: string
```

### 3. What are their types?

```ts
string
number
boolean
```

### 4. Are any parameters optional?

```ts
email?: string
```

### 5. Do optional parameters need a fallback?

```ts
rememberMe: boolean = false
```

### 6. What should the function return?

```ts
: string
```

or:

```ts
: number
```

or:

```ts
: void
```

### 7. Could the function fail without returning?

Potentially:

```ts
: never
```

---

# 65. A Complete Example

```ts
function calculateTotal(
    price: number,
    quantity: number,
    discount: number = 0
): number {

    const total = price * quantity;

    return total - discount;
}
```

Calling:

```ts
const result = calculateTotal(
    100,
    3,
    20
);

console.log(result);
```

Output:

```text
280
```

The function contract is:

```text
price    → number
quantity → number
discount → number, default 0

return   → number
```

---

# 66. Automation-Style Example

```ts
const checkLogin = (
    username: string,
    password: string
): boolean => {

    return (
        username === "admin" &&
        password === "1234"
    );
};
```

Calling:

```ts
const result = checkLogin(
    "admin",
    "1234"
);

console.log(result);
```

Output:

```text
true
```

This is exactly the kind of simple function logic you should practice before moving deeper into Playwright.

---

# 67. Function Classification

You should be able to recognize these:

```text
Functions
│
├── Named Function
│
├── Anonymous Function
│   │
│   └── Arrow Function / Lambda-style syntax
│
├── Function with Parameters
│
├── Function with Return Value
│
├── Function with Optional Parameters
│
├── Function with Default Parameters
│
├── Function with Rest Parameters
│
├── Callback Function
│
├── Function Type
│
└── Function Overloading
```

---

# 68. Most Important Syntax to Memorize

### Named function

```ts
function add(
    a: number,
    b: number
): number {
    return a + b;
}
```

### Anonymous function

```ts
const add = function(
    a: number,
    b: number
): number {
    return a + b;
};
```

### Arrow function

```ts
const add = (
    a: number,
    b: number
): number => {
    return a + b;
};
```

### Arrow implicit return

```ts
const add = (
    a: number,
    b: number
): number => a + b;
```

### Optional parameter

```ts
function display(
    name: string,
    email?: string
): void {
}
```

### Default parameter

```ts
function login(
    username: string,
    remember: boolean = false
): void {
}
```

### Rest parameter

```ts
function add(
    ...numbers: number[]
): number {
    return numbers.reduce(
        (sum, number) => sum + number,
        0
    );
}
```

### Function type

```ts
let operation: (
    a: number,
    b: number
) => number;
```

### Never

```ts
function fail(
    message: string
): never {
    throw new Error(message);
}
```

---

# 69. What You Should Master for Playwright

## 🔥🔥🔥 Must Know

You should be able to write these without looking at notes:

- Function declaration
- Function invocation
- Parameters
- Arguments
- Parameter types
- Return values
- Return types
- `return`
- `console.log()` vs `return`
- `void`
- Named functions
- Arrow functions
- Optional parameters
- Default parameters
- Basic rest parameters

## 🔥🔥 Strongly Understand

- Anonymous functions
- Callbacks
- `forEach()`
- `map()`
- Contextual typing
- Function types
- Functions returning arrays
- Functions returning objects
- Functions accepting objects/arrays

## 🟡 Know the Concept

- Function overloading
- Function signatures
- `never`
- Union return types

## ⚪ Don't Spend Much Time Yet

- Advanced overload design
- Complex callback typing
- Advanced generic function types
- Deep JavaScript function internals
- Advanced `this` behavior
- Advanced functional programming

Those can wait.

---

# 70. The Most Important Mental Model

Don't memorize functions as dozens of separate syntax rules.

Think:

```text
                    FUNCTION
                       │
          ┌────────────┴────────────┐
          ↓                         ↓
       INPUT                      OUTPUT
          │                         │
     parameters                return type
          │                         │
       types                    return value
          │
   ┌──────┼─────────┐
   ↓      ↓         ↓
normal  optional   rest
        default
```

Then function styles:

```text
Named
   ↓
function add() {}

Anonymous
   ↓
const add = function() {}

Arrow
   ↓
const add = () => {}
```

And then:

```text
Functions
    ↓
Callbacks
    ↓
Arrays
    ↓
map / forEach
    ↓
Playwright
```

---

# 71. Final Checklist

Before leaving the Functions chapter, you should be able to explain:

- [ ] What is a function?
- [ ] Why do we need functions?
- [ ] What is a parameter?
- [ ] What is an argument?
- [ ] What is a return value?
- [ ] What is a return type?
- [ ] Difference between `return` and `console.log()`
- [ ] What is `void`?
- [ ] Why type function parameters?
- [ ] What is a named function?
- [ ] What is an anonymous function?
- [ ] What is an arrow function?
- [ ] Why are arrow functions common in automation?
- [ ] What is an optional parameter?
- [ ] What is a default parameter?
- [ ] What is a rest parameter?
- [ ] What is a callback?
- [ ] What is contextual typing?
- [ ] What is a function type?
- [ ] What is `never`?
- [ ] What is function overloading?
- [ ] What is a function signature?
- [ ] Basic understanding of `async` / `await`
- [ ] Recognize `Promise<void>`

---

# 72. For Your TypeScript → Playwright Path

You **do not need to stay on Functions for several days**.

Once you can comfortably write things such as:

```ts
function calculateTotal(
    price: number,
    quantity: number
): number {
    return price * quantity;
}
```

```ts
const checkLogin = (
    username: string,
    password: string
): boolean => {
    return username === "admin" &&
           password === "1234";
};
```

```ts
function displayUser(
    username: string,
    role: string = "user"
): void {
    console.log(username, role);
}
```

and:

```ts
function findNumbers(
    ...numbers: number[]
): number {
    return numbers.length;
}
```

you have covered the important function foundation.

Your next major TypeScript topic should be:

```text
Non-Primitive Types
        ↓
Arrays
        ↓
Tuples
        ↓
Objects
        ↓
Type aliases
        ↓
Interfaces
        ↓
Arrays of objects
        ↓
Destructuring
```

That will connect very naturally with the functions you just learned and will be **more directly useful for Playwright test data and automation code**.

:::fileciteturn18file18