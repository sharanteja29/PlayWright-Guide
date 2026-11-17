# Playwright – Chapter 2: Locators

## 1. Why locators matter

A UI automation test usually follows three connected stages:

1. **Identify the element** – find the correct element in the page.
2. **Perform an action** – click, fill, select, check, or otherwise interact with it.
3. **Assert the result** – verify that the expected state or content is present.

Examples of web elements include text boxes, radio buttons, checkboxes, dropdowns, images, links, buttons, headings, and labels. An action must suit the element: fill a text box, click a button or link, check a checkbox, and usually verify an image rather than trying to click it.

A **locator** is Playwright's way of describing how to find one or more elements on a page. Locators are created from the `page` fixture and can be used for actions and assertions.

```ts
import { test, expect } from '@playwright/test';

test('verify an element', async ({ page }) => {
  await page.goto('https://example.com');

  const heading = page.getByRole('heading', { name: 'Example Domain' });
  await expect(heading).toBeVisible();
});
```

`test` defines a test, `expect` performs assertions, and `page` represents a browser tab/page supplied by Playwright Test.

## 2. Locator preference and available strategies

Playwright supports several locator strategies:

| Strategy | Typical use |
|---|---|
| Built-in, user-facing locators | Roles, visible text, labels, placeholders, image alt text, titles |
| Test ID locator | Stable attributes deliberately added for automation |
| CSS locator | HTML tags, IDs, classes, attributes, and CSS relationships |
| XPath locator | XPath expressions for DOM relationships or cases not conveniently expressed otherwise |

The recommended starting point is usually a locator that reflects how a user or assistive technology identifies the control: role and accessible name, label, placeholder, or visible text. A dedicated test ID is also a good choice when the application provides one. CSS and XPath remain supported, but selectors tied to implementation details can become brittle when the page structure changes.

There is no universal rule that CSS must always be used before XPath. Choose the clearest, most stable locator for the element. Prefer readable and resilient locators over selectors that merely happen to work today.

## 3. DOM fundamentals

### 3.1 What is the DOM?

DOM stands for **Document Object Model**. When a browser loads a page, it parses the HTML and constructs an in-memory, hierarchical representation of the document. JavaScript can modify that representation while the page is running.

The DOM is not simply the original HTML source:

- **Page source / response HTML** is the markup initially delivered by the server (possibly with scripts and other resources).
- **DOM** is the browser's current document representation after parsing and any runtime changes made by JavaScript.
- **Rendered UI** is what the browser displays to the user based on the current DOM, CSS, assets, and layout.

A page may change after it loads. JavaScript can insert, remove, or update DOM nodes, so the live DOM may differ from the original page source.

### 3.2 Inspecting the DOM

On macOS, open browser Developer Tools using the browser's Inspect command or the keyboard shortcut configured by that browser. In Chrome, `⌥ Option + ⌘ Command + I` opens DevTools; right-click an element and choose **Inspect** to jump to it.

In the Elements panel:

- The element's tag name identifies its HTML element type, such as `input`, `button`, `img`, `a`, `div`, or `textarea`.
- Attributes provide additional information, such as `id`, `class`, `name`, `type`, `placeholder`, `alt`, `title`, and `data-testid`.
- The nesting and indentation show parent/child relationships.
- The element picker lets you select an element in the page and inspect its corresponding DOM node.

Example:

```html
<input id="account-number" name="accountNumber" type="text" placeholder="Enter account number">
```

- Tag: `input`
- `id`: `account-number`
- `name`: `accountNumber`
- `type`: `text`
- `placeholder`: `Enter account number`

These details help determine which locator is appropriate. Do not assume every visible element has every attribute.

## 4. How Playwright locators behave

A locator is a reusable query, not a permanently captured DOM element. Playwright resolves it when an action or assertion needs to operate on the page. This is useful when the DOM changes or an element is rendered later.

### 4.1 Auto-waiting and re-resolution

For locator actions, Playwright automatically waits for the element to satisfy the relevant actionability requirements. For example, before clicking, Playwright checks conditions such as whether the target is uniquely identified, visible, stable, enabled, and able to receive events. It retries while waiting, up to the applicable timeout.

Web-first assertions such as `toBeVisible()` also retry until the assertion passes or times out. This is often called auto-waiting/retrying behavior.

**Important correction:** this does not mean every locator call waits until an element appears. Creating a locator such as `page.getByRole(...)` is normally immediate and does not itself wait for the element. Waiting occurs when an action or a retrying assertion uses the locator.

This reduces the need for arbitrary fixed delays such as `waitForTimeout(5000)`. Fixed sleeps are usually slower and less reliable than waiting for the actual expected condition.

### 4.2 Locator versus action

```ts
const submitButton = page.getByRole('button', { name: 'Submit' });
// A locator has been created. No click has happened yet.

await submitButton.click();
// The click action is performed and awaited.
```

The locator method returns a `Locator`; the action method such as `click()` returns a Promise that must be awaited.

### 4.3 Why `await` is used

Use `await` when calling an asynchronous Playwright operation that returns a Promise, including most browser actions and web-first assertions.

```ts
const logo = page.getByAltText('NopCommerce demo store'); // Locator; no await
await expect(logo).toBeVisible();                         // Promise; await
await page.getByRole('link', { name: 'Register' }).click(); // Promise; await
```

Do not use the inaccurate rule that `await` is required simply because something is an “action.” The reliable rule is: check whether the method returns a Promise. In Playwright's TypeScript API, locator creation is synchronous; actions and web-first assertions are asynchronous.

## 5. Built-in locator methods

The seven built-in methods covered in this chapter are:

1. `getByAltText()`
2. `getByText()`
3. `getByRole()`
4. `getByLabel()`
5. `getByPlaceholder()`
6. `getByTitle()`
7. `getByTestId()`

All are available from a `Page` and also from a `Locator` when scoping to a section of the page.

### 5.1 `getByAltText()` – images and alternative text

Use this locator when an element exposes meaningful alternative text through its `alt` attribute, commonly an image (`img`). It can also apply to other elements that support alternative text, such as image-type inputs and area elements.

Example DOM:

```html
<img src="logo.png" alt="NopCommerce demo store">
```

Playwright:

```ts
const logo = page.getByAltText('NopCommerce demo store');
await expect(logo).toBeVisible();
```

Or in one assertion:

```ts
await expect(page.getByAltText('NopCommerce demo store')).toBeVisible();
```

Key points:

- Pass the value of the `alt` attribute, not the tag name `img`.
- `getByAltText()` returns a locator; it does not itself verify visibility.
- Images are often informational rather than interactive. Verify that a logo is visible or has the expected attributes instead of clicking it without a meaningful user action.
- An image may have an empty or missing `alt` attribute. In that case, this locator may not be suitable; inspect the accessible semantics and choose another robust strategy.

### 5.2 `getByText()` – visible text content

Use `getByText()` to locate an element by the text it contains. It is useful for non-interactive content such as headings, paragraphs, messages, labels, and informational text. For interactive controls, prefer `getByRole()` with an accessible name when possible.

```ts
await expect(page.getByText('Welcome to our store')).toBeVisible();
```

It supports:

- Full text
- Partial text / substring matching
- Regular expressions

Examples:

```ts
// Text matching (default matching is not exact)
await expect(page.getByText('Welcome to our store')).toBeVisible();

// A substring can match within the element's text
await expect(page.getByText('Welcome to')).toBeVisible();

// Regular expression: case-insensitive match
await expect(page.getByText(/welcome\s+to\s+our\s+store/i)).toBeVisible();
```

Regular-expression reminders:

- `/pattern/` creates a regular expression.
- `\s` matches whitespace.
- `+` means one or more of the preceding expression.
- `i` makes matching case-insensitive.

For example, `/welcome\s+to/i` can match text with different capitalization and one or more whitespace characters between words.

Text matching has normalization rules. Playwright normalizes whitespace (for example, repeated spaces and line breaks) when matching text. If you need strict whole-text matching, use the `exact` option:

```ts
page.getByText('Welcome to our store', { exact: true });
```

A regular expression can be useful when capitalization or small text variations are expected, but avoid making the pattern so broad that it matches the wrong element.

### 5.3 `getByRole()` – accessibility role and accessible name

`getByRole()` locates an element by its **ARIA role** and, optionally, its accessible name and other accessibility-related properties. It is one of the most useful locators because it reflects how users of assistive technologies understand the page.

Basic syntax:

```ts
page.getByRole('role', { name: 'Accessible name' });
```

Examples:

```ts
// Link
await page.getByRole('link', { name: 'Register' }).click();

// Button
await page.getByRole('button', { name: 'Submit' }).click();

// Heading
await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();

// Checkbox
await page.getByRole('checkbox', { name: 'Subscribe' }).check();

// Textbox
await page.getByRole('textbox', { name: 'Account number' }).fill('1234567890');
```

#### Role is not necessarily a literal HTML attribute

An element can have an implicit role derived from its HTML semantics, or an explicit role supplied through ARIA. For example:

```html
<button>Submit</button>
<input type="checkbox" aria-label="Subscribe">
<h1>Register</h1>
```

- A native `button` has the implicit role `button`.
- A checkbox input has the implicit role `checkbox` because of its input type.
- An `h1` has the implicit role `heading`.

An explicit role can be provided using `role`, for example:

```html
<div role="button" tabindex="0">Continue</div>
```

The role is part of the accessibility semantics; it is not always a separately written `role="..."` attribute. Do not confuse the element's tag name with its role.

#### Common roles

| UI/HTML element | Common role |
|---|---|
| `<button>` | `button` |
| `<a href="...">` | `link` |
| `<h1>` through `<h6>` | `heading` |
| `<input type="checkbox">` | `checkbox` |
| `<input type="radio">` | `radio` |
| Text input / textarea | `textbox` |
| Search input | `searchbox` |
| `<img>` with meaningful alternative text | `img` |
| `<ul>` / `<ol>` | `list` |
| `<li>` | `listitem` |
| `<table>` | `table` |
| `<option>` | `option` |

The accessible role depends on HTML semantics and ARIA. For unusual controls, consult the WAI-ARIA role definitions and inspect the accessibility tree rather than guessing.

#### The `name` option

In `getByRole(role, { name })`, `name` means the **accessible name**, not necessarily the HTML `name` attribute. The accessible name may come from visible text, a `<label>`, `aria-label`, `aria-labelledby`, or other naming rules.

```ts
await page.getByRole('link', { name: 'Register' }).click();
```

Here:

- `link` is the role.
- `Register` is the accessible name.

You can also use a regular expression for the name:

```ts
await page.getByRole('button', { name: /submit/i }).click();
```

For headings, specify the role `heading`; the heading level can be restricted with the `level` option:

```ts
await expect(
  page.getByRole('heading', { name: 'Register', level: 1 })
).toBeVisible();
```

`getByRole()` is not limited to clickable elements. It can locate headings, lists, tables, and other semantic elements for assertions as well as controls for actions.

### 5.4 `getByLabel()` – form controls associated with labels

Use `getByLabel()` to locate a form control by its associated label. This is especially useful for registration forms, login forms, profile forms, and other data-entry screens.

Example:

```html
<label for="first-name">First name:</label>
<input id="first-name" name="firstName" type="text">
```

Playwright:

```ts
await page.getByLabel('First name:').fill('John');
```

More examples:

```ts
await page.getByLabel('Last name:').fill('Doe');
await page.getByLabel('Email:').fill('john@example.com');
```

Important details:

- The label text must be associated with the control, for example through `for`/`id`, or by wrapping the control inside a `<label>`.
- The label is not required to be visually positioned immediately beside the input; what matters is the programmatic association.
- `getByLabel()` returns a locator for the labelled control, not simply the `<label>` node.
- It is not restricted to pages that contain a complete `<form>` element. It can be used wherever a control has an associated label.
- If the page has no proper label association, `getByLabel()` may not find the control. In that situation, use another appropriate locator and consider improving the application's accessibility.

To enter text, use `fill()`:

```ts
await page.getByLabel('Email:').fill('customer@example.com');
```

`fill()` sets the input's value. It is generally the preferred method for setting a text field's complete value. If a scenario specifically tests character-by-character typing behavior, use `pressSequentially()` where appropriate. Do not use the deprecated `type()` API in new code.

### 5.5 `getByPlaceholder()` – input placeholder

Use this locator when a text-entry control has a meaningful `placeholder` attribute.

Example DOM:

```html
<input type="search" placeholder="Search store">
```

Playwright:

```ts
await page.getByPlaceholder('Search store').fill('laptop');
```

Key points:

- The placeholder is the hint shown inside an empty input; it is not the same as a label.
- A placeholder should not replace a proper accessible label. Placeholder text can disappear when the user types and may not provide a sufficiently clear accessible name.
- Use `getByLabel()` when a proper associated label exists; use `getByPlaceholder()` when the placeholder is the reliable identifier available for the control.
- `fill()` replaces the existing value. Use `pressSequentially()` if the test specifically needs keyboard-by-keyboard input behavior.

### 5.6 `getByTitle()` – title attribute

Use `getByTitle()` when an element has a meaningful HTML `title` attribute. Browsers commonly show this value as a tooltip when the pointer hovers over the element, although display behavior can vary.

Example DOM:

```html
<a href="/home" title="Homepage link">Home</a>
```

Playwright:

```ts
await expect(page.getByTitle('Homepage link')).toHaveText('Home');
```

Another example:

```ts
await expect(page.getByTitle('HTML documentation')).toBeVisible();
```

Use it only when the title attribute actually exists and is meaningful. Do not confuse the HTML `title` attribute with the page's browser-tab title. To verify the page title, use `await expect(page).toHaveTitle(...)`.

### 5.7 `getByTestId()` – dedicated automation attribute

A test ID is an attribute intentionally added to the application's markup to provide a stable hook for automated tests.

Example DOM:

```html
<div data-testid="profile-name">John Doe</div>
```

Playwright:

```ts
await expect(page.getByTestId('profile-name')).toHaveText('John Doe');
```

Another example:

```html
<input data-testid="customer-email" value="customer@example.com">
```

```ts
await expect(page.getByTestId('customer-email')).toHaveValue('customer@example.com');
```

By default, Playwright's test ID locator uses the `data-testid` attribute. The attribute name can be configured centrally in `playwright.config.ts` using `use.testIdAttribute`.

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    testIdAttribute: 'data-pw',
  },
});
```

With this configuration, the same test code works against markup such as:

```html
<div data-pw="profile-name">John Doe</div>
```

```ts
await expect(page.getByTestId('profile-name')).toHaveText('John Doe');
```

The locator method and the test ID value stay the same; only the attribute name configured in the Playwright config changes.

**Important clarification:** `testIdAttribute` configures which attribute `getByTestId()` reads. It does not make arbitrary changed markup automatically compatible. If a developer changes `data-testid` to `data-pw`, the config must be updated to `data-pw`, or the test must use another locator.

Good test ID practices:

- Ask developers to add stable, unique test IDs to important controls when user-facing locators are not sufficient.
- Use meaningful names such as `transfer-submit`, `account-balance`, and `transaction-row-123`.
- Avoid values tied to styling or layout, such as `blue-button` or `left-panel-item`.
- Keep test IDs stable across cosmetic UI changes.

## 6. Choosing the right locator

Use this quick decision guide:

| What you are locating | First locator to consider |
|---|---|
| Button such as “Transfer” | `getByRole('button', { name: 'Transfer' })` |
| Link such as “Register” | `getByRole('link', { name: 'Register' })` |
| Heading such as “Account overview” | `getByRole('heading', { name: 'Account overview' })` |
| Text message such as “Transfer successful” | `getByText('Transfer successful')` |
| Text box with an associated label | `getByLabel('Account number')` |
| Search field identified by placeholder | `getByPlaceholder('Search accounts')` |
| Logo/image with alt text | `getByAltText('Bank logo')` |
| Element with a useful title attribute | `getByTitle('Help')` |
| Element with a dedicated automation hook | `getByTestId('available-balance')` |

The same element can sometimes be found by more than one locator. Prefer the one that is most meaningful, stable, and unambiguous. For example, a submit button might be located by role and name rather than by a CSS class.

## 7. Banking application examples

These are illustrative examples for a banking UI. Adjust the names to the actual accessible names and test IDs in your application.

```ts
import { test, expect } from '@playwright/test';

test('verify account overview', async ({ page }) => {
  await page.goto('/accounts');

  // Semantic heading locator
  await expect(
    page.getByRole('heading', { name: 'Account overview' })
  ).toBeVisible();

  // Dedicated test ID for a balance value
  await expect(page.getByTestId('available-balance')).toBeVisible();
});

test('search for a beneficiary', async ({ page }) => {
  await page.goto('/beneficiaries');

  await page.getByPlaceholder('Search beneficiaries').fill('Ravi');
  await expect(page.getByText('Ravi Kumar')).toBeVisible();
});

test('submit a fund transfer form', async ({ page }) => {
  await page.goto('/transfers/new');

  await page.getByLabel('Beneficiary account number').fill('123456789012');
  await page.getByLabel('Amount').fill('2500');
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(
    page.getByRole('heading', { name: 'Review transfer' })
  ).toBeVisible();
});
```

Banking-specific locator advice:

- Prefer labels for account number, amount, OTP, and beneficiary form fields when they are correctly associated.
- Prefer roles and accessible names for buttons, links, checkboxes, tabs, and headings.
- Use stable test IDs for dynamic values or complex widgets that do not expose reliable user-facing semantics.
- Avoid selecting a transfer button by a generic class such as `.btn-primary` if a role/name locator is available.
- Be careful with duplicate names such as multiple “View details” buttons. Scope the locator to the correct transaction row or account card, or use a more specific accessible name/test ID.
- Never use real customer data, credentials, account numbers, or production transactions in practice tests. Use approved test environments and synthetic data.

## 8. Scoping locators and handling duplicate matches

A locator may match more than one element. Playwright's strictness for actions and single-element assertions helps reveal ambiguity rather than silently selecting an arbitrary match.

For example, if every transaction row has a “View details” button, first locate the relevant row and then locate its button:

```ts
const transactionRow = page.getByRole('row', {
  name: /salary credit.*₹50,000/i,
});

await transactionRow.getByRole('button', { name: 'View details' }).click();
```

If multiple matches are expected, use a collection-oriented approach such as `count()`, `all()`, or `nth()` only when the ordering/selection is intentional. Avoid using `.first()` or `.nth()` merely to hide a locator that is not unique.

```ts
const rows = page.getByRole('row');
console.log(await rows.count());
```

For a repeated list, a more robust approach is to scope by a stable row identifier or distinctive content before performing an action.

## 9. Actions and assertions used with locators

Common actions:

```ts
await locator.click();
await locator.fill('text');
await locator.check();
await locator.uncheck();
await locator.selectOption('value');
await locator.hover();
await locator.press('Enter');
```

Common web-first assertions:

```ts
await expect(locator).toBeVisible();
await expect(locator).toBeHidden();
await expect(locator).toHaveText('Expected text');
await expect(locator).toContainText('Partial text');
await expect(locator).toHaveValue('Expected value');
await expect(locator).toBeEnabled();
await expect(locator).toBeDisabled();
await expect(locator).toBeChecked();
await expect(locator).toHaveAttribute('name', 'accountNumber');
```

These assertions retry automatically until they pass or reach the assertion timeout. Prefer them over reading a value once and comparing it manually when testing UI state.

## 10. Running the locator tests and reading results

The test file shown in the material used a `.spec.ts` or `.spec.js` suffix and was run from the project terminal. For a TypeScript project, a typical command is:

```bash
npx playwright test
```

Run one test file:

```bash
npx playwright test tests/locators.spec.ts
```

Run with a visible browser window:

```bash
npx playwright test tests/locators.spec.ts --headed
```

Open the HTML report after execution:

```bash
npx playwright show-report
```

The project configuration may define multiple browser projects. If Chromium, Firefox, and WebKit are all enabled, the same test can run once per configured project. To run only Chromium without editing the config, use the configured project name:

```bash
npx playwright test --project=chromium
```

A report can show the test steps, actions, assertions, and failure details. When debugging, inspect the first meaningful failure: a later timeout may be a consequence of an earlier navigation or interaction failure.

## 11. Headed, headless, and CAPTCHA behavior

- **Headless**: the browser runs without a visible UI. This is commonly used for automated execution.
- **Headed**: the browser window is visible, useful for observing interactions and debugging.

A public demo or production website may display CAPTCHA, bot detection, or a human-verification challenge. Such a challenge is a security control, not merely a locator problem. Do not attempt to bypass it. Use an approved test environment, a test account, or a developer-provided test configuration where CAPTCHA is disabled or safely handled for authorized testing. Switching between headed and headless mode is not a legitimate or reliable way to bypass CAPTCHA; the challenge may appear in either mode.

## 12. Local HTML practice page with VS Code Live Server

The material demonstrates creating a local HTML page containing sample elements for practicing the seven locator methods. A local development server makes the page accessible through an HTTP URL and can automatically refresh the browser when the file changes.

On macOS:

1. Open the Playwright project in VS Code.
2. Create a practice HTML file, for example `app.html`, in a convenient folder.
3. Add sample headings, links, buttons, labels, inputs, images, placeholders, title attributes, and test IDs.
4. Open the Extensions view in VS Code and search for **Live Server**.
5. Install a trusted Live Server extension (verify its publisher and reviews before installing).
6. Open `app.html` and use the extension's **Open with Live Server** command, or its status-bar action.
7. The page opens at a local HTTP address, commonly `http://127.0.0.1:<port>/app.html`.
8. Use that URL in `page.goto()` while the local server is running.

Example:

```ts
await page.goto('http://127.0.0.1:5500/app.html');
```

The exact host and port can differ. Copy the actual URL shown by the extension; do not assume the port is always `5500`. The server must remain running while the test uses the page. Stop the server when practice is complete.

A Live Server is useful for locator practice because you control the HTML and can deliberately add, remove, or rename attributes to see how locators behave. It is not a replacement for testing the real banking application's actual DOM and accessibility semantics.

## 13. Important corrections and clarifications

Some explanations in the source material were simplified. Keep these accurate versions in your notes:

1. **A locator is not the same as a DOM element captured once.** It is a query that Playwright resolves when an action or assertion uses it.
2. **Locator creation does not itself wait for an element.** Auto-waiting is applied by actions and retrying assertions.
3. **Auto-waiting is not a blanket guarantee that synchronization is solved.** Navigation, network responses, application-specific readiness, and custom widgets may still need condition-based waits or explicit assertions.
4. **`getByRole()` is not restricted to interactive controls.** It also locates headings, lists, tables, and other semantic elements.
5. **The `name` option in `getByRole()` means accessible name**, not the HTML `name` attribute.
6. **`getByLabel()` does not mean “find a `<label>` tag only.”** It finds a form control through its associated label.
7. **`getByText()` matching is not always case-sensitive exact matching.** Default matching is flexible; `{ exact: true }` requests exact text matching, while regular expressions offer controlled flexibility.
8. **Not every image has useful alt text.** An empty or missing `alt` value means another locator may be needed.
9. **`getByTestId()` is configurable, not automatically adaptive.** Change `use.testIdAttribute` when the application's test-ID attribute changes.
10. **CAPTCHA should not be bypassed.** Use an authorized test setup rather than relying on headed/headless differences.
11. **Avoid arbitrary sleeps.** Prefer locator actions and web-first assertions that wait for meaningful conditions.
12. **Do not select a locator method only because an element is interactive/non-interactive.** `getByRole()` is excellent for controls and semantic content; choose based on accessible semantics and the most stable identification.

## 14. Common mistakes to avoid

- Using `getByText()` for a button when a role/name locator is clearer.
- Assuming `name` in `getByRole()` refers to the HTML `name` attribute.
- Forgetting `await` before asynchronous actions such as `click()` and `fill()`.
- Adding `await` before synchronous locator construction unnecessarily.
- Using a placeholder as the only accessible label when the application should have a proper label.
- Choosing a CSS class that changes whenever the UI is restyled.
- Using a broad text locator that matches multiple elements.
- Hiding ambiguity with `.first()` or `.nth()` without understanding the matched elements.
- Expecting `getByTestId()` to work after the configured attribute has changed without updating the config.
- Treating a CAPTCHA or bot-protection page as an ordinary automation failure to work around.
- Using production banking accounts or real customer data during automation practice.

## 15. Practice assignment

Build a small local HTML page and create a separate Playwright test file. Practice each locator with a relevant assertion or action.

- [ ] Locate a logo using `getByAltText()` and verify it is visible.
- [ ] Locate a welcome message using `getByText()`.
- [ ] Locate the same text using a substring and a regular expression.
- [ ] Locate a link using `getByRole('link', { name: ... })` and click it.
- [ ] Locate a button using `getByRole('button', { name: ... })`.
- [ ] Locate a heading using `getByRole('heading', { name: ... })` and verify visibility.
- [ ] Fill first name, last name, and email using `getByLabel()`.
- [ ] Fill a search field using `getByPlaceholder()`.
- [ ] Locate an element with a `title` attribute using `getByTitle()`.
- [ ] Locate an element using `getByTestId()`.
- [ ] Change the practice page's `data-testid` attribute to `data-pw`, configure `testIdAttribute`, and run the unchanged locator test again.
- [ ] Create two elements with the same accessible name and practice scoping the locator to the correct container.
- [ ] Run the tests in headed and headless modes and inspect the HTML report.
- [ ] Recreate one example using a banking form: account number, beneficiary, amount, and Continue button.

## 16. Interview questions and answers

**1. What is a locator in Playwright?**  
A locator is a reusable query used to identify one or more elements on a page. It supports actions and assertions and is re-resolved as needed.

**2. What is the DOM?**  
The Document Object Model is the browser's in-memory, hierarchical representation of the current document. It can change at runtime when scripts update the page.

**3. What is the difference between HTML source and DOM?**  
HTML source is the markup initially delivered or viewed as source; the DOM is the browser's current parsed and potentially modified document representation.

**4. What is auto-waiting in Playwright?**  
Playwright waits for the conditions required by an action, and web-first assertions retry until the expected condition is met or times out.

**5. Does `getByRole()` require a `role` attribute in HTML?**  
No. Many elements have implicit accessibility roles from their HTML semantics. Explicit ARIA roles can also be supplied.

**6. What does the `name` option mean in `getByRole()`?**  
It means the accessible name of the element, which may come from visible text or accessible-labeling mechanisms. It is not necessarily the HTML `name` attribute.

**7. When would you use `getByLabel()`?**  
For a form control that has an associated label, such as an email or account-number input.

**8. What is the difference between `getByText()` and `getByRole()`?**  
`getByText()` locates by text content. `getByRole()` locates by accessibility role and can further filter by accessible name.

**9. What is `getByTestId()` used for?**  
It locates elements through a dedicated attribute intended to provide a stable automation hook.

**10. How do you customize the test ID attribute?**  
Set `use.testIdAttribute` in `playwright.config.ts`, for example `testIdAttribute: 'data-pw'`.

**11. Why should arbitrary fixed waits be avoided?**  
They can make tests slow and flaky. Prefer waiting for the actual UI condition through locator actions and web-first assertions.

**12. What should you do when a locator matches multiple elements?**  
Make it more specific or scope it to the correct container. Use `.first()` or `.nth()` only when the intended ordering is deliberate.

## 17. Quick revision sheet

| Locator | Identifies by | Typical example |
|---|---|---|
| `getByAltText()` | Alternative text | Logo image |
| `getByText()` | Text content | Success message |
| `getByRole()` | Accessibility role + accessible name | Transfer button |
| `getByLabel()` | Associated form label | Account number field |
| `getByPlaceholder()` | Placeholder attribute | Search field |
| `getByTitle()` | Title attribute | Help tooltip element |
| `getByTestId()` | Configured test ID attribute | Available balance widget |

**Core flow to remember:** inspect the live DOM and accessibility semantics → choose a stable locator → perform the appropriate action → assert the expected result.

---

# 18. Expanded locator practice: actions and assertions

This section expands the seven locator methods with practical actions and assertions. The examples use a fictional banking application. Adjust the accessible names, labels, placeholders, and test IDs to match the actual application's DOM.

## 18.1 First understand the difference: locator, action, assertion

A reliable test usually has three parts:

```ts
const transferButton = page.getByRole('button', { name: 'Transfer' });
await transferButton.click();
await expect(page.getByRole('heading', { name: 'Review transfer' })).toBeVisible();
```

- **Locator:** `page.getByRole(...)` describes which element to find.
- **Action:** `.click()` interacts with the element.
- **Assertion:** `expect(...).toBeVisible()` verifies the expected result.

Creating the locator is synchronous. Actions and Playwright web-first assertions return Promises, so await them.

### Common actions

| Action | What it does | Typical target |
|---|---|---|
| `click()` | Clicks an element | Button, link, checkbox-like custom control |
| `dblclick()` | Double-clicks | An element whose UI behavior requires a double-click |
| `fill(value)` | Replaces the value of an editable field | Textbox, textarea, input |
| `clear()` | Clears an editable field | Textbox, textarea, input |
| `press(key)` | Sends a keyboard key or key combination | Text field or focused control |
| `pressSequentially(text)` | Types characters sequentially | Input where keyboard-by-keyboard behavior matters |
| `check()` / `uncheck()` | Sets checkbox/radio state | Checkbox or radio input (radio is checked, not unchecked) |
| `selectOption(value)` | Selects an option in a native `<select>` | Dropdown/select element |
| `hover()` | Moves the pointer over an element | Menu trigger, tooltip trigger |
| `focus()` / `blur()` | Focuses or removes focus from a control | Input or focusable element |
| `scrollIntoViewIfNeeded()` | Scrolls the element into view if necessary | Element outside the viewport |

Not every action applies to every locator. For example, `fill()` is for editable fields, while `selectOption()` is for a native `<select>`. A custom dropdown built from `div` elements may require clicking its trigger and then selecting an option by role or text.

### Common assertions

| Assertion | What it verifies |
|---|---|
| `toBeVisible()` / `toBeHidden()` | Visibility state |
| `toBeAttached()` / `toBeDetached()` | DOM attachment state |
| `toBeEnabled()` / `toBeDisabled()` | Whether a control is enabled |
| `toBeChecked()` | Checkbox/radio checked state |
| `toHaveText()` / `toContainText()` | Element text |
| `toHaveValue()` | Input value |
| `toHaveAttribute()` | Attribute name and value |
| `toHaveClass()` | CSS class |
| `toHaveCount()` | Number of matched elements |
| `toHaveJSProperty()` | A DOM JavaScript property |

For the page itself, common assertions include `toHaveURL()` and `toHaveTitle()`.

## 18.2 `getByRole()` – actions and assertions

Use roles and accessible names for buttons, links, textboxes, checkboxes, radio buttons, headings, and other semantic elements.

### A. Click a button and verify the next screen

```ts
test('open transfer review', async ({ page }) => {
  await page.goto('https://example.test/transfers/new');

  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(
    page.getByRole('heading', { name: 'Review transfer' })
  ).toBeVisible();
});
```

### B. Click a link and verify navigation

```ts
await page.getByRole('link', { name: 'Transaction history' }).click();
await expect(page).toHaveURL(/.*transactions/);
await expect(
  page.getByRole('heading', { name: 'Transaction history' })
).toBeVisible();
```

Use a URL regular expression when query strings or other variable URL parts are expected. If the exact URL is stable, you can assert the exact URL string.

### C. Fill a textbox located by role

```ts
const accountNumber = page.getByRole('textbox', { name: 'Account number' });
await accountNumber.fill('1234567890');
await expect(accountNumber).toHaveValue('1234567890');
```

The accessible name must actually be available to Playwright. If the input has no accessible name, fix the application's label/accessibility markup where possible, or use another reliable locator.

### D. Check and uncheck a checkbox

```ts
const termsCheckbox = page.getByRole('checkbox', { name: 'I agree to the terms' });

await termsCheckbox.check();
await expect(termsCheckbox).toBeChecked();

await termsCheckbox.uncheck();
await expect(termsCheckbox).not.toBeChecked();
```

`check()` and `uncheck()` are state-oriented: they ensure the requested state rather than blindly toggling it. This is generally safer than clicking a checkbox when the test needs a known state.

### E. Select a radio option

```ts
const savingsRadio = page.getByRole('radio', { name: 'Savings account' });
await savingsRadio.check();
await expect(savingsRadio).toBeChecked();
```

Radio buttons in the same group are mutually exclusive. Checking one should select it and deselect the previously selected option.

### F. Verify enabled and disabled states

```ts
const submit = page.getByRole('button', { name: 'Submit transfer' });
await expect(submit).toBeDisabled();

// Complete the required fields here.
await expect(submit).toBeEnabled();
await submit.click();
```

Do not assume a button is disabled just because it looks grey. Assert the actual enabled/disabled state exposed by the control.

### G. Locate a heading by its level

```ts
await expect(
  page.getByRole('heading', { name: 'Account overview', level: 1 })
).toBeVisible();
```

`level` is useful when the page contains repeated or similarly named headings at different hierarchy levels.

### H. Use role options for state and exactness

```ts
// Accessible name matching can be case-insensitive with a regular expression.
const continueButton = page.getByRole('button', { name: /continue/i });
await expect(continueButton).toBeVisible();

// Exact accessible-name matching can be requested when needed.
const exactButton = page.getByRole('button', {
  name: 'Continue',
  exact: true,
});
await expect(exactButton).toBeEnabled();
```

Avoid broad regular expressions if several controls could match. A precise accessible name makes a test easier to understand and maintain.

## 18.3 `getByText()` – text assertions and text-driven interaction

Use `getByText()` primarily for content and messages. It can also be used to click text when that text is genuinely the user's way of identifying an interactive item, but a role locator is usually clearer for buttons and links.

### A. Verify a welcome message

```ts
await expect(page.getByText('Welcome back, customer')).toBeVisible();
```

### B. Verify a partial message

```ts
await expect(page.getByText('Transfer submitted')).toContainText('submitted');
```

The locator itself may already be matching text. `toContainText()` is particularly useful when asserting a larger container that includes additional text.

### C. Match text with a regular expression

```ts
await expect(page.getByText(/available balance\s*:?\s*₹?25,000/i)).toBeVisible();
```

This is an illustrative pattern. Currency formatting and number formatting should be adapted to the application's actual output. Avoid relying on a hard-coded balance in a real account; use controlled test data.

### D. Assert exact text

```ts
await expect(
  page.getByText('Beneficiary added successfully', { exact: true })
).toBeVisible();
```

Exact matching is helpful when similar messages exist, but it can be more sensitive to copy changes. Use the level of strictness appropriate to the requirement.

### E. Click visible text only when appropriate

```ts
await page.getByText('View details', { exact: true }).click();
await expect(page.getByRole('heading', { name: 'Transaction details' })).toBeVisible();
```

If “View details” is implemented as a link or button, prefer:

```ts
await page.getByRole('link', { name: 'View details' }).click();
// or
await page.getByRole('button', { name: 'View details' }).click();
```

### F. Verify a transaction row's content

```ts
const transactionRow = page.getByRole('row').filter({
  hasText: 'Electricity bill',
});

await expect(transactionRow).toContainText('Electricity bill');
await expect(transactionRow).toContainText('Completed');
```

This example combines text matching with a scoped locator. The table must expose semantic rows for `getByRole('row')` to work as expected.

## 18.4 `getByLabel()` – form entry and validation

Use labels for fields whenever the application provides properly associated labels. Labels are often the most maintainable way to identify form controls.

### A. Fill a login form

```ts
await page.getByLabel('Customer ID').fill('CUST10025');
await page.getByLabel('Password').fill('TestPassword123!');
await page.getByRole('button', { name: 'Sign in' }).click();

await expect(page.getByRole('heading', { name: 'Account overview' })).toBeVisible();
```

Use synthetic test credentials only. Never place a real password or production banking credential in source code or a repository.

### B. Fill and verify multiple fields

```ts
const beneficiaryName = page.getByLabel('Beneficiary name');
const beneficiaryAccount = page.getByLabel('Account number');
const confirmAccount = page.getByLabel('Confirm account number');

await beneficiaryName.fill('Test Beneficiary');
await beneficiaryAccount.fill('9876543210');
await confirmAccount.fill('9876543210');

await expect(beneficiaryName).toHaveValue('Test Beneficiary');
await expect(beneficiaryAccount).toHaveValue('9876543210');
await expect(confirmAccount).toHaveValue('9876543210');
```

### C. Clear a field and verify it is empty

```ts
const remarks = page.getByLabel('Remarks');
await remarks.fill('Monthly payment');
await remarks.clear();
await expect(remarks).toHaveValue('');
```

### D. Validate required-field feedback

```ts
await page.getByLabel('Beneficiary name').fill('');
await page.getByRole('button', { name: 'Save beneficiary' }).click();

await expect(page.getByText('Beneficiary name is required')).toBeVisible();
```

The exact error text depends on the application. If the validation message is associated with the field through `aria-describedby`, consider also checking the field's accessible description or the relevant error container.

### E. Keyboard interaction in a field

```ts
const search = page.getByLabel('Search transactions');
await search.fill('rent');
await search.press('Enter');

await expect(page.getByText('Search results')).toBeVisible();
```

Use `press()` for keys such as `Enter`, `Tab`, `Escape`, or combinations such as `Control+A` (key names and platform behavior should be considered). For normal replacement of a field's content, `fill()` is simpler and more reliable than simulating individual keystrokes.

## 18.5 `getByPlaceholder()` – search and input examples

A placeholder is a hint inside a field, not a substitute for a proper label. It is useful when it is the stable identifier exposed by the application.

### A. Search for a beneficiary

```ts
const beneficiarySearch = page.getByPlaceholder('Search beneficiaries');
await beneficiarySearch.fill('Ananya');
await expect(beneficiarySearch).toHaveValue('Ananya');

await expect(page.getByText('Ananya Sharma')).toBeVisible();
```

### B. Replace a previous search value

```ts
await beneficiarySearch.fill('Ananya');
await beneficiarySearch.fill('Rahul');
await expect(beneficiarySearch).toHaveValue('Rahul');
```

`fill()` replaces the complete value; it does not append to the previous text.

### C. Clear a search field

```ts
await beneficiarySearch.clear();
await expect(beneficiarySearch).toHaveValue('');
```

### D. Type sequentially when keystrokes matter

```ts
const otpField = page.getByPlaceholder('Enter OTP');
await otpField.pressSequentially('123456', { delay: 100 });
await expect(otpField).toHaveValue('123456');
```

This is an example for a controlled test environment with a test OTP. `pressSequentially()` is useful when the application responds to individual key events. Do not use real customer OTPs in automated tests.

## 18.6 `getByAltText()` – verify images and image controls

`getByAltText()` is mainly useful for locating images by their alternative text. Assertions are more common than actions for ordinary images.

### A. Verify the bank logo is visible

```ts
const bankLogo = page.getByAltText('Example Bank logo');
await expect(bankLogo).toBeVisible();
```

### B. Verify the image source attribute

```ts
await expect(bankLogo).toHaveAttribute('src', /logo/);
```

An assertion against `src` verifies the attribute value pattern, not necessarily that the remote image file loaded successfully. Visibility and successful image loading are separate concerns.

### C. Verify an image has the expected alternative text

```ts
await expect(bankLogo).toHaveAttribute('alt', 'Example Bank logo');
```

### D. Click only if the image is part of a real interactive control

A logo may be inside a link. In that case, locate the link by its role and accessible name where possible:

```ts
await page.getByRole('link', { name: 'Example Bank home' }).click();
await expect(page).toHaveURL(/.*home/);
```

Do not assume every image should be clicked. An image that is purely decorative or informational should normally be asserted, not interacted with.

## 18.7 `getByTitle()` – title attribute and hover

`getByTitle()` finds an element through its HTML `title` attribute. The attribute may provide a tooltip, but not every browser or application presents it in exactly the same way.

### A. Verify the title attribute element exists and is visible

```ts
const helpIcon = page.getByTitle('Help about transfer limits');
await expect(helpIcon).toBeVisible();
await expect(helpIcon).toHaveAttribute('title', 'Help about transfer limits');
```

### B. Hover over the titled element

```ts
await helpIcon.hover();
```

If the application implements its own tooltip, assert the tooltip that appears:

```ts
await expect(page.getByRole('tooltip')).toBeVisible();
```

A native browser tooltip generated from the `title` attribute is not always exposed as a normal DOM element. Do not expect `getByRole('tooltip')` to find a native browser tooltip unless the application actually renders one in the DOM/accessibility tree.

### C. Click an element only if it is interactive

```ts
const helpButton = page.getByRole('button', { name: 'Help' });
await helpButton.click();
await expect(page.getByRole('dialog', { name: 'Transfer help' })).toBeVisible();
```

This is generally preferable to clicking a generic element merely because it has a `title` attribute.

## 18.8 `getByTestId()` – stable automation hooks

Use test IDs when the application team has added dedicated attributes for automation, especially for complex controls or repeated components that lack useful accessible names.

### A. Verify an account balance panel

```ts
const balancePanel = page.getByTestId('account-balance-panel');
await expect(balancePanel).toBeVisible();
await expect(balancePanel).toContainText('Available balance');
```

### B. Read a test ID field's value through an assertion

```ts
const amountInput = page.getByTestId('transfer-amount');
await amountInput.fill('2500');
await expect(amountInput).toHaveValue('2500');
```

### C. Click a test-ID control and assert the result

```ts
await page.getByTestId('show-account-number').click();
await expect(page.getByTestId('account-number')).toBeVisible();
```

A user-facing role locator may be preferable if the control has a good accessible name. Test IDs are not automatically better than accessible locators; they are a stable alternative when needed.

### D. Verify the number of repeated items

```ts
const transactionItems = page.getByTestId('transaction-item');
await expect(transactionItems).toHaveCount(5);
```

This checks that exactly five matching elements exist. If the count changes dynamically, assert the requirement that matters rather than hard-coding a count that is not part of the test case.

## 18.9 Combining locators: scope to a card, row, or section

A common challenge is that the same button name appears several times. For example, every transaction row might contain a “View details” button. A broad locator could match multiple elements. Scope the locator to the correct row or container.

### A. Use `filter({ hasText })` to identify a row

```ts
const electricityRow = page.getByRole('row').filter({
  hasText: 'Electricity bill',
});

await expect(electricityRow).toBeVisible();
await electricityRow.getByRole('button', { name: 'View details' }).click();
await expect(page.getByRole('heading', { name: 'Transaction details' })).toBeVisible();
```

### B. Scope by a child locator with `has`

```ts
const savingsCard = page.getByTestId('account-card').filter({
  has: page.getByText('Savings account', { exact: true }),
});

await expect(savingsCard).toBeVisible();
await savingsCard.getByRole('button', { name: 'View account' }).click();
```

The `has` locator must be constructed in a way that is valid relative to the container being filtered. Keep the inner locator scoped to the same page/frame context.

### C. Use `locator()` for a CSS relationship when necessary

```ts
const form = page.getByTestId('beneficiary-form');
const accountInput = form.locator('input[name="accountNumber"]');

await accountInput.fill('9876543210');
await expect(accountInput).toHaveValue('9876543210');
```

This combines a stable outer test ID with a CSS selector inside the form. Use CSS when it makes the relationship clearer or when user-facing semantics are unavailable; avoid long brittle selectors tied to layout.

### D. Check uniqueness when debugging

```ts
const saveButton = page.getByRole('button', { name: 'Save' });
await expect(saveButton).toHaveCount(1);
await expect(saveButton).toBeVisible();
```

A locator can represent multiple elements. Actions that require a single target generally fail when the locator matches more than one element. `toHaveCount(1)` is useful when uniqueness is part of the expectation.

Avoid immediately adding `.first()` or `.nth(0)` just to silence a strict-mode error. First inspect why multiple elements match and make the locator specific. Use positional selection only when the position is meaningful and stable.

## 18.10 A complete example combining several locator strategies

The following is a single illustrative test for a fictional beneficiary form. It demonstrates role, label, placeholder, text, and test-ID locators together.

```ts
import { test, expect } from '@playwright/test';

test('add a beneficiary using the beneficiary form', async ({ page }) => {
  await page.goto('https://example.test/beneficiaries/new');

  await expect(
    page.getByRole('heading', { name: 'Add beneficiary' })
  ).toBeVisible();

  await page.getByLabel('Beneficiary name').fill('Ananya Sharma');
  await page.getByLabel('Account number').fill('9876543210');
  await page.getByLabel('Confirm account number').fill('9876543210');
  await page.getByPlaceholder('Enter IFSC code').fill('EXAM0001234');

  const terms = page.getByRole('checkbox', { name: 'I confirm the details are correct' });
  await terms.check();
  await expect(terms).toBeChecked();

  const saveButton = page.getByRole('button', { name: 'Save beneficiary' });
  await expect(saveButton).toBeEnabled();
  await saveButton.click();

  await expect(page.getByText('Beneficiary added successfully')).toBeVisible();
  await expect(page.getByTestId('beneficiary-name')).toHaveText('Ananya Sharma');
});
```

This example assumes the application exposes the specified labels, placeholder, accessible names, success message, and test ID. A test should reflect the real application markup and expected business behavior; do not copy example strings blindly if the UI uses different wording.

## 18.11 Assertions: important distinctions and practical patterns

### `toHaveText()` versus `toContainText()`

```ts
await expect(page.getByTestId('status')).toHaveText('Completed');
await expect(page.getByTestId('status-message')).toContainText('successfully');
```

- `toHaveText()` is appropriate when the expected text should match the element's text content.
- `toContainText()` is useful when the element may contain additional text around the expected phrase.
- Both are web-first assertions and retry until they pass or time out.

### `toHaveValue()` versus `toHaveText()`

```ts
await expect(page.getByLabel('Account number')).toHaveValue('9876543210');
await expect(page.getByTestId('masked-account-number')).toHaveText('******3210');
```

Use `toHaveValue()` for form controls' current values. Use text assertions for text rendered as page content. An input's value is not normally its inner text.

### `toBeVisible()` versus `toBeAttached()`

```ts
await expect(page.getByTestId('transfer-confirmation')).toBeAttached();
await expect(page.getByTestId('transfer-confirmation')).toBeVisible();
```

An element can be attached to the DOM but hidden. If the user must see the confirmation, assert visibility rather than attachment alone.

### Negative assertions

```ts
await expect(page.getByRole('dialog', { name: 'Confirm transfer' })).not.toBeVisible();
await expect(page.getByText('Invalid account number')).toBeHidden();
```

Use a negative assertion to verify that something is not visible or not in the expected state. Ensure the assertion reflects the intended requirement; a hidden element may still remain attached to the DOM.

### Page-level URL and title assertions

```ts
await expect(page).toHaveURL(/.*account-overview/);
await expect(page).toHaveTitle(/Example Bank/);
```

`toHaveTitle()` checks the browser document title. It is different from `getByTitle()`, which locates an element using its HTML `title` attribute.

### Attribute assertions

```ts
await expect(page.getByTestId('account-number')).toHaveAttribute('type', 'text');
await expect(page.getByTestId('secure-session')).toHaveAttribute('aria-live', 'polite');
```

Use attribute assertions when the attribute itself is part of the requirement. Do not assert incidental styling classes unless the class is genuinely part of the behavior under test.

## 18.12 Debugging locator failures

When a locator fails, do not immediately change it to a broad CSS selector or add a fixed wait. Diagnose the cause.

1. **No element found:** confirm navigation completed, inspect the live DOM, and verify the text/label/attribute is correct.
2. **Multiple elements found:** use a more specific accessible name or scope to a row, card, or form.
3. **Element not visible:** check whether it is hidden, behind a modal, in a collapsed section, or rendered only after an interaction.
4. **Element disabled:** verify prerequisite fields and application rules before attempting the action.
5. **Wrong text/value:** inspect whether the UI is still updating and assert the actual expected result.
6. **Wrong frame:** if the element is inside an iframe, locate it through the appropriate `frameLocator()` before applying the locator strategy.
7. **Wrong page or tab:** check whether the action opened a new page and whether the test is asserting against the intended page.

Useful debugging commands:

```ts
const locator = page.getByRole('button', { name: 'Continue' });
console.log('Matches:', await locator.count());
console.log('Visible:', await locator.isVisible());
```

`count()` and `isVisible()` return immediate values at the time they are called; unlike web-first assertions, they do not retry until a condition becomes true. Use them for diagnostics, not as a substitute for retrying assertions in normal test expectations.

You can also pause a test during local debugging:

```ts
await page.pause();
```

Run the test in headed mode and use the Playwright Inspector to inspect locators and actions. Remove debugging pauses before committing the test.

## 18.13 Additional practice tasks

- [ ] Use `getByRole()` to click a button, then assert the next heading is visible.
- [ ] Use `getByRole()` to check a checkbox and verify it is checked.
- [ ] Use `getByRole()` to select a radio button and verify its state.
- [ ] Use `getByRole()` to verify a submit button is disabled before required fields are filled and enabled afterward.
- [ ] Use `getByText()` with exact text, partial text, and a regular expression.
- [ ] Use `getByText()` to verify a success message after an action.
- [ ] Use `getByLabel()` to fill three fields, clear one, and verify each field's value.
- [ ] Use `getByPlaceholder()` to search, replace the search text, and clear the field.
- [ ] Use `getByAltText()` to verify a logo and its `alt` attribute.
- [ ] Use `getByTitle()` to locate and hover over a help control; verify an application-rendered tooltip if one exists.
- [ ] Use `getByTestId()` to verify a panel, fill a test field, and assert a repeated element count.
- [ ] Create two “View details” buttons in separate transaction rows and scope to the correct row.
- [ ] Add a uniqueness assertion with `toHaveCount(1)` before interacting with a critical button.
- [ ] Demonstrate the difference between `toHaveText()`, `toContainText()`, and `toHaveValue()`.
- [ ] Demonstrate the difference between `toBeAttached()` and `toBeVisible()`.

## 18.14 Quick locator-to-action guide

| What you need to do | Locator to consider | Action / assertion |
|---|---|---|
| Click Sign in | `getByRole('button', { name: 'Sign in' })` | `click()`; assert next heading or URL |
| Open transaction history | `getByRole('link', { name: 'Transaction history' })` | `click()`; `toHaveURL()` |
| Fill customer ID | `getByLabel('Customer ID')` | `fill()`; `toHaveValue()` |
| Search beneficiary | `getByPlaceholder('Search beneficiaries')` | `fill()`; assert result text |
| Verify logo | `getByAltText('Example Bank logo')` | `toBeVisible()`; `toHaveAttribute()` |
| Verify success message | `getByText('Transfer submitted')` | `toBeVisible()` or `toContainText()` |
| Verify help control | `getByTitle('Help about transfer limits')` | `toBeVisible()`; `hover()` if appropriate |
| Verify balance panel | `getByTestId('account-balance-panel')` | `toBeVisible()`; `toContainText()` |
| Check consent | `getByRole('checkbox', { name: 'I agree' })` | `check()`; `toBeChecked()` |
| Select account type | `getByRole('radio', { name: 'Savings' })` | `check()`; `toBeChecked()` |
| Verify repeated rows | `getByRole('row')` or a test ID | `toHaveCount()` |

**Core habit:** identify the element with the clearest stable locator, perform the action that matches the control, and assert the user-visible result. Do not stop at “the click worked”; verify that the application reached the expected state.

---

# 20. Practical locator actions and assertions – expanded examples

This section extends the locator concepts with practical interactions and checks. The examples use illustrative banking screens. Replace the example URL, labels, text, and test IDs with the actual values in your application's UI.

## 20.1 A reusable example test structure

```ts
import { test, expect } from '@playwright/test';

test('example banking UI test', async ({ page }) => {
  await page.goto('https://example.com/banking');

  // 1. Locate an element. Locator creation is synchronous.
  const heading = page.getByRole('heading', { name: 'Account Overview' });

  // 2. Assert the expected state. Web-first assertions are asynchronous.
  await expect(heading).toBeVisible();
});
```

Keep the three operations conceptually separate:

- **Locate:** `const button = page.getByRole('button', { name: 'Continue' });`
- **Act:** `await button.click();`
- **Verify:** `await expect(page.getByText('Welcome back')).toBeVisible();`

Do not add `await` to locator creation. Do use `await` for asynchronous actions and Playwright assertions.

## 20.2 Common actions you can perform with locators

The action must match the kind of element and the behavior of the application.

| Action | Purpose | Typical element |
|---|---|---|
| `click()` | Click an element | Button, link, checkbox, menu item |
| `dblclick()` | Double-click | An interface that genuinely requires a double-click |
| `fill('value')` | Replace an input's current value | Text input, email input, textarea |
| `clear()` | Clear an input | Text input, textarea |
| `press('Enter')` | Send a keyboard key | Search field, form field |
| `pressSequentially('abc')` | Enter text as a sequence of keystrokes | Inputs that respond to each key event |
| `check()` / `uncheck()` | Set checkbox or radio state | Checkbox, radio button |
| `selectOption('value')` | Select an option in a native select | HTML `select` |
| `hover()` | Move the pointer over an element | Menu, tooltip trigger |
| `focus()` | Focus an element | Input or keyboard-accessible control |
| `blur()` | Remove focus | Input or control |
| `scrollIntoViewIfNeeded()` | Scroll an element into view when needed | Off-screen element |

Example:

```ts
const search = page.getByPlaceholder('Search transactions');
await search.fill('Electricity');
await search.press('Enter');

const result = page.getByText('Electricity Bill', { exact: true });
await expect(result).toBeVisible();
```

`fill()` is generally the best choice when the goal is to set the complete value of an input. Use `pressSequentially()` when the application specifically depends on individual key events, such as a keyboard-driven autocomplete. Do not use fixed sleeps as a substitute for waiting for the expected UI state.

## 20.3 Common assertions

| Assertion | What it verifies |
|---|---|
| `toBeVisible()` | Element is visible |
| `toBeHidden()` | Element is hidden or absent |
| `toBeAttached()` | Element is attached to the DOM |
| `toBeEnabled()` | Form control is enabled |
| `toBeDisabled()` | Form control is disabled |
| `toBeEditable()` | Element can be edited |
| `toBeChecked()` | Checkbox/radio is checked |
| `toHaveText()` | Text content matches the expected value |
| `toContainText()` | Text content contains the expected text |
| `toHaveValue()` | Input value matches the expected value |
| `toHaveAttribute()` | Attribute has the expected value |
| `toHaveClass()` | Element has the expected class |
| `toHaveCount()` | Number of matching elements is as expected |
| `toHaveCSS()` | CSS property has the expected value |
| `toHaveURL()` | Page URL matches the expected URL |
| `toHaveTitle()` | Page title matches the expected title |

Assertions are retrying (web-first) when used with a locator or page in the documented Playwright form. They repeatedly check until the condition passes or the assertion timeout expires. This is usually more reliable than reading a value once and making a manual comparison.

---

# 21. `getByRole()` – detailed actions and assertions

`getByRole()` locates elements using their accessibility role and, optionally, their accessible name. It is useful for buttons, links, headings, checkboxes, radio buttons, textboxes, menus, tabs, and many other semantic elements.

## 21.1 Locate a button, verify it, and click it

```ts
const loginButton = page.getByRole('button', { name: 'Login' });

await expect(loginButton).toBeVisible();
await expect(loginButton).toBeEnabled();
await loginButton.click();

await expect(
  page.getByRole('heading', { name: 'Account Overview' })
).toBeVisible();
```

The `name` option is the **accessible name**. It is not necessarily the HTML `name` attribute. For example, a button's accessible name may come from its visible text or an accessibility label.

## 21.2 Locate links and verify navigation

```ts
const historyLink = page.getByRole('link', { name: 'Transaction History' });

await expect(historyLink).toBeVisible();
await historyLink.click();

await expect(page).toHaveURL(/.*transactions/);
await expect(
  page.getByRole('heading', { name: 'Transaction History' })
).toBeVisible();
```

Use a URL pattern when query parameters or other dynamic URL parts may vary. If the URL is stable and exact, an exact string assertion may be appropriate.

## 21.3 Locate a heading

```ts
const pageHeading = page.getByRole('heading', {
  name: 'Beneficiary Management',
  level: 1,
});

await expect(pageHeading).toBeVisible();
await expect(pageHeading).toHaveText('Beneficiary Management');
```

`level` can distinguish heading levels when the page contains multiple headings with similar names.

## 21.4 Check and uncheck a checkbox

```ts
const rememberDevice = page.getByRole('checkbox', {
  name: 'Remember this device',
});

await rememberDevice.check();
await expect(rememberDevice).toBeChecked();

await rememberDevice.uncheck();
await expect(rememberDevice).not.toBeChecked();
```

`check()` and `uncheck()` express the desired state. They are often safer than `click()` because clicking toggles the current state and may leave the checkbox in the wrong state if the test's starting assumption is incorrect.

## 21.5 Select a radio option

```ts
const savingsOption = page.getByRole('radio', { name: 'Savings Account' });

await savingsOption.check();
await expect(savingsOption).toBeChecked();
```

Use the role and accessible name that the application exposes. If the radio group is custom-built rather than a native radio control, its interaction may need to use the actual accessible UI semantics.

## 21.6 Verify a disabled button

```ts
const submitButton = page.getByRole('button', { name: 'Submit Transfer' });

await expect(submitButton).toBeVisible();
await expect(submitButton).toBeDisabled();
```

A second test can verify that the button becomes enabled after required fields are completed:

```ts
await page.getByLabel('Beneficiary').fill('Alex');
await page.getByLabel('Amount').fill('2500');

await expect(submitButton).toBeEnabled();
```

Only expect this behavior if it is actually how the application is designed.

## 21.7 Locate a tab

```ts
const statementsTab = page.getByRole('tab', { name: 'Statements' });

await expect(statementsTab).toBeVisible();
await statementsTab.click();
await expect(statementsTab).toHaveAttribute('aria-selected', 'true');
```

For a tab interface, also assert the associated panel when appropriate:

```ts
await expect(page.getByRole('tabpanel')).toContainText('Monthly statements');
```

The exact panel locator depends on the application's accessible structure.

---

# 22. `getByText()` – detailed text matching and assertions

Use `getByText()` when the target is identified by visible text rather than by a control's role or form label. It is commonly useful for status messages, descriptions, transaction names, headings, and notification text.

## 22.1 Exact text

```ts
const successMessage = page.getByText('Transfer successful', { exact: true });
await expect(successMessage).toBeVisible();
await expect(successMessage).toHaveText('Transfer successful');
```

Exact matching is useful when several elements contain similar text. It can be too strict if the UI adds punctuation or dynamic text.

## 22.2 Partial text

```ts
const message = page.getByText('Transfer successful');
await expect(message).toBeVisible();
await expect(message).toContainText('successful');
```

By default, text matching is flexible: it can match a substring and normalizes whitespace. Use `{ exact: true }` when you need exact text matching.

## 22.3 Regular expression matching

```ts
const referenceMessage = page.getByText(/Reference ID:\s*TXN\d+/i);
await expect(referenceMessage).toBeVisible();
```

The `i` flag makes the regular expression case-insensitive. Regular expressions are helpful when part of the text is dynamic, but keep the pattern specific enough to avoid matching unrelated elements.

## 22.4 Verify a dynamic transaction status

```ts
const status = page.getByText('Pending', { exact: true });
await expect(status).toBeVisible();

// If the application later updates the status:
await expect(page.getByText('Completed', { exact: true })).toBeVisible();
```

Do not assume that a status will change automatically. The test must first perform the action or wait for the real event that causes the update.

## 22.5 Scope text matching to a transaction row

If the same text appears in multiple places, narrow the search to the correct container:

```ts
const salaryRow = page
  .locator('.transaction-row')
  .filter({ hasText: 'Salary Credit' });

await expect(salaryRow).toBeVisible();
await expect(salaryRow).toContainText('Salary Credit');
await expect(salaryRow).toContainText('Completed');
```

`.filter({ hasText: ... })` narrows the set of matching containers. The CSS class above is illustrative; prefer a semantic row locator or stable test ID if the application provides one.

---

# 23. `getByLabel()` – detailed form interactions

`getByLabel()` locates the form control associated with a label. The label can be associated through a matching `for`/`id`, by wrapping the control, or through supported accessible naming relationships. It returns the control, not merely the label element.

## 23.1 Fill a labelled text field

```ts
const accountNumber = page.getByLabel('Account Number');

await expect(accountNumber).toBeVisible();
await expect(accountNumber).toBeEditable();
await accountNumber.fill('1234567890');
await expect(accountNumber).toHaveValue('1234567890');
```

## 23.2 Fill multiple fields and verify values

```ts
await page.getByLabel('First Name').fill('Arun');
await page.getByLabel('Last Name').fill('Kumar');
await page.getByLabel('Email Address').fill('arun@example.com');

await expect(page.getByLabel('First Name')).toHaveValue('Arun');
await expect(page.getByLabel('Last Name')).toHaveValue('Kumar');
await expect(page.getByLabel('Email Address')).toHaveValue('arun@example.com');
```

## 23.3 Clear a field

```ts
const remarks = page.getByLabel('Remarks');
await remarks.fill('Please process this request');
await expect(remarks).toHaveValue('Please process this request');

await remarks.clear();
await expect(remarks).toHaveValue('');
```

## 23.4 Interact with a labelled checkbox

```ts
const terms = page.getByLabel('I agree to the terms and conditions');
await terms.check();
await expect(terms).toBeChecked();
```

## 23.5 Label association matters

Example HTML:

```html
<label for="email">Email Address</label>
<input id="email" type="email">
```

Playwright can locate the input using:

```ts
page.getByLabel('Email Address');
```

If the visible text is not properly associated with the control, `getByLabel()` may not find it. That can indicate an accessibility issue in the application as well as a locator problem.

---

# 24. `getByPlaceholder()` – search and input examples

Use this locator when an input or textarea has a meaningful placeholder. A placeholder is hint text inside a control; it is not a substitute for a proper accessible label.

## 24.1 Search and press Enter

```ts
const searchBox = page.getByPlaceholder('Search transactions');

await expect(searchBox).toBeVisible();
await expect(searchBox).toBeEditable();
await searchBox.fill('Electricity Bill');
await expect(searchBox).toHaveValue('Electricity Bill');
await searchBox.press('Enter');

await expect(page.getByText('Electricity Bill')).toBeVisible();
```

## 24.2 Clear a search field

```ts
const search = page.getByPlaceholder('Search beneficiary');
await search.fill('Alex');
await expect(search).toHaveValue('Alex');

await search.clear();
await expect(search).toHaveValue('');
```

## 24.3 Use a regular expression for a changing placeholder

```ts
const search = page.getByPlaceholder(/search/i);
await expect(search).toBeVisible();
```

Use a regular expression only when the placeholder genuinely varies. If the application has multiple search fields, make the pattern more specific or scope it to the relevant section.

---

# 25. `getByAltText()` – image and alternative text examples

`getByAltText()` locates elements using their alternative text, commonly the `alt` attribute on images. Good alternative text describes the image's purpose. Decorative images may intentionally have empty alternative text and should not be treated as meaningful controls.

## 25.1 Verify a bank logo

```ts
const logo = page.getByAltText('Example Bank Logo');

await expect(logo).toBeVisible();
await expect(logo).toHaveAttribute('alt', 'Example Bank Logo');
```

## 25.2 Verify an image source exists

```ts
const logo = page.getByAltText('Example Bank Logo');
await expect(logo).toBeVisible();
await expect(logo).toHaveAttribute('src', /logo/);
```

This checks the `src` attribute text, not whether the remote image has successfully loaded. If image loading itself matters, use an appropriate browser-side check or an application-specific signal.

## 25.3 Click only when the image is part of an interactive control

A logo is sometimes inside a home link. In that case, it is usually clearer to locate the link by role:

```ts
const homeLink = page.getByRole('link', { name: 'Example Bank Home' });
await expect(homeLink).toBeVisible();
await homeLink.click();
await expect(page).toHaveURL(/.*home/);
```

Do not assume every image is clickable. Use `getByAltText()` mainly to identify and verify the image itself.

---

# 26. `getByTitle()` – title attribute examples

`getByTitle()` locates an element using its `title` attribute. A title may provide supplemental information, often displayed as a tooltip by the browser. It is different from the page's document title, which is verified with `toHaveTitle()`.

## 26.1 Verify a help icon

```ts
const helpIcon = page.getByTitle('Help');
await expect(helpIcon).toBeVisible();
await expect(helpIcon).toHaveAttribute('title', 'Help');
```

## 26.2 Hover over a help control

```ts
await helpIcon.hover();

// Assert a tooltip only if the application actually renders one.
await expect(page.getByText('Contact customer support')).toBeVisible();
```

Some browsers show a native tooltip that is not represented as a normal DOM element. In that case, do not expect to locate it with `getByText()`; verify the `title` attribute instead.

## 26.3 Difference between element title and page title

```ts
// Element title attribute
await expect(page.getByTitle('Help')).toHaveAttribute('title', 'Help');

// Browser document title
await expect(page).toHaveTitle('Example Bank | Account Overview');
```

These assertions verify two different things.

---

# 27. `getByTestId()` – stable test hooks

A test ID is an attribute deliberately added to an element to make it easy to identify in automation. By default, Playwright's `getByTestId()` looks for `data-testid`.

## 27.1 Locate, verify, and click a transfer button

```ts
const transferButton = page.getByTestId('transfer-submit');

await expect(transferButton).toBeVisible();
await expect(transferButton).toBeEnabled();
await transferButton.click();

await expect(page.getByTestId('transfer-result')).toContainText('Transfer submitted');
```

## 27.2 Verify a result message

```ts
const result = page.getByTestId('transfer-success-message');
await expect(result).toBeVisible();
await expect(result).toContainText('Transfer successful');
```

## 27.3 Configure a custom test ID attribute

If the application uses a different attribute, configure it in `playwright.config.ts`:

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    testIdAttribute: 'data-qa',
  },
});
```

Then this:

```ts
page.getByTestId('transfer-submit');
```

matches an element such as:

```html
<button data-qa="transfer-submit">Submit Transfer</button>
```

The test ID string remains `transfer-submit`; Playwright reads it from the configured `data-qa` attribute.

---

# 28. Scoping locators and handling duplicate matches

A locator may match more than one element. Actions such as `click()` generally require the locator to resolve to one actionable element. If multiple elements match, Playwright reports a strictness violation rather than silently choosing one.

## 28.1 Scope a button to a card

```ts
const beneficiaryCard = page
  .getByTestId('beneficiary-card')
  .filter({ hasText: 'Alex Kumar' });

const editButton = beneficiaryCard.getByRole('button', { name: 'Edit' });
await expect(editButton).toBeVisible();
await editButton.click();
```

This is safer than selecting the first `Edit` button on the entire page when multiple beneficiary cards exist.

## 28.2 Use `filter({ has: ... })`

```ts
const completedRow = page
  .getByRole('row')
  .filter({ has: page.getByText('Completed', { exact: true }) });

await expect(completedRow).toBeVisible();
```

The nested locator passed to `has` is evaluated within the candidate row. Make sure the nested locator describes an element inside that row.

## 28.3 Use `first()`, `last()`, and `nth()` carefully

```ts
const rows = page.getByRole('row');

await expect(rows).toHaveCount(4);
await expect(rows.nth(1)).toContainText('Salary Credit');
```

Remember that `nth()` uses a zero-based index: `nth(0)` is the first match and `nth(1)` is the second. In tables, the first row may be a header row, so verify the count and structure before relying on an index.

Prefer a locator based on unique content or a stable container over `first()` or `nth()` when possible. Positional locators can become fragile when the UI order changes.

## 28.4 Count matching elements

```ts
const transactionRows = page.getByRole('row');
await expect(transactionRows).toHaveCount(6);
```

The expected count should reflect the actual page structure, including whether the header row is included. If the number of transactions is dynamic, assert a meaningful minimum or verify a specific row instead of hard-coding an unstable count.

---

# 29. Dropdowns, keyboard actions, and other useful interactions

## 29.1 Native HTML select dropdown

For a native `<select>` element:

```ts
const accountType = page.getByLabel('Account Type');

await accountType.selectOption({ label: 'Savings' });
await expect(accountType).toHaveValue('SAVINGS');
```

The selected option's `value` may differ from its visible label. You can select by value:

```ts
await accountType.selectOption('SAVINGS');
```

`selectOption()` is for native select controls. A custom dropdown built from `div`, `button`, and list elements usually needs normal UI interactions, such as clicking the dropdown and choosing an option by role.

## 29.2 Custom dropdown example

```ts
await page.getByRole('button', { name: 'Select account' }).click();
await page.getByRole('option', { name: 'Savings Account' }).click();

await expect(
  page.getByRole('button', { name: 'Savings Account' })
).toBeVisible();
```

Use the roles actually exposed by the application. Some custom controls may use menu items or list items rather than `option`.

## 29.3 Keyboard interaction

```ts
const search = page.getByRole('textbox', { name: 'Search transactions' });
await search.fill('Rent');
await search.press('Enter');

await expect(page.getByText('Rent Payment')).toBeVisible();
```

Other key examples:

```ts
await search.press('Control+A'); // Select all on many platforms
await search.press('Backspace');
await search.press('Escape');
```

For cross-platform tests, consider whether the intended shortcut should use `Control` or `Meta` on macOS. Prefer a platform-independent interaction where possible.

## 29.4 Hover and focus

```ts
const profileMenu = page.getByRole('button', { name: 'Profile' });
await profileMenu.hover();

const emailField = page.getByLabel('Email Address');
await emailField.focus();
await expect(emailField).toBeFocused();
```

Use hover only when the UI behavior is actually hover-driven. Important navigation should generally remain keyboard-accessible as well.

---

# 30. Complete example – beneficiary search and transfer form

This example combines several locator strategies and actions. The labels, test IDs, and messages are illustrative; adapt them to the actual banking application's DOM and accessibility tree.

```ts
import { test, expect } from '@playwright/test';

test('search beneficiary and prepare a transfer', async ({ page }) => {
  await page.goto('https://example.com/banking/transfers');

  // Verify the page
  await expect(page).toHaveTitle(/Transfers/);
  await expect(
    page.getByRole('heading', { name: 'Transfer Money' })
  ).toBeVisible();

  // Search for a beneficiary
  const beneficiarySearch = page.getByPlaceholder('Search beneficiary');
  await beneficiarySearch.fill('Alex Kumar');
  await expect(beneficiarySearch).toHaveValue('Alex Kumar');

  // Choose the matching beneficiary
  const beneficiary = page.getByRole('button', { name: 'Alex Kumar' });
  await expect(beneficiary).toBeVisible();
  await beneficiary.click();

  // Enter the transfer amount
  const amount = page.getByLabel('Amount');
  await amount.fill('2500');
  await expect(amount).toHaveValue('2500');

  // Enter a remark
  const remark = page.getByLabel('Remarks');
  await remark.fill('Monthly payment');
  await expect(remark).toHaveValue('Monthly payment');

  // Accept the terms
  const terms = page.getByRole('checkbox', { name: 'I confirm the details' });
  await terms.check();
  await expect(terms).toBeChecked();

  // Verify the review button is enabled
  const reviewButton = page.getByRole('button', { name: 'Review Transfer' });
  await expect(reviewButton).toBeEnabled();
  await reviewButton.click();

  // Verify the review screen
  await expect(
    page.getByRole('heading', { name: 'Review Transfer' })
  ).toBeVisible();
  await expect(page.getByText('Alex Kumar')).toBeVisible();
  await expect(page.getByText('2500', { exact: true })).toBeVisible();
});
```

This test deliberately stops at the review stage. A real money-transfer test should use an authorized test environment and safe test accounts. Never execute real financial transactions as part of an ordinary practice test.

---

# 31. Common locator and assertion mistakes

## Mistake 1: Awaiting locator creation

Incorrect:

```ts
const loginButton = await page.getByRole('button', { name: 'Login' });
```

Correct:

```ts
const loginButton = page.getByRole('button', { name: 'Login' });
await loginButton.click();
```

Creating a locator is synchronous. Clicking is asynchronous.

## Mistake 2: Forgetting `await` on an action

Incorrect:

```ts
loginButton.click();
await expect(page.getByText('Welcome')).toBeVisible();
```

Correct:

```ts
await loginButton.click();
await expect(page.getByText('Welcome')).toBeVisible();
```

Without `await`, the test may continue before the action completes.

## Mistake 3: Using a normal assertion too early

Avoid reading a changing UI value once and immediately comparing it if the page needs time to update. Prefer a web-first assertion:

```ts
await expect(page.getByText('Transfer successful')).toBeVisible();
```

rather than relying on an immediate one-time read.

## Mistake 4: Using `click()` to set checkbox state

A click toggles the current state. Prefer:

```ts
await checkbox.check();
await expect(checkbox).toBeChecked();
```

## Mistake 5: Using `fill()` on a button or non-editable element

`fill()` is for editable controls such as inputs and textareas. Use `click()` for buttons and links.

## Mistake 6: Assuming placeholder text is an accessible label

A placeholder can be used by `getByPlaceholder()`, but a properly labelled form control is generally better for accessibility and automation. Prefer `getByLabel()` when a meaningful label exists.

## Mistake 7: Choosing the first duplicate without understanding the page

Avoid blindly using `.first()` to suppress a strictness error. Investigate why multiple elements match, then scope the locator to the correct card, row, dialog, or section.

## Mistake 8: Using arbitrary timeouts

Avoid:

```ts
await page.waitForTimeout(5000);
```

Prefer waiting for the actual expected state:

```ts
await expect(page.getByText('Results loaded')).toBeVisible();
```

Fixed waits slow tests and can still fail on slower environments.

## Mistake 9: Treating every image as a clickable control

Use `getByAltText()` to identify an image. If it is inside a link, locate and click the link by its role and accessible name.

## Mistake 10: Assuming every dropdown supports `selectOption()`

`selectOption()` works with native HTML `<select>` controls. Custom dropdowns must be operated through their visible UI.

---

# 32. Locator selection decision guide

| What you need to locate | First locator to consider |
|---|---|
| A button labelled Login | `getByRole('button', { name: 'Login' })` |
| A navigation link | `getByRole('link', { name: '...' })` |
| A heading | `getByRole('heading', { name: '...' })` |
| A labelled input | `getByLabel('...')` |
| An input identified by hint text | `getByPlaceholder('...')` |
| A visible message or static text | `getByText('...')` |
| An image with meaningful alternative text | `getByAltText('...')` |
| An element with a title attribute | `getByTitle('...')` |
| An element with a dedicated automation attribute | `getByTestId('...')` |
| A repeated item within a card or row | Locate the container, then scope within it |
| A native HTML select | Locate it, then use `selectOption()` |

The best locator is not simply the shortest selector. It is the one that is understandable, stable, specific, and aligned with the UI's semantics.

---

# 33. Practice exercises

Use a practice application or a local HTML page. Do not use a live banking account or perform real transactions.

1. Locate the page's main heading using `getByRole()` and assert it is visible.
2. Locate a Login button, assert it is enabled, and click it.
3. Locate an email field using `getByLabel()`, fill an email address, and assert its value.
4. Locate a search box using `getByPlaceholder()`, enter a transaction description, press Enter, and verify the result.
5. Locate a success notification using `getByText()` and assert it contains the expected phrase.
6. Locate a checkbox using `getByRole()` or `getByLabel()`, check it, and assert its state.
7. Locate a logo using `getByAltText()` and verify its `alt` attribute.
8. Locate a help icon using `getByTitle()` and verify the `title` attribute.
9. Locate a button using `getByTestId()`, assert it is enabled, and click it.
10. Find a particular transaction row by its text, scope to that row, and verify its status.
11. Count the visible rows in a table and assert the expected count for your test data.
12. Select an option from a native dropdown and verify the selected value.
13. Verify that a button is disabled before required fields are completed and enabled afterward, if that is the expected application behavior.
14. Click a navigation link and verify both the URL and the destination heading.
15. Deliberately create a locator that matches two elements, observe the strictness error, and fix it by scoping the locator.

## Suggested practice test checklist

- [ ] Locator uniquely identifies the intended element.
- [ ] Locator is based on a meaningful role, label, text, placeholder, alt text, title, or test ID where possible.
- [ ] Action matches the element type.
- [ ] Asynchronous actions and assertions are awaited.
- [ ] Assertions verify the user-visible outcome, not merely that a click was attempted.
- [ ] Duplicate matches are handled by making the locator more specific.
- [ ] No unnecessary fixed sleeps are used.
- [ ] Test uses safe, authorized test data and does not trigger real banking activity.

---

# 34. Quick revision: action versus assertion

| Goal | Example |
|---|---|
| Find a button | `const button = page.getByRole('button', { name: 'Login' });` |
| Check visibility | `await expect(button).toBeVisible();` |
| Check enabled state | `await expect(button).toBeEnabled();` |
| Click | `await button.click();` |
| Fill input | `await page.getByLabel('Email').fill('a@example.com');` |
| Verify input value | `await expect(page.getByLabel('Email')).toHaveValue('a@example.com');` |
| Check checkbox | `await checkbox.check();` |
| Verify checkbox | `await expect(checkbox).toBeChecked();` |
| Verify text | `await expect(message).toHaveText('Saved');` |
| Verify partial text | `await expect(message).toContainText('Saved');` |
| Verify count | `await expect(rows).toHaveCount(5);` |
| Verify URL | `await expect(page).toHaveURL(/.*dashboard/);` |
| Verify document title | `await expect(page).toHaveTitle(/Dashboard/);` |
| Select native option | `await select.selectOption('SAVINGS');` |
| Hover | `await menu.hover();` |
| Press a key | `await search.press('Enter');` |

**Remember:** a successful action does not automatically prove that the application behaved correctly. A strong UI test performs the action and then asserts the expected user-visible result.
