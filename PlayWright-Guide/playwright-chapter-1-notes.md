# Playwright – Chapter 1: Introduction, Setup & First Test

**Level:** Beginner

This chapter explains the purpose of Playwright, environment setup, project structure, first tests, fixtures, asynchronous operations, execution and debugging, and the basic architecture comparison. Additional learning suggestions are listed separately at the end.

## Contents

1. Introduction to Playwright
2. Environment setup
3. Playwright project initialization
4. Understanding project structure
5. Writing a basic test
6. Implementing test steps with fixtures
7. Async and await concepts
8. Running and debugging tests
9. Playwright architecture
10. Practical assignment
11. Additional topics suggested for a later chapter
12. Clarifications and revision questions

---

# 1. Introduction to Playwright

## 1.1 Purpose of the session

Playwright is a browser automation framework. A test script gives the browser a sequence of actions, such as opening a page, interacting with controls, and checking the result. This chapter builds the foundation for that workflow: preparing a project, writing a test, understanding the objects supplied to it, and running the test.

## 1.2 Official documentation

The [official Playwright documentation](https://playwright.dev/docs/intro) is the reference for installation, writing and generating tests, running tests, Trace Viewer, CI setup, and Playwright features. Use documentation to check exact syntax and available options, then run a small example to connect the written description to actual behavior.

## 1.3 Supported languages

Playwright supports TypeScript, JavaScript, Python, Java, and .NET. These are language bindings for controlling browsers through Playwright. This course uses **TypeScript with Node.js**. TypeScript adds static type checking to JavaScript and is compiled/transformed for execution in the Node.js environment; the Playwright test APIs used here are familiar to JavaScript developers.

---

# 2. Environment Setup

## 2.1 Prerequisites

| Requirement | Purpose |
|---|---|
| Node.js | Runtime for JavaScript and TypeScript projects; used to run Playwright and manage dependencies. |
| npm | Node Package Manager, bundled with Node.js, used to install and manage packages. |
| Visual Studio Code | Editor used to create files, write code, use a terminal, and debug. |

Check Node.js and npm from a terminal:

```bash
node --version
npm --version
```

Examples of package installation commands:

```bash
npm install typescript
npm install @playwright/test
```

Terminology:

- **Node.js** is the JavaScript runtime.
- **npm** manages packages.
- A **package** is reusable software used by a project.
- **TypeScript** is the language; Playwright Test is the test framework; Node.js provides the runtime.

If Node.js is already installed for TypeScript work, it can be used for this project too. The initializer sets up the Playwright project and its TypeScript files, so a separate global TypeScript installation is not required for this setup.

---

# 3. Playwright Project Initialization

## 3.1 Create and open a project folder

Create a dedicated folder, open it in VS Code using **File → Open Folder**, and open the integrated terminal. The folder is initially empty and is not yet a Playwright project.

Example:

```text
Automation/
└── PW-Demos/
```

## 3.2 Initialize Playwright

Run the project initializer in the project folder:

```bash
npm init playwright@latest
```

The initializer creates the initial project files, installs the Playwright Test package, and offers configuration choices. Running it from the intended project folder matters because that folder becomes the root for the package manifest, configuration, tests, and installed dependencies.

The initializer asks several configuration questions.

1. **Programming language:** select TypeScript for this course.
2. **Test folder:** keep the default `tests` folder unless you have a reason to choose another.
3. **GitHub Actions workflow:** this is optional at project creation. GitHub Actions can automate workflows such as running tests after code is pushed. It is reasonable to leave it disabled while focusing on local setup.
4. **Install Playwright browsers:** select **Yes** so the browser binaries needed to run the tests are installed.

## 3.3 Browser engines

Playwright supports three major browser engines:

| Engine | Browser association described in the course |
|---|---|
| Chromium | Used by Chrome and Edge-based browsers |
| Firefox | Firefox |
| WebKit | Used by Safari |

Chromium, Firefox, and WebKit are browser engines: the underlying software that interprets web pages and implements browser behavior. Chrome and Edge are products built on Chromium; Safari uses WebKit; Firefox uses its own engine. Running tests against different engines can expose browser-specific differences in layout, rendering, or interaction behavior.

## 3.4 Useful setup and execution commands

| Command | Purpose |
|---|---|
| `npm init playwright@latest` | Initialize a Playwright project. |
| `npx playwright install` | Install Playwright browser binaries. |
| `npx playwright --version` | Display the Playwright version. |
| `node --version` | Display the Node.js version. |
| `npm --version` | Display the npm version. |

The following commands are used to run and inspect tests:

```bash
npx playwright test
npx playwright test --ui
npx playwright test --headed
npx playwright test --debug
```

- The first command runs discovered tests.
- `--ui` opens UI Mode.
- `--headed` runs with visible browser windows.
- `--debug` runs in debugging mode.

---

# 4. Understanding Project Structure

A typical initialized project resembles:

```text
PW-Demos/
├── node_modules/
├── tests/
│   └── example.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
├── test-results/
└── playwright-report/
```

## 4.1 `node_modules`

This folder contains the dependencies installed for the project, including Playwright packages and their dependencies. A package can itself depend on other packages, so the folder may contain many nested dependencies. It is created from the project’s package manifest and lockfile during installation. Do not edit its contents manually; it can be recreated and is generally excluded from Git through `.gitignore`.

## 4.2 `tests`

This is the default location for test files. Files can contain one or more test cases. The test directory is configured in `playwright.config.ts`; tests placed elsewhere need to be covered by the configuration.

## 4.3 Test file naming

The convention demonstrated is:

```text
filename.spec.ts
```

Examples:

```text
login.spec.ts
payment.spec.ts
account.spec.ts
```

For JavaScript, use `.spec.js`. The `.spec` naming convention matches Playwright’s default test discovery pattern.

## 4.4 `playwright.config.ts`

This is the main Playwright configuration file. It tells the test runner where tests are located and how to run them, including browser projects, reporter choice, and execution settings.

Illustrative configuration:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

This example defines three projects. A project is a named configuration for a particular browser/device setup. With all three enabled, the same test suite can be run in each configured engine. Selecting a single project at runtime is useful when you want a faster focused run or need to investigate browser-specific behavior.

## 4.5 `package.json`

This file is the project’s package manifest. It contains metadata, dependencies, development dependencies, and scripts. npm reads it to know which packages the project needs. Example:

```json
{
  "name": "pw-demos",
  "version": "1.0.0",
  "devDependencies": {
    "@playwright/test": "^1.0.0"
  }
}
```

The version is illustrative only. `package.json` plays a central role in describing the Node.js project and its dependencies. A rough ecosystem comparison is:

| Java project | Node.js project |
|---|---|
| Maven | npm |
| `pom.xml` | `package.json` |
| Dependencies | Dependencies |
| Maven commands | npm/npx commands |

Maven is not required for this Playwright project.

## 4.6 Test output and report folders

- `test-results` stores execution artifacts and result-related information.
- `playwright-report` stores the generated HTML report when one is configured or generated.

The report can be opened after execution to inspect test outcomes and failure details; see Section 8.

## 4.7 Project-specific installation

Playwright dependencies and initialization belong to each project. Initializing one folder does not initialize another:

```text
Automation/
├── Project-A/
│   ├── package.json
│   └── playwright.config.ts
└── Project-B/
    ├── package.json
    └── playwright.config.ts
```

---

# 5. Writing a Basic Test

## 5.1 Import `test` and `expect`

```typescript
import { test, expect } from '@playwright/test';
```

| Function | Purpose |
|---|---|
| `test` | Defines a test case. |
| `expect` | Performs assertions to compare actual behavior with an expected result. |

Assertions can verify a page title, URL, element visibility, or displayed text.

## 5.2 Basic test syntax

```typescript
test('Test title', async () => {
  // Test steps
});
```

- `test` is the Playwright Test function.
- The title should describe what the test verifies.
- `async` declares an asynchronous callback.
- The arrow function contains the test implementation.

## 5.3 Multiple tests in one file

A file can define multiple independent tests:

```typescript
import { test, expect } from '@playwright/test';

test('Verify page title', async ({ page }) => {
  // Test steps
});

test('Verify page URL', async ({ page }) => {
  // Test steps
});

test('Verify page content', async ({ page }) => {
  // Test steps
});
```

Each test has its own title and callback. The title appears in test results, so it should state the behavior or outcome being checked. Keeping tests as separate cases gives each one its own result and makes failures easier to locate.

---

# 6. Implementing Test Steps – Fixtures

## 6.1 What is a fixture?

A fixture supplies a test with a resource or prepared state. Playwright Test manages fixture setup and cleanup around test execution, so tests can request what they need as callback parameters. A fixture helps make tests more consistent because the runner controls how the resource is prepared and made available. This chapter introduces the `page` and `browser` fixtures.

- **`page`:** a browser tab/page used to navigate, interact with the application, retrieve information, and validate behavior.
- **`browser`:** the browser instance that can host browser contexts. It is introduced here; this chapter focuses mainly on `page`.

## 6.2 Receiving the `page` fixture

```typescript
test('Verify page title', async ({ page }) => {
  // Test steps
});
```

The braces use JavaScript/TypeScript object destructuring to take the `page` property from the fixture object supplied by the Playwright Test runner. The runner creates and provides the fixture for each test according to its lifecycle. You do not manually construct it in a basic test.

For a banking application, the page is the interface used to open the application, enter a username and password, click Login, and verify the dashboard.

## 6.3 Navigate with `page.goto()`

```typescript
await page.goto('https://example.com');
```

`page` is the page fixture and `goto()` requests navigation to the supplied URL. The method returns a Promise because navigation takes time and can involve network activity, redirects, and page loading. `await` pauses this test callback until the navigation Promise settles, so later steps run after the navigation operation completes.

## 6.4 Read the page title and URL

```typescript
const title = await page.title();
console.log(title);

const currentURL = page.url();
console.log(currentURL);
```

`page.title()` returns a Promise for the document title, so the example awaits it before storing the resulting string. `page.url()` returns the current URL synchronously as a string. The distinction matters: the variable should contain the value you intend to inspect or print, not a Promise representing work that has not finished.

## 6.5 Assert the title

```typescript
await expect(page).toHaveTitle('Example Domain');
```

`expect(page)` creates an assertion subject. `toHaveTitle()` is a web-first assertion: it checks the page title and can retry while the page reaches the expected state, up to the assertion timeout. This is useful when a title is updated during navigation. A matching title passes; if it does not match before the timeout, the assertion fails with diagnostic output.

## 6.6 Complete first test

```typescript
import { test, expect } from '@playwright/test';

test('Verify page title', async ({ page }) => {
  await page.goto('https://example.com');

  const title = await page.title();
  console.log('Page title:', title);

  await expect(page).toHaveTitle('Example Domain');
});
```

Execution flow:

1. Import `test` and `expect` from Playwright Test.
2. Register a test with a readable title.
3. Receive the `page` fixture from the runner.
4. Navigate to the site and wait for the navigation operation.
5. Read and print the title for observation.
6. Assert the expected title.
7. The runner records the test as passed or failed and reports diagnostic information if an operation or assertion fails.

The `console.log` line is useful while learning, but the assertion is what makes the test automatically verify behavior. A test that only prints a value does not fail just because the value is unexpected.

---

# 7. Async, Await and Promise Concepts

Async and await are essential because browser automation communicates with a browser that performs work over time. Navigation, locating and interacting with elements, and reading many page properties may involve asynchronous operations. Awaiting these operations helps keep dependent test steps in the intended order.

## 7.1 Synchronous and asynchronous execution

Synchronous statements run one after another on the current JavaScript execution path. Each statement completes before execution moves to the next:

```typescript
console.log('Step 1');
console.log('Step 2');
console.log('Step 3');
```

Asynchronous work includes operations such as network requests, database or file operations, and browser navigation. Starting such work may return immediately with a Promise while the operation continues. If checking an account status depends on first retrieving customer details, the second operation must use the completed result of the first. Awaiting expresses that dependency clearly.

## 7.2 Promise states

A Promise is an object that represents work that may finish later and the value or error it will produce. Creating a Promise does not mean the work has already succeeded; it only gives the program a way to observe its eventual outcome.

| State | Meaning |
|---|---|
| Pending | The operation is still in progress. |
| Fulfilled | The operation completed successfully. |
| Rejected | The operation failed. |

For example, `fetch()` returns a Promise; the response data is not immediately available as the final value. A rejected Promise signals failure and should be handled appropriately.

## 7.3 `await`

`await` suspends the current async function until the Promise settles. If fulfilled, the expression evaluates to the fulfillment value. If rejected, the rejection becomes an exception at that point and can be handled with `try`/`catch` or allowed to fail the test. Awaiting does not freeze the entire JavaScript runtime; other work can continue while this function is waiting.

Without awaiting an asynchronous title call, the variable holds a Promise:

```typescript
const titlePromise = page.title();
```

With `await`, it holds the resolved title string:

```typescript
const title = await page.title();
```

When retrieving a title for logging, add `await`; otherwise the output may be a Promise rather than the title value.

## 7.4 `async`

The `async` keyword declares an asynchronous function. Playwright test callbacks that use `await` are written as async callbacks:

```typescript
test('Verify page title', async ({ page }) => {
  await page.goto('https://example.com');
  const title = await page.title();
});
```

Use `async` on a function that needs to use `await`. An async function itself returns a Promise. Use `await` on a Promise-returning operation when the next step depends on its completion or result. This lets sequential test code express asynchronous dependencies without nesting callbacks.

## 7.5 Applying async/await to Playwright steps

Navigation and many browser operations complete asynchronously. Awaiting them makes the dependency explicit: navigate, then obtain the title, then assert. If a Promise is passed to `console.log` without awaiting, the output may show a Promise object or pending state instead of the resolved title. An assertion is a separate operation; its success does not automatically resolve an unrelated Promise that was started for logging.

**Important distinction:** Not every automation statement returns a Promise. Await operations that return Promises; synchronous getters such as `page.url()` do not need `await`.

---

# 8. Running and Debugging Tests

## 8.1 Running modes and commands

Run all discovered tests:

```bash
npx playwright test
```

Open UI Mode:

```bash
npx playwright test --ui
```

Run with visible browser windows (headed mode):

```bash
npx playwright test --headed
```

Run in debug mode:

```bash
npx playwright test --debug
```

Also practice headless execution, opening the report, running one or multiple tests, and targeting a specific browser project. Headless execution runs the browser without displaying its window; it is useful for routine automated runs. Headed execution displays the browser and helps you observe what the test is doing. The shown configuration sets `headless: true`.

## 8.2 Reports

The project includes a `playwright-report` folder for an HTML report when generated. The report summarizes test outcomes and helps you inspect failures. UI Mode provides an interactive way to explore test runs; debug mode supports stepping through execution and inspecting state. Headed mode makes browser actions visible, while headless mode keeps execution in the background.

---

# 9. Playwright Architecture

## 9.1 Why learn the architecture?

Architecture describes how the test code communicates with the browser and how browser commands are carried out. The comparison below is a high-level conceptual overview of Playwright and Selenium.

## 9.2 Protocol and connection comparison

The high-level comparison is:

| Selenium | Playwright |
|---|---|
| Uses the W3C WebDriver protocol over HTTP requests. | Uses a WebSocket connection for communication. |
| The communication model is based on WebDriver commands sent through a driver. | A persistent WebSocket connection can carry successive messages while it is open. |
| WebDriver uses browser-specific driver implementations. | Playwright provides its own browser automation runtime and supported browser integrations. |

The central takeaway is that the tools use different communication models: Selenium’s WebDriver standard defines commands sent through a driver, while Playwright maintains browser communication over its own protocol. The WebSocket connection can carry successive messages while it remains open. Protocol choice is only one part of architecture; it does not by itself guarantee that every test run will be faster, since execution also depends on the page, network, and test workload.

## 9.3 Client and browser communication

The client or language binding is the API your TypeScript test calls. When the script requests an action, Playwright’s runtime communicates with the browser, and browser events and results are returned to the test. A WebSocket is a persistent, two-way connection: after it is established, messages can travel in both directions without setting up a fresh connection for each command. This supports ongoing communication between the automation client and browser.

---

# 10. Practical Assignment

Practice the topics covered in this chapter:

1. Initialize a Playwright project and install the browsers.
2. Run a simple test.
3. Run a single test and multiple tests.
4. Try UI Mode, debug mode, headed mode, and headless mode.
5. Open and inspect the HTML report.
6. Run tests against a specific browser project.
7. Review the project files and the official documentation.

Work through the exercises one step at a time, confirm that each command behaves as expected, and use failures as clues about the setup or test flow.

---

# 11. Additional Topics Suggested for a Later Chapter

The following related topics can be explored separately later, since this chapter only introduces them briefly:

- A deeper explanation of Playwright’s feature set and limitations.
- A fuller comparison of Playwright and Selenium architecture.
- A more detailed explanation of browser, BrowserContext, and page lifecycles.

These are suggestions only and are kept separate from the chapter content.

---

# 12. Clarifications and Revision Questions

## Clarifications

- **Browser vs. browser engine:** Chromium, Firefox, and WebKit are engines; Chrome, Edge, Firefox, and Safari are browser products associated with those engines.
- **Project dependencies:** Each independent project needs its own package configuration and dependencies.
- **Promises and `await`:** Await Promise-returning operations when the test needs their completion or resolved value. Not every Playwright API is asynchronous; for example, the `page.url()` getter is synchronous.
- **Architecture comparison:** The protocol discussion above is a high-level comparison. Use the official Playwright and Selenium documentation for deeper implementation details.
- **Additional material:** Suggestions are clearly separated so they are not mixed into the chapter’s covered topics.

## Revision questions

1. What role do Node.js, npm, TypeScript, and Playwright Test each play?
2. Which command initializes a new Playwright project?
3. What are Chromium, Firefox, and WebKit?
4. What is the purpose of `tests`, `node_modules`, `playwright.config.ts`, and `package.json`?
5. What does the `.spec.ts` naming convention indicate?
6. What are `test` and `expect` used for?
7. What does the `page` fixture represent, and how does a test receive it?
8. What do `page.goto()`, `page.title()`, and `page.url()` do?
9. Why does a Playwright test callback use `async` when it contains `await`?
10. What are the pending, fulfilled, and rejected states of a Promise?
11. What is the difference between headed and headless execution?
12. Which commands open UI Mode and debug mode?
13. How do Selenium’s WebDriver communication and Playwright’s WebSocket communication differ at a high level?
14. What should you practice before moving on to the next class?
