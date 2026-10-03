# TypeScript Arrays

## 1. What is an Array?

An array is a collection of multiple values stored in a single variable.

```ts
let numbers: number[] = [10, 20, 30, 40];
let fruits: string[] = ["Apple", "Banana", "Orange"];
```

---

## 2. Array Index

Array indexing starts from `0`.

```ts
let fruits = ["Apple", "Banana", "Orange"];

console.log(fruits[0]); // Apple
console.log(fruits[1]); // Banana
console.log(fruits[2]); // Orange
```

```text
Index:  0        1         2
Value: Apple    Banana    Orange
```

---

## 3. Declaring Arrays

### Using `type[]`

```ts
let numbers: number[] = [1, 2, 3, 4];
let names: string[] = ["Sharan", "Rahul", "John"];
```

### Using `Array<type>`

```ts
let numbers: Array<number> = [1, 2, 3, 4];
let names: Array<string> = ["Sharan", "Rahul", "John"];
```

Both are valid.

---

## 4. Mixed-Type Arrays

Use a union type when an array should contain different types.

```ts
let values: (string | number)[] = ["Sharan", 23, "India", 100];
```

`any[]` can accept any type, but reduces TypeScript type safety.

```ts
let values: any[] = ["Sharan", 23, true];
```

---

## 5. Array Length

`length` gives the number of elements.

```ts
let numbers = [10, 20, 30, 40];

console.log(numbers.length);
// 4
```

Remember:

```text
length = number of elements
last index = length - 1
```

```ts
console.log(numbers[numbers.length - 1]);
// 40
```

---

## 6. Iterating Through Arrays

### Classic `for`

```ts
let numbers = [10, 20, 30, 40];

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}
```

Use `< numbers.length`, not `<= numbers.length`.

### `for...in`

`for...in` gives indexes.

```ts
let fruits = ["Apple", "Banana", "Orange"];

for (let index in fruits) {
    console.log(index);
}
```

To get values:

```ts
for (let index in fruits) {
    console.log(fruits[index]);
}
```

### `for...of`

`for...of` directly gives values.

```ts
for (let fruit of fruits) {
    console.log(fruit);
}
```

### Easy difference

```text
for       → full loop control
for...in  → indexes
for...of  → values
```

---

## 7. `for` vs `forEach()` vs `map()`

### `for`

Use when you want maximum loop control.

```ts
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}
```

You can use `break` and `continue`.

### `forEach()`

Use when you simply want to perform an action for every element.

```ts
numbers.forEach(number => {
    console.log(number);
});
```

### `map()`

Use when you want to transform every element and create a new array.

```ts
let numbers = [1, 2, 3];

let result = numbers.map(number => number * 2);

console.log(result);
// [2, 4, 6]
```

### Practical rule

```text
for       → control the loop
forEach   → do something for every item
map       → transform every item → new array
```

---

## 8. Arrays and Functions

Arrays can be passed to functions.

```ts
function printNames(names: string[]): void {
    for (let name of names) {
        console.log(name);
    }
}

printNames(["Sharan", "Rahul", "John"]);
```

Functions can also return arrays.

```ts
function getNumbers(): number[] {
    return [10, 20, 30];
}
```

---

## 9. Arrays in Playwright

Arrays are useful for test data.

```ts
let browsers = ["Chrome", "Firefox", "Edge"];

for (let browser of browsers) {
    console.log("Testing on " + browser);
}
```

```ts
let tests = ["Login", "Search", "Checkout"];

for (let test of tests) {
    console.log("Running " + test);
}
```

---

## 10. Important Points

- Arrays store multiple values.
- Index starts at `0`.
- `length` gives the number of elements.
- Last index is `length - 1`.
- Arrays are dynamic.
- `for` gives maximum loop control.
- `for...in` gives indexes.
- `for...of` gives values.
- `forEach()` performs an action for each element.
- `map()` transforms elements into a new array.
- Arrays can be passed to and returned from functions.

---

## Quick Revision

```text
Array
  ↓
Multiple values
  ↓
Index starts at 0
  ↓
length = number of elements
  ↓
for       → control
for...in  → index
for...of  → value
forEach   → action for each item
map       → transform → new array
```
