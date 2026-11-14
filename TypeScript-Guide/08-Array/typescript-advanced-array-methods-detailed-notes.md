# TypeScript Detailed Notes — Advanced Array Methods

These notes cover `forEach()`, `map()`, `filter()`, `reduce()`, `some()`, and `every()` with TypeScript and QA / Playwright-style examples.

> **Correction:** The transcript's spoken word "sum" refers to **`some()`**, not a method named `sum()`.

## 1. What are array methods?

An array stores multiple values in one variable.

```ts
const numbers: number[] = [1, 2, 3, 4, 5];
const fruits: string[] = ["apple", "banana", "orange", "mango"];
```

Array methods are built-in operations for processing array elements. These six methods accept a **callback function**: a function passed as an argument to another function or method.

```ts
numbers.forEach((number) => {
  console.log(number);
});
```

The arrow function is the callback passed to `forEach()`.

Callbacks can be written as named functions, anonymous functions, or arrow functions. Arrow functions are common in modern TypeScript.

## 2. Callback parameters

For `forEach()`, `map()`, `filter()`, `some()`, and `every()`, the callback can receive three parameters:

```ts
array.method((element, index, array) => {
  // work with the current element
});
```

| Parameter | Meaning |
|---|---|
| `element` | Current item being processed |
| `index` | Index of the current item |
| `array` | Original array being processed |

The first parameter is required. The index and array parameters are optional.

```ts
const fruits: string[] = ["apple", "banana", "orange"];

fruits.forEach((fruit, index) => {
  console.log(`${index}: ${fruit}`);
});
```

Output:
```text
0: apple
1: banana
2: orange
```

Indexes start at `0`.

## 3. `forEach()` — perform an action for every element

**Definition:** `forEach()` executes the callback once for each element. If an array has five elements, the callback is invoked five times.

Syntax:
```ts
array.forEach((element, index, array) => {
  // action
});
```

Print test results:
```ts
const results: string[] = ["Passed", "Failed", "Passed"];

results.forEach((result) => {
  console.log(result);
});
```

Print index and value:
```ts
const fruits: string[] = ["apple", "banana", "mango"];

fruits.forEach((fruit, index) => {
  console.log(`${index} - ${fruit}`);
});
```

Convert each fruit to uppercase for display:
```ts
fruits.forEach((fruit) => {
  console.log(fruit.toUpperCase());
});
```

**Important points**
- Performs an action for each item.
- Does not create and return a new array.
- Its return value is `undefined` (`void` in typical TypeScript usage).
- Useful for logging, updating an external value, or triggering an action for each item.
- It does not provide a normal `break` mechanism. Use `for...of` or a traditional `for` loop when you need early exit or control over the starting index.

## 4. `map()` — transform every element

**Definition:** `map()` calls a callback for every element and creates a **new array** containing each callback result. The output array has the same number of elements as the input array, although the values can differ.

Syntax:
```ts
const newArray = array.map((element, index, array) => {
  return transformedValue;
});
```

Double every number:
```ts
const numbers: number[] = [1, 2, 3, 4, 5];

const doubled: number[] = numbers.map((number) => {
  return number * 2;
});

console.log(doubled); // [2, 4, 6, 8, 10]
```

Convert names to uppercase:
```ts
const fruits: string[] = ["apple", "banana", "mango"];

const uppercaseFruits: string[] = fruits.map((fruit) => {
  return fruit.toUpperCase();
});
// ["APPLE", "BANANA", "MANGO"]
```

Transform test names:
```ts
const testNames: string[] = ["Login", "Checkout", "Search"];

const testLabels: string[] = testNames.map((name) => {
  return `Test: ${name}`;
});
// ["Test: Login", "Test: Checkout", "Test: Search"]
```

Short arrow-function syntax (one expression):
```ts
const doubled = numbers.map(number => number * 2);
```

**Important points**
- Returns a new array.
- Produces one output for every input element.
- Does not normally modify the original array.
- Use it to transform data, not merely to print it.

## 5. `filter()` — select elements that satisfy a condition

**Definition:** `filter()` calls a callback for each element and creates a new array containing only the elements for which the callback returns `true`.

Syntax:
```ts
const filteredArray = array.filter((element, index, array) => {
  return condition;
});
```

Get even numbers:
```ts
const numbers: number[] = [1, 2, 3, 4, 5];

const evenNumbers: number[] = numbers.filter((number) => {
  return number % 2 === 0;
});
// [2, 4]
```

Get numbers greater than three:
```ts
const greaterThanThree = numbers.filter(number => number > 3);
// [4, 5]
```

Keep failed tests:
```ts
const statuses: string[] = ["Passed", "Failed", "Skipped", "Failed"];

const failedTests = statuses.filter(status => status === "Failed");
// ["Failed", "Failed"]
```

**Important points**
- Returns a new array.
- Keeps original elements that satisfy the condition.
- The result can have the same number of elements as the input, fewer elements, or zero elements.
- Use it to select items based on a condition.

## 6. Difference between `map()` and `filter()`

| `map()` | `filter()` |
|---|---|
| Transforms each element | Selects elements |
| Callback result becomes an output value | Callback result decides whether to keep the original element |
| Output length equals input length | Output length is equal to or less than input length |
| Example: convert names to uppercase | Example: keep only failed tests |

```ts
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

const even = numbers.filter(n => n % 2 === 0);
// [2, 4]
```

Remember:
- `map()` asks: **What should each item become?**
- `filter()` asks: **Which items should remain?**

## 7. `reduce()` — accumulate elements into one result

**Definition:** `reduce()` processes array elements and accumulates a result. It returns the final accumulated value. That result can be a number, string, object, array, or another type; it is not limited to a number.

Syntax:
```ts
const result = array.reduce(
  (accumulator, currentValue, index, array) => {
    return updatedAccumulator;
  },
  initialValue
);
```

| Parameter | Meaning |
|---|---|
| `accumulator` | Result accumulated so far |
| `currentValue` | Current array element |
| `index` | Current element's index (optional) |
| `array` | Original array (optional) |
| `initialValue` | Starting accumulator value |

Add all numbers:
```ts
const numbers: number[] = [1, 2, 3, 4, 5];

const total: number = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log(total); // 15
```

Accumulator progression:

| Iteration | Accumulator before | Current value | New accumulator |
|---:|---:|---:|---:|
| 1 | 0 | 1 | 1 |
| 2 | 1 | 2 | 3 |
| 3 | 3 | 3 | 6 |
| 4 | 6 | 4 | 10 |
| 5 | 10 | 5 | 15 |

The `0` is the initial value of the accumulator.

Count passed tests:
```ts
const statuses: string[] = [
  "Passed",
  "Failed",
  "Passed",
  "Skipped",
  "Passed"
];

const passedCount: number = statuses.reduce((count, status) => {
  return status === "Passed" ? count + 1 : count;
}, 0);

// 3
```

Short syntax:
```ts
const total = numbers.reduce((acc, value) => acc + value, 0);
```

**Important points**
- Returns one final accumulated result.
- The accumulator carries the result from one iteration to the next.
- Provide an initial value to make the starting state explicit and handle empty arrays safely.
- The accumulator type can differ from the array element type when using an appropriate generic type.

## 8. `some()` — does at least one element satisfy the condition?

**Definition:** `some()` checks whether **at least one** array element passes the callback condition. It returns a boolean: `true` or `false`.

Syntax:
```ts
const answer = array.some((element, index, array) => {
  return condition;
});
```

Check whether any number is even:
```ts
const numbers: number[] = [1, 3, 5, 6, 7];

const hasEvenNumber: boolean = numbers.some(number => number % 2 === 0);
console.log(hasEvenNumber); // true
```

Check whether any test failed:
```ts
const statuses: string[] = ["Passed", "Failed", "Passed"];

const hasFailure: boolean = statuses.some(
  status => status === "Failed"
);
// true
```

**Important points**
- Returns a boolean, not an array.
- Returns `true` if at least one element matches.
- Returns `false` if no element matches.
- Can stop checking once a match is found.
- For an empty array, returns `false`.

## 9. `every()` — do all elements satisfy the condition?

**Definition:** `every()` checks whether **all** array elements pass the callback condition. It returns a boolean.

Syntax:
```ts
const answer = array.every((element, index, array) => {
  return condition;
});
```

Check whether all numbers are positive:
```ts
const numbers: number[] = [1, 2, 3, 4, 5];

const allPositive: boolean = numbers.every(number => number > 0);
console.log(allPositive); // true
```

Check whether all tests passed:
```ts
const statuses: string[] = ["Passed", "Passed", "Passed"];

const allPassed: boolean = statuses.every(
  status => status === "Passed"
);
// true
```

If even one test is failed or skipped, the result is `false`.

**Important points**
- Returns a boolean, not an array.
- Returns `true` only if every element matches.
- Returns `false` as soon as it finds a non-matching element.
- For an empty array, returns `true`.

## 10. Difference between `some()` and `every()`

| `some()` | `every()` |
|---|---|
| At least one element must match | Every element must match |
| `true` when one or more match | `true` only when all match |
| Stops when it finds a match | Stops when it finds a non-match |

```ts
const numbers = [1, 2, 3, 4, 5];

const hasNumberAboveFour = numbers.some(n => n > 4);
// true — 5 matches

const allNumbersAboveFour = numbers.every(n => n > 4);
// false — not all numbers match
```

Memory trick:
- `some()` = **at least one**
- `every()` = **all of them**

## 11. Return-value comparison

| Method | What it returns |
|---|---|
| `forEach()` | `undefined` |
| `map()` | New array |
| `filter()` | New array |
| `reduce()` | Final accumulated value |
| `some()` | Boolean |
| `every()` | Boolean |

Do not confuse `forEach()` with `map()`: `forEach()` is for actions; `map()` is for creating transformed data.

## 12. Choosing the right method

| Requirement | Suitable method |
|---|---|
| Print each test result | `forEach()` |
| Add a prefix to every test name | `map()` |
| Get only failed tests | `filter()` |
| Count passed tests or calculate a total | `reduce()` |
| Check whether any test failed | `some()` |
| Check whether all tests passed | `every()` |

### Playwright-style test-data example

```ts
type TestResult = {
  name: string;
  status: "Passed" | "Failed" | "Skipped";
  duration: number;
};

const testResults: TestResult[] = [
  { name: "Login", status: "Passed", duration: 120 },
  { name: "Checkout", status: "Failed", duration: 450 },
  { name: "Search", status: "Passed", duration: 200 }
];

// Get test names
const testNames = testResults.map(test => test.name);

// Get failed tests
const failedTests = testResults.filter(test => test.status === "Failed");

// Count passed tests
const passedCount = testResults.reduce(
  (count, test) => test.status === "Passed" ? count + 1 : count,
  0
);

// Is there at least one failure?
const hasFailure = testResults.some(test => test.status === "Failed");

// Did every test pass?
const allPassed = testResults.every(test => test.status === "Passed");
```

These examples process test data. In an actual Playwright suite, use the Playwright test runner and assertions for test execution and verification; array methods help process related data.

## 13. Common mistakes

### Mistake 1: Expecting `forEach()` to return an array

```ts
const result = numbers.forEach(n => n * 2);
```

`result` is `undefined`. Use `map()` if you want a new array.

### Mistake 2: Using `map()` when you only need to select items

```ts
const even = numbers.map(n => n % 2 === 0);
```

This returns booleans like `[false, true, false, true, false]`, not the even numbers. Use `filter()`.

### Mistake 3: Forgetting to return from a block-bodied callback

```ts
const doubled = numbers.map(n => {
  n * 2; // no return
});
```

Correct:
```ts
const doubled = numbers.map(n => {
  return n * 2;
});
```

Or:
```ts
const doubled = numbers.map(n => n * 2);
```

### Mistake 4: Forgetting the `reduce()` initial value

For predictable accumulation, explicitly provide the initial value:
```ts
const total = numbers.reduce((sum, n) => sum + n, 0);
```

## 14. Practice exercises

Try these without looking up the answers.

### Exercise 1 — Basic methods

```ts
const results: string[] = [
  "Passed",
  "Failed",
  "Passed",
  "Skipped",
  "Failed"
];
```

1. Print every result using `forEach()`.
2. Use `map()` to prefix each result with `"Status: "`.
3. Use `filter()` to get only failed results.
4. Use `reduce()` to count passed results.
5. Use `some()` to check whether any test failed.
6. Use `every()` to check whether all tests passed.

### Exercise 2 — Numeric data

```ts
const responseTimes: number[] = [120, 450, 200, 800, 150];
```

1. Create a new array with each response time increased by 50 using `map()`.
2. Use `filter()` to select response times above 300.
3. Use `reduce()` to calculate the total response time.
4. Use `some()` to check whether any response time exceeds 700.
5. Use `every()` to check whether all response times are below 1000.

### Exercise 3 — Objects and test data

```ts
type TestResult = {
  name: string;
  status: "Passed" | "Failed" | "Skipped";
  duration: number;
};

const tests: TestResult[] = [
  { name: "Login", status: "Passed", duration: 120 },
  { name: "Checkout", status: "Failed", duration: 450 },
  { name: "Search", status: "Passed", duration: 200 },
  { name: "Profile", status: "Skipped", duration: 150 }
];
```

1. Use `map()` to get all test names.
2. Use `filter()` to get tests that passed.
3. Use `reduce()` to calculate the total duration.
4. Use `some()` to check whether any test was skipped.
5. Use `every()` to check whether all tests passed.

## 15. Final revision checklist

- [ ] I can explain what a callback function is.
- [ ] I understand the element, index, and array callback parameters.
- [ ] I know why `forEach()` returns `undefined`.
- [ ] I can use `map()` to transform data.
- [ ] I can use `filter()` to select data.
- [ ] I understand the difference between `map()` and `filter()`.
- [ ] I understand the accumulator in `reduce()`.
- [ ] I can use `reduce()` to calculate totals and counts.
- [ ] I understand the difference between `some()` and `every()`.
- [ ] I can choose the correct method for a given requirement.

**Core memory rule:** `forEach` performs an action, `map` transforms, `filter` selects, `reduce` accumulates, `some` checks at least one, and `every` checks all.
