# Playwright – Chapter 1: Introduction, Setup & First Test

**Video duration:** Approximately 1 hr 37 min  
**Level:** Beginner

These notes follow the instructor’s sequence and cover the nine sections in the Chapter 1 transcript. Additional learning suggestions are listed separately at the end; they are not incorporated as new chapter topics.

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

This session starts the Playwright automation course. It introduces the development environment, project setup, project files, a basic test, fixtures, asynchronous programming, test execution and debugging, and Playwright’s architecture.

The instructor notes that a previous session covered Playwright’s introduction and comparison with Selenium. This chapter moves directly into installation and practical setup.

## 1.2 Official documentation

The instructor recommends the [official Playwright documentation](https://playwright.dev/docs/intro) as a reference while learning. It includes installation, writing and generating tests, running tests, Trace Viewer, CI setup, and feature documentation. Reading documentation should be paired with coding and execution so that you see how a feature behaves.

## 1.3 Supported languages

Playwright supports TypeScript, JavaScript, Python, Java, and .NET. This course uses **TypeScript with Node.js**. The instructor notes that TypeScript and JavaScript are closely related for the Playwright examples in this course.

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

If Node.js is already installed for TypeScript work, the instructor says it does not need to be installed again. The Playwright initializer can configure the TypeScript project; a separate global TypeScript installation is not needed for this course setup.

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

The initializer asks several configuration questions.

1. **Programming language:** select TypeScript for this course.
2. **Test folder:** keep the default `tests` folder unless you have a reason to choose another.
3. **GitHub Actions workflow:** the instructor leaves this disabled at this stage. GitHub Actions can automate workflows such as running tests after code is pushed.
4. **Install Playwright browsers:** select **Yes** so the browser binaries needed to run the tests are installed.

## 3.3 Browser engines

Playwright supports three major browser engines:

| Engine | Browser association described in the course |
|---|---|
| Chromium | Used by Chrome and Edge-based browsers |
| Firefox | Firefox |
| WebKit | Used by Safari |

Chromium is an engine, not the Chrome product itself. WebKit is the engine associated with Safari.

## 3.4 Useful setup and execution commands

| Command | Purpose |
|---|---|
| `npm init playwright@latest` | Initialize a Playwright project. |
| `npx playwright install` | Install Playwright browser binaries. |
| `npx playwright --version` | Display the Playwright version. |
| `node --version` | Display the Node.js version. |
| `npm --version` | Display the npm version. |

The instructor introduces these test commands here and discusses them further in Section 8:

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

This folder contains the dependencies installed for the project, including Playwright packages and their dependencies. It is created during dependency installation. Do not edit its contents manually; it is generally excluded from Git through `.gitignore`.

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

This is the main Playwright configuration file. The instructor discusses the test directory, parallel execution, workers, reporters, browser projects, and execution settings.

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

This example illustrates the concepts covered in the transcript. Browser engines can be separate projects. With all three configured, a test can run against all three; a particular project can also be selected at runtime (covered later in the course).

## 4.5 `package.json`

This file contains project metadata, dependencies, development dependencies, and scripts. Example:

```json
{
  "name": "pw-demos",
  "version": "1.0.0",
  "devDependencies": {
    "@playwright/test": "^1.0.0"
  }
}
```

The version is illustrative only. The instructor compares the Node.js project setup with Java Maven projects:

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

The report is opened during the test-running discussion in Section 8.

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

Each test has its own title and callback.

---

# 6. Implementing Test Steps – Fixtures

## 6.1 What is a fixture?

A fixture supplies the resources and setup needed by a test. The video introduces the `page` and `browser` fixtures.

- **`page`:** a browser tab/page used to navigate, interact with the application, retrieve information, and validate behavior.
- **`browser`:** the browser instance. The instructor introduces it here and postpones its detailed explanation.

## 6.2 Receiving the `page` fixture

```typescript
test('Verify page title', async ({ page }) => {
  // Test steps
});
```

The braces destructure `page` from the fixture object supplied by the Playwright Test runner. You do not manually construct this fixture in a basic test.

For a banking application, the page is the interface used to open the application, enter a username and password, click Login, and verify the dashboard.

## 6.3 Navigate with `page.goto()`

```typescript
await page.goto('https://example.com');
```

`page` is the page fixture, `goto()` performs navigation, and `await` waits for the asynchronous navigation operation to complete.

## 6.4 Read the page title and URL

```typescript
const title = await page.title();
console.log(title);

const currentURL = page.url();
console.log(currentURL);
```

`page.title()` returns the title asynchronously, so the example awaits it. The URL example in the video reads the current URL as a string.

## 6.5 Assert the title

```typescript
await expect(page).toHaveTitle('Example Domain');
```

`expect(page)` creates an assertion against the page. `toHaveTitle()` checks the actual page title against the expected string. A match passes; a mismatch fails.

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

1. Import `test` and `expect`.
2. Define a test.
3. Receive the `page` fixture.
4. Navigate to the site.
5. Read and print the title.
6. Assert the expected title.
7. Playwright reports whether the test passed or failed.

---

# 7. Async, Await and Promise Concepts

The instructor emphasizes async and await because browser automation operations involve asynchronous work.

## 7.1 Synchronous and asynchronous execution

Synchronous statements execute in order; the next step waits for the current step to finish:

```typescript
console.log('Step 1');
console.log('Step 2');
console.log('Step 3');
```

Asynchronous work includes operations such as network requests, database or file operations, and browser navigation. In the transcript’s customer example, checking account status depends on first retrieving customer details. The dependent step must wait for its input.

## 7.2 Promise states

A Promise represents the eventual result of asynchronous work.

| State | Meaning |
|---|---|
| Pending | The operation is still in progress. |
| Fulfilled | The operation completed successfully. |
| Rejected | The operation failed. |

For example, `fetch()` returns a Promise; the response data is not immediately available as the final value. A rejected Promise signals failure and should be handled appropriately.

## 7.3 `await`

`await` waits for a Promise to settle and gives the fulfilled value to the expression. If the Promise rejects, the error is thrown and can be handled by error handling.

Without awaiting an asynchronous title call, the variable holds a Promise:

```typescript
const titlePromise = page.title();
```

With `await`, it holds the resolved title string:

```typescript
const title = await page.title();
```

This is why the transcript demonstrates adding `await` when retrieving a title for logging; otherwise the output may be a pending Promise rather than the title value.

## 7.4 `async`

The `async` keyword declares an asynchronous function. Playwright test callbacks that use `await` are written as async callbacks:

```typescript
test('Verify page title', async ({ page }) => {
  await page.goto('https://example.com');
  const title = await page.title();
});
```

The key relationship taught in the video is: use `async` on the function containing `await`, and use `await` for the Promise-returning operation whose result or completion the next step needs.

## 7.5 Applying async/await to Playwright steps

Navigation and other browser operations complete asynchronously. Awaiting them makes the test sequence explicit: navigate, then obtain the title, then assert. The transcript demonstrates that an assertion can pass while a separate title logging statement still fails to display the actual value if that title Promise was not awaited.

**Clarification:** The transcript informally generalizes that every automation statement returns a Promise. In practice, await only operations that return Promises; synchronous getters such as `page.url()` do not need `await`. The example above reflects this distinction.

---

# 8. Running and Debugging Tests

## 8.1 Commands introduced

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

The transcript also asks learners to explore running in headless mode, opening the report, running one or multiple tests, and targeting a specific browser project. Headless execution is the default in the shown configuration (`headless: true`); headed mode displays the browser window. The instructor says to practice the options rather than rush ahead.

## 8.2 Reports

The project includes a `playwright-report` folder for an HTML report when generated. The instructor demonstrates viewing the report in this part of the course and encourages practicing the report command/flow alongside UI, headed, headless, and debug execution.

---

# 9. Playwright Architecture

## 9.1 Why learn the architecture?

The instructor introduces architecture as an explanation of how an automation tool works internally and compares Playwright with Selenium. This section is intended as a simple conceptual and interview-level overview.

## 9.2 Protocol and connection comparison in the lecture

The lecture’s comparison is:

| Selenium (as presented in the lecture) | Playwright (as presented in the lecture) |
|---|---|
| Uses the W3C WebDriver protocol over HTTP requests. | Uses a WebSocket connection for communication. |
| The lecture describes requests as opening and closing a connection repeatedly. | The lecture describes establishing a connection, sending multiple commands over it, then closing it. |
| Uses browser-specific drivers. | The lecture says Playwright communicates with supported browsers without separate browser-specific WebDriver drivers. |

The central takeaway for the course is that Playwright uses a persistent WebSocket-based communication path, while the lecture contrasts this with Selenium’s WebDriver/HTTP model. The documentation provides further architecture detail.

## 9.3 Client and browser communication

The client/language bindings are the programming language interface used to write the test script. The lecture describes a WebSocket connection being established so commands can be sent in sequence without creating a new connection for every command. This is presented as a reason the interaction can be faster.

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

The instructor advises practicing patiently and learning the topics step by step.

---

# 11. Additional Topics Suggested for a Later Chapter

The transcript mentions that the first session covered Playwright’s general introduction and Selenium comparison, but those details are not part of the provided Chapter 1 transcript. For continuity, these could be covered separately later:

- A deeper explanation of Playwright’s feature set and limitations.
- A fuller comparison of Playwright and Selenium architecture.
- A more detailed explanation of browser, BrowserContext, and page lifecycles.

These are suggestions only and have not been added as new lesson content.

---

# 12. Clarifications and Revision Questions

## Clarifications

- **Browser vs. browser engine:** Chromium, Firefox, and WebKit are engines; Chrome, Edge, Firefox, and Safari are browser products associated with those engines.
- **Project dependencies:** Each independent project needs its own package configuration and dependencies.
- **Promises and `await`:** Await Promise-returning operations when the test needs their completion or resolved value. Not every Playwright API is asynchronous; for example, the `page.url()` getter is synchronous.
- **Architecture comparison:** The protocol discussion above records the instructor’s simplified comparison from the video; use the official Playwright and Selenium documentation for deeper implementation details.
- **Additional material:** Suggestions are clearly separated so they are not silently mixed into transcript-based notes.

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
13. How does the lecture compare Selenium’s HTTP/WebDriver communication with Playwright’s WebSocket communication?
14. What should you practice before moving on to the next class?
