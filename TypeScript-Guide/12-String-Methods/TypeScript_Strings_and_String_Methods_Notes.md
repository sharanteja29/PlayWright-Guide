# TypeScript Day 12 — Strings and String Methods

## 1. What I learned in this class

In this class, I learned what strings are in JavaScript and TypeScript, how to declare them, and how to use common string properties and methods.

The main topics covered in the transcript are:

1. Declaring strings with single quotes, double quotes, and backticks
2. Template literals and inserting variables into strings
3. The `length` property
4. `toUpperCase()` and `toLowerCase()`
5. `charAt()` and `indexOf()`
6. `substring()`
7. `includes()`
8. `startsWith()` and `endsWith()`
9. `replace()`
10. `split()`
11. `trim()`, `trimStart()`, and `trimEnd()`
12. `concat()`
13. String immutability
14. Multiline strings
15. Applying string methods to test automation

The examples below follow the transcript's teaching sequence, with extra explanations and practical TypeScript examples added where useful.

---

## 2. What is a string?

A **string** is a sequence of text characters. It can contain letters, digits, spaces, punctuation, and other characters.

```ts
let message: string = "Hello, TypeScript!";
let city: string = 'Hyderabad';
let greeting: string = `Welcome`;
```

All three variables contain strings.

### Numbers versus numeric-looking strings

```ts
let age: number = 23;
let ageText: string = "23";
```

These are not the same type:

- `age` is a number, so it can be used in arithmetic.
- `ageText` is a string, even though its characters look like a number.

For example:

```ts
console.log(23 + 5);       // 28
console.log("23" + "5");   // "235"
```

With strings, `+` can concatenate text rather than add numeric values.

### Type annotations and type inference

In TypeScript, I can explicitly declare the type:

```ts
let message: string = "Hello";
```

TypeScript can also infer the type from the assigned value:

```ts
let message = "Hello"; // inferred as string
```

For learning and clarity, explicit annotations are useful. In real projects, I do not need to write a type annotation everywhere when TypeScript can infer the type safely.

---

## 3. Three ways to write string literals

JavaScript and TypeScript support three common delimiters for string literals.

### Single quotes

```ts
let str1: string = 'This is a string with single quotes';
```

### Double quotes

```ts
let str2: string = "This is a string with double quotes";
```

### Backticks

```ts
let str3: string = `This is a string with backticks`;
```

For these examples, the resulting values are equivalent. The main extra features of backticks are **template interpolation** and convenient **multiline strings**.

Single and double quotes are both common. The important thing is to keep the opening and closing delimiters consistent.

---

## 4. Template literals: inserting a variable into a string

A template literal uses backticks (`` ` ``). To insert a variable or expression into it, I use `${...}`.

```ts
const number: number = 10;

console.log(`The number is ${number}`);
```

Output:

```text
The number is 10
```

The expression `${number}` is evaluated and its value is inserted into the string.

I can also insert calculations:

```ts
const price: number = 100;
const quantity: number = 3;

console.log(`Total price: ${price * quantity}`);
```

Output:

```text
Total price: 300
```

### Why not use ordinary quotes for interpolation?

```ts
const number: number = 10;

console.log("The number is ${number}");
```

This prints the literal text `${number}`. It does not substitute the variable.

To interpolate a variable, I need backticks:

```ts
console.log(`The number is ${number}`);
```

### Another valid option: concatenation

```ts
console.log("The number is " + number);
```

This also produces `The number is 10`. However, template literals are often easier to read when a string contains several variables.

---

## 5. Strings have indexes, starting at zero

Like arrays, strings use zero-based indexing. Each position identifies a character.

For this string:

```ts
const word: string = "Welcome";
```

| Character | W | e | l | c | o | m | e |
|---|---:|---:|---:|---:|---:|---:|---:|
| Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 |

The first character is at index `0`, not index `1`.

**Index and length are different concepts:**
- An index identifies a position and starts at zero.
- Length counts the number of characters and starts at one for a one-character string.

---

## 6. `length` — count the string's length

`length` is a **property**, not a method. Therefore, I do not add parentheses.

```ts
const str: string = "Hello, TypeScript!";

console.log(str.length);
```

Output:

```text
18
```

The count includes letters, spaces, commas, and punctuation.

```ts
const text: string = "Hi!";

console.log(text.length); // 3
```

The characters are `H`, `i`, and `!`, so the length is three.

### Property versus method

```ts
str.length       // property — no parentheses
str.toUpperCase() // method — parentheses
```

This distinction is important in TypeScript and JavaScript.

**Technical note:** JavaScript string length counts UTF-16 code units, not necessarily user-perceived characters. For ordinary English text this usually behaves as expected, but some emoji and certain Unicode characters can count as more than one.

---

## 7. `toUpperCase()` and `toLowerCase()`

These methods return a new string with the letters converted to uppercase or lowercase.

```ts
const str: string = "Hello, TypeScript!";

console.log(str.toUpperCase()); // "HELLO, TYPESCRIPT!"
console.log(str.toLowerCase()); // "hello, typescript!"
```

They are useful for normalizing text before comparing it.

```ts
const actualText: string = "SUCCESS";
const expectedText: string = "success";

console.log(actualText.toLowerCase() === expectedText.toLowerCase());
// true
```

### Important: these methods do not change the original string

```ts
let str: string = "Hello";

const upper = str.toUpperCase();

console.log(upper); // "HELLO"
console.log(str);   // "Hello"
```

If I want to store the transformed value back in the variable, I must assign it:

```ts
str = str.toUpperCase();

console.log(str); // "HELLO"
```

String methods are case-sensitive in their matching behavior unless I explicitly normalize the text or use another appropriate technique.

---

## 8. `charAt()` and `indexOf()`

These two methods are related but work in opposite directions.

- `charAt(index)` takes an index and returns the character at that position.
- `indexOf(searchText)` takes text to search for and returns the index where that text first appears.

### `charAt()`

```ts
const str: string = "Hello, TypeScript!";

console.log(str.charAt(4)); // "o"
```

The indexes at the beginning are:

| Character | H | e | l | l | o |
|---|---:|---:|---:|---:|---:|
| Index | 0 | 1 | 2 | 3 | 4 |

So `charAt(4)` returns `"o"`.

If the requested index is outside the string, `charAt()` returns an empty string.

### `indexOf()`

```ts
const str: string = "Hello, TypeScript!";

console.log(str.indexOf("TypeScript")); // 7
console.log(str.indexOf("Hello"));      // 0
console.log(str.indexOf("Python"));     // -1
```

`indexOf()` returns the index of the first match. If the text is not found, it returns `-1`.

### Important details

- Indexes start at zero.
- `indexOf()` is case-sensitive.
- If the searched text appears more than once, `indexOf()` returns the first occurrence.
- An empty search string returns `0`.

### `charAt()` versus bracket indexing

JavaScript also allows:

```ts
const str: string = "Hello";

console.log(str.charAt(1)); // "e"
console.log(str[1]);        // "e"
```

Both work for this example. `charAt()` returns an empty string for an out-of-range index, whereas bracket indexing returns `undefined`.

---

## 9. `substring()` — extract part of a string

`substring()` extracts characters between a start index and an end index.

```ts
const word: string = "Welcome";

console.log(word.substring(2, 4)); // "lc"
```

The indexes are:

| Character | W | e | l | c | o | m | e |
|---|---:|---:|---:|---:|---:|---:|---:|
| Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 |

`substring(2, 4)` starts at index `2` and stops **before** index `4`. It therefore returns the characters at indexes `2` and `3`: `"lc"`.

### The end index is exclusive

```ts
const str: string = "Hello, TypeScript!";

console.log(str.substring(0, 5));  // "Hello"
console.log(str.substring(7, 17)); // "TypeScript"
```

The end index is not included in the result.

### A reliable way to calculate it

If I want to extract the characters from index `start` up to (but not including) index `end`, I can write:

```ts
str.substring(start, end);
```

For example, to extract `"come"` from `"Welcome"`:

```ts
const word: string = "Welcome";

console.log(word.substring(3, 7)); // "come"
```

### Extra behavior worth knowing

- If the second argument is omitted, `substring(start)` returns from `start` to the end.
- Negative arguments are treated as `0`.
- If the start index is greater than the end index, `substring()` swaps them.

For more advanced use, `slice()` is another common string method. It has different behavior for negative indexes, so I should not assume it behaves exactly like `substring()`.

---

## 10. `includes()` — check whether text exists

`includes()` checks whether a string contains a specified piece of text. It returns a Boolean: `true` or `false`.

```ts
const str: string = "Hello, TypeScript!";

console.log(str.includes("TypeScript")); // true
console.log(str.includes("Python"));     // false
console.log(str.includes("!"));          // true
```

This is useful when I need to check whether a message contains an expected phrase.

### It is case-sensitive

```ts
const str: string = "Hello, TypeScript!";

console.log(str.includes("TypeScript")); // true
console.log(str.includes("TYPESCRIPT")); // false
```

If the comparison should ignore case, I can normalize both values:

```ts
const actual: string = "Hello, TypeScript!";
const expected: string = "TYPESCRIPT";

console.log(actual.toLowerCase().includes(expected.toLowerCase()));
// true
```

Use this only when case-insensitive matching is appropriate for the requirement.

---

## 11. `startsWith()` and `endsWith()`

These methods check the beginning and end of a string. Both return Boolean values.

### `startsWith()`

```ts
const str: string = "Hello, TypeScript!";

console.log(str.startsWith("Hello")); // true
console.log(str.startsWith("Type"));  // false
```

The string begins with `"Hello"`, but it does not begin with `"Type"`.

### `endsWith()`

```ts
const str: string = "Hello, TypeScript!";

console.log(str.endsWith("!"));           // true
console.log(str.endsWith("TypeScript!")); // true
console.log(str.endsWith("Hello"));       // false
```

These methods are case-sensitive:

```ts
console.log(str.startsWith("hello")); // false
```

### When might I use them?

- Checking whether a filename ends with `.pdf`.
- Checking whether a URL begins with an expected prefix.
- Checking whether a message ends with a required suffix.
- Checking a label or identifier format.

For actual URL validation or security-sensitive checks, a simple prefix check is not enough; I should use appropriate URL parsing and validation.

---

## 12. `replace()` — replace part of a string

`replace()` returns a new string in which a match is replaced.

```ts
const str: string = "Hello, TypeScript!";

const updated = str.replace("TypeScript", "World");

console.log(updated); // "Hello, World!"
console.log(str);     // "Hello, TypeScript!"
```

The original string is unchanged.

### Replace the first matching occurrence

With a string search value, `replace()` replaces the **first occurrence** of that text.

```ts
const message: string = "cat cat cat";

console.log(message.replace("cat", "dog"));
// "dog cat cat"
```

To replace every occurrence, I can use `replaceAll()`:

```ts
console.log(message.replaceAll("cat", "dog"));
// "dog dog dog"
```

A global regular expression can also replace all matches.

### Case sensitivity

```ts
const message: string = "TypeScript is useful";

console.log(message.replace("typescript", "JavaScript"));
// "TypeScript is useful"
```

The lowercase search text does not match `"TypeScript"` because the capitalization differs.

### When might I use `replace()`?

- Removing or replacing a known substring.
- Normalizing a simple text value.
- Preparing text for display.
- Replacing a placeholder in a message.

For complex text patterns, regular expressions may be more suitable.

---

## 13. `split()` — turn a string into an array

`split()` divides a string into an array of substrings using a separator, also called a **delimiter**.

### Example A: Split using a space

```ts
const str: string = "Hello TypeScript";

const words: string[] = str.split(" ");

console.log(words);    // ["Hello", "TypeScript"]
console.log(words[0]); // "Hello"
console.log(words[1]); // "TypeScript"
```

The space is the delimiter. It is removed from the resulting pieces.

### Example B: Split an email and a password separated by a comma

```ts
const input: string = "user@example.com,abc123";

const parts: string[] = input.split(",");

console.log(parts[0]); // "user@example.com"
console.log(parts[1]); // "abc123"
```

This demonstrates how `split()` works. However, **real passwords should not be stored in source code or handled through insecure text parsing**. This example is only about the string method.

### Example C: Split a comma-separated list

```ts
const csv: string = "apple,banana,orange";

const fruits: string[] = csv.split(",");

console.log(fruits);
// ["apple", "banana", "orange"]
```

### Important details

- The separator determines where the string is divided.
- If the separator appears multiple times, multiple splits can occur.
- The separator is not included in the output pieces.
- If the separator is not found, the result is an array containing the original string.
- `split("")` splits by UTF-16 code units, which can separate some Unicode characters in unexpected ways.

### Common follow-up: trim each item

If the input has spaces after commas:

```ts
const csv: string = "apple, banana, orange";

const fruits: string[] = csv.split(",").map((fruit) => fruit.trim());

console.log(fruits);
// ["apple", "banana", "orange"]
```

This combines `split()`, `map()`, and `trim()`.

---

## 14. `trim()`, `trimStart()`, and `trimEnd()`

These methods remove whitespace from a string's boundaries. They do not remove whitespace from the middle of the string.

```ts
const text: string = "   Welcome to TypeScript   ";

console.log(text.trim());
// "Welcome to TypeScript"

console.log(text.trimStart());
// "Welcome to TypeScript   "

console.log(text.trimEnd());
// "   Welcome to TypeScript"
```

- `trim()` removes whitespace from both ends.
- `trimStart()` removes whitespace from the beginning.
- `trimEnd()` removes whitespace from the end.

### Trimming does not change internal spaces

```ts
const text: string = "  Hello   World  ";

console.log(text.trim()); // "Hello   World"
```

The three spaces between `"Hello"` and `"World"` remain.

### Why is trimming useful in automation?

Text retrieved from a UI or input fields may contain extra whitespace. Trimming can help normalize values before comparison.

```ts
const actualText: string = "  Login successful  ";
const expectedText: string = "Login successful";

console.log(actualText.trim() === expectedText); // true
```

I should trim only when leading or trailing whitespace is irrelevant to the requirement. Sometimes whitespace is meaningful and must be tested.

---

## 15. `concat()` — join strings

`concat()` joins strings and returns a new string.

```ts
const str1: string = "Welcome";
const str2: string = " to TypeScript";

const result = str1.concat(str2);

console.log(result); // "Welcome to TypeScript"
```

I can chain calls to concatenate more strings:

```ts
const str1: string = "Welcome";
const str2: string = " to ";
const str3: string = "TypeScript";

const result = str1.concat(str2).concat(str3);

console.log(result); // "Welcome to TypeScript"
```

I can also pass multiple strings to `concat()`:

```ts
console.log("Welcome".concat(" to ", "TypeScript"));
// "Welcome to TypeScript"
```

So, unlike the transcript's suggestion, `concat()` is not limited to just one argument.

### The `+` operator

The plus operator is also a common way to join strings:

```ts
const result = str1 + str2;
```

For combining variables into readable messages, template literals are often clearer:

```ts
const language: string = "TypeScript";

console.log(`Welcome to ${language}`);
```

`concat()` is valid, but I should choose the form that makes the code easiest to understand. The `+` operator can perform either numeric addition or string concatenation depending on its operands.

---

## 16. String immutability

Strings in JavaScript and TypeScript are **immutable**. This means a string's contents cannot be changed in place.

String methods generally return a result rather than modifying the original string.

```ts
let str: string = "welcome";

const upper = str.toUpperCase();

console.log(upper); // "WELCOME"
console.log(str);   // "welcome"
```

The call to `toUpperCase()` returns a new string. It does not alter the existing string value.

### Assignment changes what the variable refers to

```ts
let str: string = "welcome";

str = str.toUpperCase();

console.log(str); // "WELCOME"
```

This does not contradict immutability. The string itself was not changed in place; the variable was assigned the returned string value.

### `concat()` works the same way

```ts
const str1: string = "Welcome";

const combined = str1.concat(" to TypeScript");

console.log(combined); // "Welcome to TypeScript"
console.log(str1);     // "Welcome"
```

The original `str1` value remains `"Welcome"`.

### Mutable versus immutable

- **Immutable value:** its contents cannot be changed in place; operations produce results.
- **Mutable object:** its state can be changed after creation.

Arrays, for example, are mutable objects, even though some array methods such as `map()` and `filter()` create new arrays rather than mutating the original. It is important not to assume that every array method behaves the same way.

---

## 17. Multiline strings with backticks

Backticks allow a string literal to span multiple lines.

```ts
const message: string = `Welcome to TypeScript.
This is the second line.
This is the third line.`;

console.log(message);
```

Output:

```text
Welcome to TypeScript.
This is the second line.
This is the third line.
```

Ordinary single-quoted and double-quoted string literals cannot contain an unescaped line break in the same way.

Template literals also support interpolation:

```ts
const name: string = "Sharan";

const message: string = `Hello, ${name}.
Welcome to TypeScript!`;

console.log(message);
```

This is useful for longer messages and readable text templates.

---

## 18. Summary of string properties and methods

| Property or method | Purpose | Return type / result |
|---|---|---|
| `length` | Count string length | `number` |
| `toUpperCase()` | Convert letters to uppercase | `string` |
| `toLowerCase()` | Convert letters to lowercase | `string` |
| `charAt(index)` | Get character at an index | `string` |
| `indexOf(text)` | Find first matching index | `number` (`-1` if not found) |
| `substring(start, end)` | Extract a section | `string` |
| `includes(text)` | Check whether text occurs | `boolean` |
| `startsWith(text)` | Check the beginning | `boolean` |
| `endsWith(text)` | Check the ending | `boolean` |
| `replace(search, replacement)` | Replace the first match for a string search | `string` |
| `replaceAll(search, replacement)` | Replace all matches | `string` |
| `split(separator)` | Divide into pieces | `string[]` |
| `trim()` | Remove whitespace at both ends | `string` |
| `trimStart()` | Remove leading whitespace | `string` |
| `trimEnd()` | Remove trailing whitespace | `string` |
| `concat(...)` | Join strings | `string` |

Remember: `length` is a property, so it does not use parentheses. The others listed here are methods and are called with parentheses.

---

## 19. Applying string methods to Playwright testing

String methods are useful in automation when I need to inspect text, normalize values, or prepare test data. These are TypeScript operations; they do not replace Playwright's locators and assertions.

### Example A: Check text from a locator

```ts
import { test, expect } from "@playwright/test";

test("page heading contains expected text", async ({ page }) => {
  await page.goto("https://example.com");

  const headingText = await page.locator("h1").textContent();

  expect(headingText?.includes("Example")).toBeTruthy();
});
```

Here, `textContent()` can return `null`, so optional chaining (`?.`) prevents a method call if the value is null. For production tests, I would normally use a locator assertion when possible:

```ts
await expect(page.locator("h1")).toContainText("Example");
```

The Playwright assertion is usually clearer and benefits from Playwright's automatic waiting behavior.

### Example B: Compare text without case sensitivity

```ts
const actual: string = "LOGIN SUCCESSFUL";
const expected: string = "Login Successful";

expect(actual.toLowerCase()).toBe(expected.toLowerCase());
```

This comparison deliberately ignores case. I should not do this if the requirement says that capitalization must match exactly.

### Example C: Check a filename extension

```ts
const fileName: string = "report.pdf";

expect(fileName.endsWith(".pdf")).toBeTruthy();
```

### Example D: Clean whitespace before comparing

```ts
const actual: string = "  Payment successful  ";
const expected: string = "Payment successful";

expect(actual.trim()).toBe(expected);
```

Again, trimming is correct only if boundary whitespace is irrelevant.

### Example E: Parse a simple label

```ts
const label: string = "Price: 250";

const parts: string[] = label.split(":");

console.log(parts[0].trim()); // "Price"
console.log(parts[1].trim()); // "250"
```

For complex formats such as currency, dates, or CSV files, I should use suitable parsing logic rather than relying on a fragile delimiter assumption.

---

## 20. Common mistakes to avoid

1. **Using `${variable}` inside ordinary quotes.** Interpolation requires backticks.
2. **Treating `"23"` as a number.** It is a string because it is quoted.
3. **Confusing index with length.** Indexing begins at zero; length counts the number of UTF-16 code units.
4. **Writing `str.length()`.** `length` is a property and should be written as `str.length`.
5. **Assuming `indexOf()` returns `0` when text is missing.** It returns `-1`.
6. **Forgetting that string searches are usually case-sensitive.** `"TypeScript"` and `"TYPESCRIPT"` are different strings.
7. **Including the end index in `substring()`.** The end index is exclusive.
8. **Assuming `replace()` replaces every occurrence.** With a string search value, it replaces the first occurrence; use `replaceAll()` or a global regular expression for all matches.
9. **Assuming `trim()` removes spaces in the middle.** It removes whitespace at the beginning and end only.
10. **Assuming string methods mutate the original string.** They return results; assign the result if I want to store it.
11. **Assuming `concat()` only accepts one argument.** It can accept multiple string arguments.
12. **Using `includes()` when an exact match is required.** `includes()` checks for a substring, not equality.

---

## 21. Practice questions

Try these before checking the answer key.

1. Declare a string variable containing `Hello TypeScript`.
2. Print `The value is 10` using a template literal.
3. What does `"Welcome".length` return?
4. What does `"Welcome".charAt(2)` return?
5. What does `"Welcome".indexOf("come")` return?
6. What does `"Welcome".substring(3, 7)` return?
7. What does `"Hello TypeScript".includes("typescript")` return, and why?
8. What do `startsWith()` and `endsWith()` check?
9. What is the difference between `replace()` and `replaceAll()`?
10. Split `"red,green,blue"` into an array.
11. What is the difference between `trim()`, `trimStart()`, and `trimEnd()`?
12. Why does calling `toUpperCase()` not change the original string?
13. How can I combine three strings using a template literal?
14. What does `indexOf()` return if the text is not found?
15. Which Playwright approach is usually clearer for verifying that a locator contains text: a manual string check or `toContainText()`?

### Answer key

1. `const message: string = "Hello TypeScript";`
2. `const value = 10; console.log(\`The value is ${value}\`);`
3. `7`
4. `"l"`
5. `3`
6. `"come"`
7. `false`, because the search is case-sensitive.
8. `startsWith()` checks the beginning; `endsWith()` checks the ending.
9. `replace()` with a string search replaces the first occurrence; `replaceAll()` replaces all occurrences.
10. `"red,green,blue".split(",")` returns `["red", "green", "blue"]`.
11. `trim()` removes whitespace from both ends, `trimStart()` from the beginning, and `trimEnd()` from the end.
12. Strings are immutable; the method returns a new string.
13. Example: `` `${first} ${second} ${third}` ``
14. `-1`
15. `await expect(locator).toContainText("expected text")` is generally clearer and uses Playwright's assertion behavior.

---

## 22. Quick revision sheet

- **String:** text enclosed in single quotes, double quotes, or backticks.
- **Backticks:** enable `${...}` interpolation and multiline strings.
- **`length`:** counts string length; no parentheses.
- **`toUpperCase()` / `toLowerCase()`:** change letter case in the returned string.
- **`charAt(index)`:** character at a position.
- **`indexOf(text)`:** first matching position, or `-1`.
- **`substring(start, end)`:** extract text; the end index is excluded.
- **`includes(text)`:** checks whether text exists.
- **`startsWith()` / `endsWith()`:** check the beginning or ending.
- **`replace()` / `replaceAll()`:** replace one match or all matches.
- **`split(separator)`:** creates an array from a string.
- **`trim()` / `trimStart()` / `trimEnd()`:** remove boundary whitespace.
- **`concat()`:** joins strings.
- **Immutability:** string methods return results; they do not modify the original string in place.

The best way to master these methods is to write small examples, predict their outputs, and then run them. For Playwright, focus especially on `includes()`, `startsWith()`, `endsWith()`, `trim()`, `split()`, and case conversion, while using Playwright's built-in assertions for page checks whenever appropriate.
