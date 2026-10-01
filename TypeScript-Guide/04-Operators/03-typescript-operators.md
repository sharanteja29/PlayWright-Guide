# TypeScript — Operators

> Notes covering arithmetic, assignment, comparison, logical, increment/decrement, and ternary operators.

---

## 1. What Are Operators?

Operators are symbols used to perform operations on values and variables.

They are a fundamental part of programming along with:

- Variables
- Data types
- Operators

```ts
let a = 10;
let b = 5;

let result = a + b;

console.log(result);
```

Output:

```text
15
```

Here, `+` is the operator.

---

# 2. Arithmetic Operators

Arithmetic operators are used for mathematical calculations.

| Operator | Name | Example | Result |
|---|---|---|---|
| `+` | Addition | `10 + 5` | `15` |
| `-` | Subtraction | `10 - 5` | `5` |
| `*` | Multiplication | `10 * 5` | `50` |
| `/` | Division | `10 / 5` | `2` |
| `%` | Modulus / Remainder | `10 % 3` | `1` |
| `**` | Exponentiation | `2 ** 3` | `8` |

### Addition

```ts
let a = 10;
let b = 5;

console.log(a + b);
```

### Subtraction

```ts
console.log(10 - 5);
```

### Multiplication

```ts
console.log(10 * 5);
```

### Division

```ts
console.log(10 / 5);
```

### Modulus `%`

Returns the remainder after division.

```ts
console.log(10 % 3);
```

Output:

```text
1
```

Useful for checking even/odd numbers:

```ts
let num = 10;

console.log(num % 2);
```

### Exponentiation `**`

```ts
console.log(2 ** 3);
```

Output:

```text
8
```

---

# 3. Assignment Operators

Assignment operators assign or update values.

## `=`

```ts
let age = 23;
```

`23` is assigned to `age`.

## `+=`

```ts
let score = 10;

score += 5;

console.log(score);
```

Equivalent to:

```ts
score = score + 5;
```

## `-=`

```ts
let score = 10;

score -= 3;
```

Equivalent to:

```ts
score = score - 3;
```

## `*=`

```ts
let score = 10;

score *= 2;
```

Equivalent to:

```ts
score = score * 2;
```

## `/=`

```ts
let score = 10;

score /= 2;
```

Equivalent to:

```ts
score = score / 2;
```

## `%=`

```ts
let num = 10;

num %= 3;
```

Equivalent to:

```ts
num = num % 3;
```

---

# 4. `let` and Reassignment

A variable declared with `let` can be reassigned.

```ts
let age = 22;

age = 23;

console.log(age);
```

But it cannot be redeclared in the same scope.

```ts
let age = 22;

// Not allowed in the same scope
let age = 23;
```

---

# 5. Comparison / Relational Operators

Comparison operators compare values and return a boolean:

```text
true
```

or

```text
false
```

| Operator | Meaning |
|---|---|
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal to |
| `<=` | Less than or equal to |
| `==` | Equal value |
| `!=` | Not equal value |
| `===` | Strict equality |
| `!==` | Strict not equal |

Examples:

```ts
console.log(10 > 5);   // true
console.log(10 < 5);   // false
console.log(10 >= 10); // true
console.log(10 <= 5);  // false
```

---

# 6. `==` vs `===`

## `==` — Loose Equality

`==` compares values and can perform type conversion.

```ts
console.log(10 == "10");
```

Result:

```text
true
```

## `===` — Strict Equality

`===` checks both value and type.

```ts
console.log(10 === "10");
```

Result:

```text
false
```

Because:

```text
10   → number
"10" → string
```

### Practical rule

Prefer `===` when you want an exact comparison.

```ts
let username = "Sharan";

console.log(username === "Sharan");
```

---

# 7. Not Equal

## `!=`

```ts
console.log(10 != 5);
```

Result:

```text
true
```

## `!==`

Checks whether the value or type is different.

```ts
console.log(10 !== "10");
```

Result:

```text
true
```

---

# 8. Logical Operators

Logical operators combine or reverse conditions.

| Operator | Meaning |
|---|---|
| `&&` | AND |
| `||` | OR |
| `!` | NOT |

---

# 9. AND `&&`

Both conditions must be true.

```ts
let age = 23;
let hasId = true;

console.log(age >= 18 && hasId === true);
```

Result:

```text
true
```

Mental model:

```text
TRUE && TRUE   → TRUE
TRUE && FALSE  → FALSE
FALSE && TRUE  → FALSE
FALSE && FALSE → FALSE
```

---

# 10. OR `||`

At least one condition must be true.

```ts
let isAdmin = false;
let isManager = true;

console.log(isAdmin || isManager);
```

Result:

```text
true
```

Mental model:

```text
TRUE || TRUE   → TRUE
TRUE || FALSE  → TRUE
FALSE || TRUE  → TRUE
FALSE || FALSE → FALSE
```

---

# 11. NOT `!`

`!` reverses a boolean.

```ts
let isLoggedIn = true;

console.log(!isLoggedIn);
```

Output:

```text
false
```

Mental model:

```text
!true  → false
!false → true
```

---

# 12. Combining Comparison and Logical Operators

Logical operators can combine comparison expressions.

```ts
let age = 23;
let hasId = true;

let allowed = age >= 18 && hasId === true;

console.log(allowed);
```

Example login condition:

```ts
let username = "Sharan";
let password = "1234";

let login =
    username === "Sharan" &&
    password === "1234";

console.log(login);
```

Result:

```text
true
```

This pattern is very common in conditions and test automation.

---

# 13. Increment Operator `++`

Increases a value by `1`.

```ts
let count = 5;

count++;

console.log(count);
```

Output:

```text
6
```

Equivalent to:

```ts
count = count + 1;
```

---

# 14. Decrement Operator `--`

Decreases a value by `1`.

```ts
let count = 5;

count--;

console.log(count);
```

Output:

```text
4
```

Equivalent to:

```ts
count = count - 1;
```

---

# 15. Post-Increment vs Pre-Increment

## Post-Increment

```ts
let count = 5;

console.log(count++);
console.log(count);
```

Output:

```text
5
6
```

The current value is used first, then incremented.

## Pre-Increment

```ts
let count = 5;

console.log(++count);
console.log(count);
```

Output:

```text
6
6
```

The value is incremented first, then used.

---

# 16. Post-Decrement vs Pre-Decrement

## Post-Decrement

```ts
let count = 5;

console.log(count--);
console.log(count);
```

Output:

```text
5
4
```

## Pre-Decrement

```ts
let count = 5;

console.log(--count);
console.log(count);
```

Output:

```text
4
4
```

---

# 17. Ternary / Conditional Operator

The ternary operator is a short way to write a simple condition.

Syntax:

```ts
condition ? valueIfTrue : valueIfFalse;
```

Example:

```ts
let age = 23;

let result = age >= 18 ? "Adult" : "Minor";

console.log(result);
```

Output:

```text
Adult
```

The same logic using `if/else`:

```ts
let age = 23;
let result;

if (age >= 18) {
    result = "Adult";
} else {
    result = "Minor";
}

console.log(result);
```

Mental model:

```text
condition ? TRUE_RESULT : FALSE_RESULT
```

Another example:

```ts
let isLoggedIn = true;

let message = isLoggedIn
    ? "Welcome"
    : "Please login";

console.log(message);
```

---

# 18. Operators in a Login Condition

A realistic example combining operators:

```ts
let username = "Sharan";
let password = 1234;

function login(username: string, password: number): string {
    if (username === "Sharan" && password === 1234) {
        return "Login Successful";
    }

    return "Login Failed";
}

let result = login(username, password);

console.log(result);
```

Important operators here:

```text
=    → assignment
===  → strict comparison
&&   → both conditions must be true
```

---

# 19. Operators Useful for Playwright

You do not need to memorize every operator equally.

## Very Important

```text
=
===
!==
&&
||
!
>
<
>=
<=
```

These are commonly used when writing test conditions and validations.

## Important

```text
+=
-=
++
--
?
:
```

These are useful but easier to learn through practice.

## Basic Mathematical Operators

```text
+
-
*
/
%
**
```

Understand what they do; extensive practice is not necessary for Playwright.

---

# 20. Quick Reference

| Category | Operators |
|---|---|
| Arithmetic | `+ - * / % **` |
| Assignment | `= += -= *= /= %=` |
| Comparison | `> < >= <= == != === !==` |
| Logical | `&& || !` |
| Increment | `++` |
| Decrement | `--` |
| Ternary | `? :` |

---

# 21. Key Takeaways

1. Arithmetic operators perform mathematical calculations.
2. Assignment operators assign or update values.
3. Comparison operators return `true` or `false`.
4. `===` checks both value and type.
5. `&&` requires both conditions to be true.
6. `||` requires at least one condition to be true.
7. `!` reverses a boolean condition.
8. `++` increases a value by `1`.
9. `--` decreases a value by `1`.
10. Ternary operators provide a concise way to write simple conditions.
11. For Playwright, comparison and logical operators are particularly important.

---

# 22. Practice

## Practice 1 — Login Condition

Create:

```ts
let username = "Sharan";
let password = 1234;
let isActive = true;
```

Write a condition that succeeds only when:

- username is `"Sharan"`
- password is `1234`
- account is active

Use:

```text
===
&&
```

---

## Practice 2 — Simple User Status

Create:

```ts
let age = 23;
let isVerified = true;
```

Use a ternary operator to print:

```text
"Access Granted"
```

when the user is at least 18 and verified.

Otherwise print:

```text
"Access Denied"
```

Try to solve it without looking at the answer first.
