# TypeScript Array Methods

## 1. What are Array Methods?

Array methods are built-in methods that allow us to perform operations on arrays.

For automation, a smaller set of array methods is especially useful.

---

## 2. `push()`

Adds one or more elements to the **end**.

```ts
let numbers = [1, 2, 3];

numbers.push(4);
numbers.push(5, 6);

console.log(numbers);
// [1, 2, 3, 4, 5, 6]
```

```text
push → add → END
```

---

## 3. `pop()`

Removes the **last element** and returns the removed element.

```ts
let numbers = [1, 2, 3];

let removed = numbers.pop();

console.log(numbers);
// [1, 2]

console.log(removed);
// 3
```

```text
pop → remove → END
```

---

## 4. `unshift()`

Adds one or more elements to the **beginning**.

```ts
let numbers = [3, 4];

numbers.unshift(1, 2);

console.log(numbers);
// [1, 2, 3, 4]
```

```text
unshift → add → START
```

---

## 5. `shift()`

Removes the **first element** and returns it.

```ts
let numbers = [1, 2, 3];

let removed = numbers.shift();

console.log(numbers);
// [2, 3]

console.log(removed);
// 1
```

```text
shift → remove → START
```

---

## 6. Push / Pop / Shift / Unshift

Memorize this group together:

```text
push     → add    END
pop      → remove END
unshift  → add    START
shift    → remove START
```

---

## 7. `concat()`

Combines arrays and returns a combined array.

```ts
let numbers1 = [1, 2, 3];
let numbers2 = [4, 5, 6];

let result = numbers1.concat(numbers2);

console.log(result);
// [1, 2, 3, 4, 5, 6]
```

`concat()` does not modify the original array.

```text
concat → combine arrays
```

---

## 8. `slice()`

Extracts a section of an array.

```ts
let fruits = ["Apple", "Banana", "Orange", "Mango"];

let result = fruits.slice(1, 3);

console.log(result);
// ["Banana", "Orange"]
```

Syntax:

```ts
array.slice(start, end);
```

Rule:

```text
start → inclusive
end   → exclusive
```

So `slice(1, 3)` takes indexes `1` and `2`, but not `3`.

```text
slice → extract a section
```

---

## 9. `splice()`

Can **remove, add, or replace** elements.

Unlike `slice()`, `splice()` modifies the original array.

### Remove

```ts
let fruits = ["Apple", "Banana", "Orange", "Mango"];

let removed = fruits.splice(1, 2);

console.log(fruits);
// ["Apple", "Mango"]

console.log(removed);
// ["Banana", "Orange"]
```

Syntax:

```ts
array.splice(start, deleteCount);
```

### Add

```ts
let fruits = ["Apple", "Banana", "Orange"];

fruits.splice(1, 0, "Mango", "Grape");

console.log(fruits);
// ["Apple", "Mango", "Grape", "Banana", "Orange"]
```

`0` means no elements are deleted.

### Replace

```ts
let fruits = ["Apple", "Banana", "Orange"];

fruits.splice(1, 1, "Mango");

console.log(fruits);
// ["Apple", "Mango", "Orange"]
```

```text
splice → modify the array
        → remove
        → add
        → replace
```

---

## 10. `slice()` vs `splice()`

| `slice()` | `splice()` |
|---|---|
| Extracts elements | Adds/removes/replaces |
| Uses start + end | Uses start + deleteCount |
| End is exclusive | No end index |
| Does not modify original | Modifies original |
| Returns extracted array | Returns removed elements |

### Easy memory trick

```text
slice  → take a piece
splice → change the array
```

---

## 11. `indexOf()`

Finds the index of an element.

```ts
let fruits = ["Apple", "Banana", "Orange"];

let index = fruits.indexOf("Banana");

console.log(index);
// 1
```

If not found:

```ts
console.log(fruits.indexOf("Mango"));
// -1
```

It can also start searching from a specified index:

```ts
fruits.indexOf("Banana", 1);
```

```text
indexOf → "Where is this element?"
```

---

## 12. `includes()`

Checks whether an element exists.

It returns `true` or `false`.

```ts
let fruits = ["Apple", "Banana", "Orange"];

console.log(fruits.includes("Banana"));
// true

console.log(fruits.includes("Mango"));
// false
```

```text
includes → "Does it exist?"
          → true / false
```

---

## 13. `indexOf()` vs `includes()`

```ts
fruits.indexOf("Banana");
// 1
```

```ts
fruits.includes("Banana");
// true
```

Therefore:

```text
indexOf  → gives position
includes → gives true/false
```

---

## 14. `toString()`

Converts an array into a string.

```ts
let numbers = [1, 2, 3];

let result = numbers.toString();

console.log(result);
// "1,2,3"
```

```text
array → toString() → string
```

---

## 15. The 10 Methods

| Method | Purpose |
|---|---|
| `push()` | Add to end |
| `pop()` | Remove from end |
| `unshift()` | Add to beginning |
| `shift()` | Remove from beginning |
| `concat()` | Combine arrays |
| `slice()` | Extract a section |
| `splice()` | Add/remove/replace |
| `indexOf()` | Find index |
| `includes()` | Check existence |
| `toString()` | Convert array to string |

---

## 16. Priority for Playwright / Automation

### High Priority

```text
push()
pop()
slice()
splice()
indexOf()
includes()
```

### Understand

```text
unshift()
shift()
concat()
toString()
```

You do not need to memorize every array method immediately. Understand what each method does and recognize it when reading automation code.

---

## 17. Array Methods vs Loops

Many array operations can also be written using a `for` loop.

Example:

```ts
let fruits = ["Apple", "Banana", "Orange"];

for (let fruit of fruits) {
    if (fruit === "Banana") {
        console.log("Found");
        break;
    }
}
```

Or:

```ts
fruits.includes("Banana");
```

Array methods are convenient built-in operations. You do not need to replace every `for` loop with a method.

---

## Quick Revision

```text
push     → add END
pop      → remove END

unshift  → add START
shift    → remove START

concat   → combine arrays

slice    → extract section
           start included
           end excluded

splice   → modify array
           add/remove/replace

indexOf  → find index
           not found → -1

includes → check existence
           true / false

toString → array → string
```
