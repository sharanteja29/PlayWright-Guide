# TypeScript — Looping Statements

> Notes for TypeScript learning with a focus on Playwright automation.
>
> **Goal:** Understand loops well enough to use them confidently in automation. Do not over-learn advanced loop patterns yet.

---

## 1. What is a Loop?

A **loop** is used to execute the same block of code repeatedly based on a condition.

Without a loop:

```ts
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
```

With a loop:

```ts
let i = 1;

while (i <= 5) {
    console.log(i);
    i++;
}
```

### Main advantage

Instead of writing the same statement repeatedly, we write it once and repeat it using a loop.

---

## 2. Looping / Iterative Statements

TypeScript provides three main looping statements:

1. `while`
2. `do...while`
3. `for`

There are also different forms of `for` loops that become important when working with arrays and collections.

---

# 3. Three Important Things in a Loop

Before writing a loop, identify:

### 1. Starting point

Where should the loop start?

```ts
let i = 1;
```

### 2. Increment / Decrement

How should the value change?

```ts
i++;
```

or:

```ts
i--;
```

or:

```ts
i += 2;
```

### 3. Stopping condition

When should the loop stop?

```ts
i <= 5
```

### Remember

```text
Starting point
      ↓
Condition
      ↓
Execute
      ↓
Increment / Decrement
      ↓
Condition again
      ↓
...
```

---

# 4. Iteration

An **iteration** means one execution of the loop body.

Example:

```ts
for (let i = 1; i <= 3; i++) {
    console.log(i);
}
```

There are 3 iterations:

```text
Iteration 1 → i = 1
Iteration 2 → i = 2
Iteration 3 → i = 3
```

---

# 5. `while` Loop

## Syntax

```ts
while (condition) {
    // statements
}
```

The `while` loop executes the statements as long as the condition is `true`.

---

## Example

```ts
let i = 1;

while (i <= 5) {
    console.log(i);
    i++;
}
```

Output:

```text
1
2
3
4
5
```

---

## How `while` Works

For:

```ts
let i = 1;

while (i <= 5) {
    console.log(i);
    i++;
}
```

Execution:

```text
i = 1
↓
1 <= 5 → true
↓
print 1
↓
i becomes 2
↓
2 <= 5 → true
↓
print 2
↓
i becomes 3
↓
...
↓
i becomes 6
↓
6 <= 5 → false
↓
Loop stops
```

### Important

The condition is checked **before** executing the loop body.

---

# 6. Infinite `while` Loop

Be careful when the condition never becomes false.

Example:

```ts
let i = 1;

while (i <= 5) {
    console.log(i);
}
```

This is an infinite loop because `i` never changes.

The condition always remains:

```text
1 <= 5 → true
```

### Correct version

```ts
let i = 1;

while (i <= 5) {
    console.log(i);
    i++;
}
```

### Remember

A loop should normally have a clear path toward its stopping condition.

---

# 7. Print 1 to 10 Using `while`

```ts
let i = 1;

while (i <= 10) {
    console.log(i);
    i++;
}
```

Output:

```text
1
2
3
4
5
6
7
8
9
10
```

---

# 8. Even Numbers Using `while`

## Method 1 — Increment by 2

Start from the first even number and increase by 2.

```ts
let i = 2;

while (i <= 10) {
    console.log(i);
    i += 2;
}
```

Output:

```text
2
4
6
8
10
```

### Why?

```text
2 → 4 → 6 → 8 → 10
```

---

# 9. Odd Numbers Using `while`

Start from `1` and increase by `2`.

```ts
let i = 1;

while (i <= 10) {
    console.log(i);
    i += 2;
}
```

Output:

```text
1
3
5
7
9
```

---

# 10. Even Numbers Using `%`

Another approach is to check whether the remainder after division by 2 is zero.

```ts
let i = 1;

while (i <= 10) {
    if (i % 2 === 0) {
        console.log(i);
    }

    i++;
}
```

Output:

```text
2
4
6
8
10
```

### `%` operator

```ts
4 % 2 === 0 // even
5 % 2 !== 0 // odd
```

This combines:

```text
Loop + Conditional statement
```

---

# 11. Odd Numbers Using `%`

```ts
let i = 1;

while (i <= 10) {
    if (i % 2 !== 0) {
        console.log(i);
    }

    i++;
}
```

Output:

```text
1
3
5
7
9
```

---

# 12. Descending `while` Loop

Loops can also run backwards.

```ts
let i = 10;

while (i >= 1) {
    console.log(i);
    i--;
}
```

Output:

```text
10
9
8
7
6
5
4
3
2
1
```

Here:

- Starting point = `10`
- Condition = `i >= 1`
- Decrement = `i--`

---

# 13. `do...while` Loop

## Syntax

```ts
do {
    // statements
} while (condition);
```

The major difference from `while` is:

> `do...while` executes the body at least once before checking the condition.

---

## Example

```ts
let i = 1;

do {
    console.log(i);
    i++;
} while (i <= 5);
```

Output:

```text
1
2
3
4
5
```

---

# 14. `while` vs `do...while`

## `while`

Condition is checked first.

```ts
let i = 10;

while (i < 5) {
    console.log(i);
}
```

Output:

```text
No output
```

Because:

```text
10 < 5 → false
```

---

## `do...while`

The body executes first.

```ts
let i = 10;

do {
    console.log(i);
} while (i < 5);
```

Output:

```text
10
```

Because the body executes before the condition is checked.

### Easy way to remember

```text
while:
CHECK → EXECUTE

do...while:
EXECUTE → CHECK
```

---

# 15. `for` Loop

The `for` loop combines initialization, condition, and increment/decrement into one statement.

## Syntax

```ts
for (initialization; condition; increment/decrement) {
    // statements
}
```

Example:

```ts
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
```

Output:

```text
1
2
3
4
5
```

---

# 16. Three Parts of a `for` Loop

Example:

```ts
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
```

### Part 1 — Initialization

```ts
let i = 1
```

Starting point.

### Part 2 — Condition

```ts
i <= 5
```

The loop continues while this is true.

### Part 3 — Increment

```ts
i++
```

Changes the value after each iteration.

---

# 17. `for` Loop Execution Flow

For:

```ts
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
```

The order is:

```text
1. Initialization
       ↓
2. Condition
       ↓
3. Body
       ↓
4. Increment
       ↓
5. Condition
       ↓
6. Body
       ↓
7. Increment
       ↓
...
```

### Important

Initialization happens only once.

Condition and increment/decrement happen repeatedly.

---

# 18. Print 1 to 10 Using `for`

```ts
for (let i = 1; i <= 10; i++) {
    console.log(i);
}
```

Output:

```text
1
2
3
4
5
6
7
8
9
10
```

---

# 19. Even Numbers Using `for`

## Method 1 — Increment by 2

```ts
for (let i = 2; i <= 10; i += 2) {
    console.log(i);
}
```

Output:

```text
2
4
6
8
10
```

---

## Method 2 — Use `%`

```ts
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}
```

Output:

```text
2
4
6
8
10
```

---

# 20. Odd Numbers Using `for`

```ts
for (let i = 1; i <= 10; i++) {
    if (i % 2 !== 0) {
        console.log(i);
    }
}
```

Output:

```text
1
3
5
7
9
```

---

# 21. Descending `for` Loop

```ts
for (let i = 10; i >= 1; i--) {
    console.log(i);
}
```

Output:

```text
10
9
8
7
6
5
4
3
2
1
```

---

# 22. Scope of a `for` Loop

`let` has block scope.

Example:

```ts
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

console.log(i); // Error
```

The `i` declared inside the `for` loop is available only inside that loop.

---

## Variable Declared Outside

```ts
let i = 1;

for (i = 1; i <= 5; i++) {
    console.log(i);
}

console.log(i);
```

Output:

```text
1
2
3
4
5
6
```

Why `6`?

After printing `5`:

```text
5 → i++ → 6
```

Then:

```text
6 <= 5 → false
```

The loop stops, and the latest value of `i` is `6`.

---

# 23. `break`

`break` immediately terminates the loop.

Example:

```ts
for (let i = 1; i <= 10; i++) {

    if (i === 6) {
        break;
    }

    console.log(i);
}
```

Output:

```text
1
2
3
4
5
```

When `i` becomes `6`, `break` exits the loop.

### Remember

```text
break = STOP THE LOOP
```

---

# 24. `continue`

`continue` skips the current iteration and moves to the next iteration.

Example:

```ts
for (let i = 1; i <= 5; i++) {

    if (i === 3) {
        continue;
    }

    console.log(i);
}
```

Output:

```text
1
2
4
5
```

When `i === 3`, the current iteration is skipped.

The loop itself does not stop.

### Remember

```text
continue = SKIP CURRENT ITERATION
```

---

# 25. `break` vs `continue`

| Statement | Meaning |
|---|---|
| `break` | Completely exits the loop |
| `continue` | Skips current iteration |
| `break` | Loop stops |
| `continue` | Loop continues |

### Simple memory trick

```text
break    → EXIT
continue → SKIP
```

---

# 26. Skip Multiple Values

Suppose we want to skip:

```text
3, 5, 7
```

We can use:

```ts
for (let i = 1; i <= 10; i++) {

    if (i === 3 || i === 5 || i === 7) {
        continue;
    }

    console.log(i);
}
```

Output:

```text
1
2
4
6
8
9
10
```

Use `||` because the value can be:

```text
3 OR 5 OR 7
```

---

# 27. Nested Loops — Basic Understanding

A **nested loop** is a loop inside another loop.

Example:

```ts
for (let i = 1; i <= 3; i++) {

    for (let j = 1; j <= 2; j++) {
        console.log(i, j);
    }
}
```

The inner loop runs completely for each iteration of the outer loop.

You only need a basic understanding of nested loops for now.

---

# 28. Loop + Conditional Statement

Loops are frequently combined with conditions.

Example:

```ts
for (let i = 1; i <= 10; i++) {

    if (i % 2 === 0) {
        console.log(i);
    }
}
```

This combines:

```text
for loop
+
if condition
+
% operator
```

This pattern is important for automation logic.

---

# 29. Infinite Loops — What to Watch For

A loop can become infinite when the condition never becomes false.

Example:

```ts
let i = 1;

while (i <= 5) {
    console.log(i);
}
```

Problem:

```text
i never changes
```

Therefore:

```text
i <= 5
```

always remains true.

### General rule

When writing a loop, always ask:

1. Where does it start?
2. How does the value change?
3. What makes the condition eventually become false?

---

# 30. Loops and Playwright

Since this TypeScript learning is specifically for Playwright, loops become particularly useful when working with:

- multiple test data values
- arrays
- collections
- repeated actions
- multiple elements
- different test scenarios

Example of the type of pattern you will encounter later:

```ts
for (const user of users) {
    // perform test using user
}
```

Don't worry about `for...of` yet.

We'll learn it properly when we reach **arrays and collections**.

---

# 31. Priority for Playwright

You do **not** need to spend equal time on every loop.

### Must know ⭐⭐⭐

- `for`
- `break`
- `continue`
- loop + `if`
- loop + arrays/collections later
- `for...of` later

### Should understand ⭐⭐

- `while`
- nested loops
- loop scope
- infinite loops

### Basic understanding ⭐

- `do...while`

You don't need advanced loop tricks at this stage.

---

# 32. What You Should Be Able to Explain

Before leaving this chapter, you should be able to answer:

### What is a loop?

A way to repeatedly execute a block of code based on a condition.

### Difference between `while` and `do...while`?

```text
while       → condition first
do...while  → execution first
```

### What are the three parts of a `for` loop?

```text
initialization
condition
increment/decrement
```

### What does `break` do?

Terminates the loop.

### What does `continue` do?

Skips the current iteration.

### What does `i++` do?

Increases `i` by 1.

### What does `i--` do?

Decreases `i` by 1.

### What does `i += 2` do?

Increases `i` by 2.

### How do you check for an even number?

```ts
i % 2 === 0
```

### How do you check for an odd number?

```ts
i % 2 !== 0
```

---

# 33. Practice Activities

## Activity 1 — Basic `for`

Print numbers from `1` to `10`.

Expected:

```text
1
2
3
4
5
6
7
8
9
10
```

---

## Activity 2 — `break`

Print numbers from `1` to `10`, but stop when the number reaches `7`.

Expected:

```text
1
2
3
4
5
6
```

---

## Activity 3 — `continue`

Print numbers from `1` to `10`, but skip:

```text
3, 5, 7
```

Expected:

```text
1
2
4
6
8
9
10
```

---

# 34. Extra Practice — Optional

Once the three activities are done, try this:

Print only the even numbers from `1` to `20` using:

1. `i += 2`
2. `%` operator

This will reinforce both approaches.

---

# 35. What NOT to Over-Learn Yet

For your Playwright-focused path, don't spend too much time on:

- complicated nested loops
- mathematical loop puzzles
- advanced loop optimization
- unusual loop tricks
- memorizing dozens of loop programs

Focus on understanding the patterns.

Later, arrays and objects will make loops much more useful for Playwright.

---

## Chapter Summary

```text
LOOPING STATEMENTS
│
├── while
│   └── condition checked first
│
├── do...while
│   └── executes at least once
│
├── for
│   ├── initialization
│   ├── condition
│   └── increment/decrement
│
├── break
│   └── exits loop
│
├── continue
│   └── skips current iteration
│
├── Nested loops
│
├── Loop + conditional
│
└── Infinite loops
```

### Playwright priority

```text
for             ⭐⭐⭐
break           ⭐⭐⭐
continue        ⭐⭐⭐
for...of later  ⭐⭐⭐
while           ⭐⭐
nested loops    ⭐⭐
do...while      ⭐
```
