# TypeScript — Conditional Statements

> Notes on `if`, `if...else`, `else if`, `switch...case`, `break`, `default`, comparison operators, logical operators, and practical examples.

---

## 1. What Are Conditional Statements?

Conditional statements are also called **decision-making statements**.

They are used when we want to execute a specific statement or group of statements based on a condition.

Main structures:

- `if`
- `if...else`
- `else if`
- `switch...case`

---

# 2. `if` Statement

Use `if` when code should execute **only when a condition is true**.

## Syntax

```ts
if (condition) {
    // statements
}
```

The condition returns either `true` or `false`.

```ts
let age: number = 20;

if (age >= 18) {
    console.log("Eligible");
}
```

If `age` is `20`, the condition is true and the message is printed.

If `age` is `15`, the condition is false and the block is skipped.

---

# 3. Conditions

Conditions commonly use comparison and logical operators.

```ts
age >= 18
age === 18
age !== 18
age < 18
age >= 18 && age <= 60
```

A condition produces a Boolean result:

```text
true
false
```

---

# 4. `if...else`

Use `if...else` when there are **two possible outcomes**.

- `true` → `if` block
- `false` → `else` block

## Syntax

```ts
if (condition) {
    // true block
} else {
    // false block
}
```

## Example

```ts
let age: number = 20;

if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}
```

Only one block executes.

```text
              condition
                  |
          +-------+-------+
          |               |
        true            false
          |               |
      if block        else block
```

---

# 5. Example — Even or Odd

The `%` operator returns the remainder.

```text
10 % 2 = 0
11 % 2 = 1
```

If the remainder is `0`, the number is even.

```ts
let num: number = 10;

if (num % 2 === 0) {
    console.log("Even number");
} else {
    console.log("Odd number");
}
```

---

# 6. Template Literals

You can print a variable with text using `+`:

```ts
let num: number = 10;

console.log("The number is " + num);
```

Or use a template literal with backticks:

```ts
let num: number = 10;

console.log(`The number is ${num}`);
```

Syntax:

```ts
`text ${variable}`
```

Template literals are useful when inserting variable values into strings.

---

# 7. `else if`

Use `else if` when there are **multiple conditions**.

## Syntax

```ts
if (condition1) {

} else if (condition2) {

} else if (condition3) {

} else {

}
```

Conditions are checked from **top to bottom**.

Once a condition is true, its block executes and the remaining conditions are skipped.

---

# 8. Example — Grade System

```text
90–100 → Grade A
75–89  → Grade B
60–74  → Grade C
Below 60 → Grade D
```

```ts
let marks: number = 85;

if (marks >= 90 && marks <= 100) {
    console.log("Grade A");
} else if (marks >= 75 && marks < 90) {
    console.log("Grade B");
} else if (marks >= 60 && marks < 75) {
    console.log("Grade C");
} else {
    console.log("Grade D");
}
```

For `95` → Grade A.

For `85` → Grade B.

For `65` → Grade C.

For `50` → Grade D.

---

# 9. Important: Order of `else if`

Conditions are checked from top to bottom.

```ts
let marks: number = 95;

if (marks >= 60) {
    console.log("Grade C or above");
} else if (marks >= 90) {
    console.log("Grade A");
}
```

The first condition is already true:

```text
95 >= 60 → true
```

So the second condition is never checked.

### Remember

```text
Condition 1
    ↓ false
Condition 2
    ↓ false
Condition 3
    ↓ false
else
```

The **first true condition wins**.

---

# 10. Browser Selection

This is particularly relevant to automation and Playwright.

```ts
let browser: string = "Chrome";

if (browser === "Chrome") {
    console.log("Browser is Chrome");
} else if (browser === "Firefox") {
    console.log("Browser is Firefox");
} else if (browser === "Safari") {
    console.log("Browser is Safari");
} else {
    console.log("Some other browser");
}
```

---

# 11. `===` vs `==`

## `==`

Loose equality. It may perform type conversion.

```ts
5 == "5"
```

Result:

```text
true
```

## `===`

Strict equality. It checks both value and type.

```ts
5 === "5"
```

Result:

```text
false
```

Because:

```text
5   → number
"5" → string
```

For TypeScript + Playwright, prefer:

```ts
===
```

---

# 12. `!=` vs `!==`

## `!=`

Loose inequality.

```ts
5 != "5"
```

Result:

```text
false
```

## `!==`

Strict inequality. It checks value and type.

```ts
5 !== "5"
```

Result:

```text
true
```

Examples:

```ts
5 != 6       // true
5 != 5       // false

5 !== 6      // true
5 !== 5      // false
5 !== "5"    // true
```

### Recommended

For TypeScript and Playwright, prefer:

```ts
===   // strictly equal
!==   // strictly not equal
```

---

# 13. `switch...case`

Use `switch` when one value can match multiple fixed values.

## Syntax

```ts
switch (expression) {
    case value1:
        // statements
        break;

    case value2:
        // statements
        break;

    default:
        // fallback
}
```

---

# 14. Example — Day Selection

```ts
let day: number = 3;

switch (day) {
    case 1:
        console.log("Monday");
        break;

    case 2:
        console.log("Tuesday");
        break;

    case 3:
        console.log("Wednesday");
        break;

    case 4:
        console.log("Thursday");
        break;

    case 5:
        console.log("Friday");
        break;

    case 6:
        console.log("Saturday");
        break;

    case 7:
        console.log("Sunday");
        break;

    default:
        console.log("Invalid day");
}
```

Since `day = 3`, the output is:

```text
Wednesday
```

---

# 15. `break`

`break` exits the entire `switch` block.

```ts
switch (day) {
    case 1:
        console.log("Monday");
        break;

    case 2:
        console.log("Tuesday");
        break;
}
```

When `case 1` matches:

```text
Monday
  ↓
break
  ↓
Exit switch
```

---

# 16. Without `break`

Without `break`, execution can continue into following cases.

```ts
let day: number = 1;

switch (day) {
    case 1:
        console.log("Monday");

    case 2:
        console.log("Tuesday");

    case 3:
        console.log("Wednesday");
}
```

This can output:

```text
Monday
Tuesday
Wednesday
```

This behavior is called **fall-through**.

For normal switch usage, remember:

```ts
case value:
    // statements
    break;
```

---

# 17. `default`

`default` runs when none of the cases match.

```ts
let day: number = 10;

switch (day) {
    case 1:
        console.log("Monday");
        break;

    case 2:
        console.log("Tuesday");
        break;

    default:
        console.log("Invalid day");
}
```

Output:

```text
Invalid day
```

`default` is optional.

---

# 18. `if...else` vs `switch`

## Use `if...else` for conditions

```ts
if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}
```

It is also useful for ranges:

```ts
if (marks >= 90) {

} else if (marks >= 75) {

} else {

}
```

## Use `switch` for fixed values

```ts
switch (browser) {
    case "Chrome":
        break;

    case "Firefox":
        break;

    case "Safari":
        break;
}
```

### Simple rule

```text
if / else if
    ↓
Conditions, ranges, logical expressions

switch
    ↓
One value + many fixed possibilities
```

---

# 19. Conditional Statements — Quick Summary

| Statement | Use |
|---|---|
| `if` | One condition |
| `if...else` | Two possible paths |
| `else if` | Multiple conditions |
| `switch` | Multiple fixed values |
| `case` | Individual switch value |
| `break` | Exit switch |
| `default` | Fallback when no case matches |

---

# 20. What You Should Know for Playwright

### Must know well

```text
if
if...else
else if
&&
||
===
!==
template literals
switch
case
break
default
```

Focus on being able to **read and write the logic** rather than memorizing theory.

---

# 🧪 Practice Activities

## Activity 1 — Login Validation

Create:

```ts
let username: string = "admin";
let password: string = "1234";
```

Write an `if...else` statement.

Requirements:

```text
username === "admin"
AND
password === "1234"
```

Print:

```text
Login successful
```

Otherwise print:

```text
Invalid credentials
```

You must use:

```text
&&
===
if...else
```

---

## Activity 2 — Browser Selection

Create:

```ts
let browser: string = "Chrome";
```

Using `if...else if...else`, implement:

```text
Chrome  → Launching Chrome
Firefox → Launching Firefox
Edge    → Launching Edge
Other   → Unsupported browser
```

Requirements:

```text
===
else if
else
template literal
```

---

## Bonus Activity — Rewrite Using `switch`

Rewrite Activity 2 using:

```text
switch
case
break
default
```

---

# Final Check

Before moving to loops, you should be able to write these without looking at the notes:

```ts
if (condition) {

}
```

```ts
if (condition) {

} else {

}
```

```ts
if (condition1) {

} else if (condition2) {

} else {

}
```

```ts
switch (value) {

    case value1:
        break;

    case value2:
        break;

    default:
        break;
}
```

Once you can complete the activities, you are ready to move to **loops**.
