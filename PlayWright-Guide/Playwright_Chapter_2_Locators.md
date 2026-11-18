# Playwright – Chapter 2: Locators

These notes follow the topics and examples covered in the supplied transcript. The examples use the same kind of demo pages shown there (nopCommerce and a small local HTML page).

## 1. Introduction to locators

A UI automation test commonly has three steps:

1. **Locate the element** on the web page.
2. **Perform an action** on it, such as clicking or entering text.
3. **Add an assertion** to validate the element or the result.

A locator identifies an element using information such as its role, visible text, label, or HTML attributes.

Playwright provides built-in locator methods. The transcript introduces these seven:

- `getByAltText()`
- `getByText()`
- `getByRole()`
- `getByLabel()`
- `getByPlaceholder()`
- `getByTitle()`
- `getByTestId()`

CSS and XPath are also supported. The transcript's recommended preference is to start with Playwright's built-in locators, then use CSS, and use XPath when appropriate.

### Basic test structure

```ts
import { test, expect } from '@playwright/test';

test('verify Playwright locators', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/');

  // Locator and assertion examples go here.
});
```

- `test` is used to define a test.
- `expect` is used for assertions.
- `page` is the page fixture used to interact with the browser page.
- `page.goto()` opens the specified URL.

### Locator return type and `await`

The built-in `getBy...()` methods return a `Locator` object. Creating the locator does not require `await`. Actions and assertions such as `click()`, `fill()`, and `toBeVisible()` are asynchronous and should be awaited.

```ts
const logo = page.getByAltText('nopCommerce demo store');
await expect(logo).toBeVisible();
```

Playwright locators support auto-waiting and re-resolution when an action or retrying assertion uses them. This helps reduce the need for fixed waits.

## 2. Using Alt Text Locators – `getByAltText()`

`getByAltText()` locates an element using its `alt` attribute. It is commonly used for images, such as a website logo. The transcript demonstrates inspecting the nopCommerce logo and finding its `alt` value: `nopCommerce demo store`.

**Example: locate the logo and verify it is visible**

```ts
const logo = page.getByAltText('nopCommerce demo store');
await expect(logo).toBeVisible();
```

The locator can also be used for an action if the element is designed to be interactive. For example, if an image is inside a clickable link, the link is usually the better target for a click.

**Remember:** the value passed to `getByAltText()` must match the element's alternative text. Inspect the element in browser DevTools to find the value.

## 3. Locating by Text Content – `getByText()`

`getByText()` locates an element using the text displayed inside it. Unlike `alt`, the text is generally the element's inner/visible text, not an HTML attribute.

It is useful for text such as headings, paragraphs, messages, and other visible content. The transcript uses the text **Welcome to our store** as an example.

```ts
await expect(
  page.getByText('Welcome to our store')
).toBeVisible();
```

The transcript explains that text matching can use:

- A text string.
- A substring of the text.
- A regular expression.

```ts
// Text string
await expect(page.getByText('Welcome to our store')).toBeVisible();

// Regular expression (case-insensitive)
await expect(page.getByText(/welcome to our store/i)).toBeVisible();
```

Use `getByText()` when the main purpose is to find visible text. For interactive elements such as buttons and links, `getByRole()` is often a clearer choice.

## 4. Using Role Locators – `getByRole()`

`getByRole()` locates an element using its **accessibility role**. A role is not necessarily an HTML attribute. Many HTML elements have an implicit role based on their element type; some roles are explicitly provided through accessibility markup.

Examples of roles discussed in the transcript:

| Element | Role example |
|---|---|
| Button | `button` |
| Link (`a`) | `link` |
| Heading (`h1`–`h6`) | `heading` |
| Checkbox | `checkbox` |
| Radio button | `radio` |
| Text input | `textbox` |

The transcript demonstrates locating links, headings, buttons, and checkboxes by role. You can also pass a `name` option to identify the element by its accessible name.

```ts
// Locate a link by role and accessible name
const registerLink = page.getByRole('link', { name: 'Register' });
await expect(registerLink).toBeVisible();

// Locate a heading
const signUpHeading = page.getByRole('heading', { name: 'Sign Up' });
await expect(signUpHeading).toBeVisible();

// Locate and click a button
await page.getByRole('button', { name: 'Search' }).click();
```

The `name` option here means the **accessible name** of the element; it does not mean the HTML `name` attribute. Use the correct role for the element. Playwright's documentation lists the supported roles and their meanings.

## 5. Label and Placeholder Locators

### 5.1 `getByLabel()`

`getByLabel()` is useful for locating form controls through their associated visible labels. The transcript demonstrates filling the First name, Last name, and Email fields on a registration form.

```ts
await page.getByLabel('First name:').fill('John');
await page.getByLabel('Last name:').fill('Doe');
await page.getByLabel('Email:').fill('john@example.com');
```

The label must be associated with the corresponding form control. Inspect the page if the locator does not find the field. The transcript also demonstrates that a missing `await` on an asynchronous operation can cause the test not to behave as expected.

### 5.2 `getByPlaceholder()`

Some input fields have a `placeholder` attribute that displays hint text inside the field. `getByPlaceholder()` locates the input using that value. The transcript uses the nopCommerce search field with the placeholder `Search store`.

```ts
const searchBox = page.getByPlaceholder('Search store');
await searchBox.fill('computer');
```

`fill()` enters the supplied value into the input. Use the placeholder text exactly as it appears in the page's HTML attribute.

## 6. Title and Test ID Locators

### 6.1 `getByTitle()`

`getByTitle()` locates an element using its HTML `title` attribute. Use it when the element has a meaningful title value. The transcript demonstrates a link with the title `Homepage link` and verifies its text.

```ts
const homeLink = page.getByTitle('Homepage link');
await expect(homeLink).toBeVisible();
await expect(homeLink).toHaveText('Home');
```

The `title` attribute is different from the browser page title. This locator uses the element's `title` attribute.

### 6.2 `getByTestId()`

`getByTestId()` locates an element using a test ID attribute. By default, Playwright looks for `data-testid`. The transcript demonstrates using test IDs on a local HTML page to verify profile details such as an email address and a name.

```ts
await expect(page.getByTestId('profile-email'))
  .toHaveText('Email Address');

await expect(page.getByTestId('profile-name'))
  .toHaveText('John Doe');
```

A test ID can be useful when a user-facing locator is not suitable or stable. The application needs to contain the corresponding test ID attribute.

#### Customizing the test ID attribute

The transcript also demonstrates changing the attribute name in the HTML and configuring Playwright to use that custom attribute in `playwright.config.ts`.

For example, if the HTML uses `data-pw` instead of `data-testid`, configure:

```ts
use: {
  testIdAttribute: 'data-pw',
},
```

After this configuration, `getByTestId('profile-email')` looks for the value `profile-email` in the `data-pw` attribute. The locator method and the test ID value do not need to change; the configured attribute name tells Playwright where to look.

## 7. Quick comparison

| Locator | Finds an element using | Example |
|---|---|---|
| `getByAltText()` | `alt` attribute | `page.getByAltText('Company logo')` |
| `getByText()` | Visible text | `page.getByText('Welcome to our store')` |
| `getByRole()` | Accessibility role and optionally accessible name | `page.getByRole('button', { name: 'Search' })` |
| `getByLabel()` | Associated form label | `page.getByLabel('Email:')` |
| `getByPlaceholder()` | Placeholder attribute | `page.getByPlaceholder('Search store')` |
| `getByTitle()` | `title` attribute | `page.getByTitle('Homepage link')` |
| `getByTestId()` | Test ID attribute (default `data-testid`) | `page.getByTestId('profile-email')` |

## Key points to remember

- A test generally identifies an element, performs an action, and validates the result.
- The seven built-in locators covered here are `getByAltText`, `getByText`, `getByRole`, `getByLabel`, `getByPlaceholder`, `getByTitle`, and `getByTestId`.
- Inspect the DOM to understand which attribute, text, label, or role is available.
- Locator creation is synchronous; await asynchronous actions and assertions.
- Use `fill()` to enter a value into an input field.
- `getByRole()` uses accessibility roles and accessible names.
- `getByTestId()` uses `data-testid` by default, and the attribute can be customized in the Playwright configuration.
