# OrangeHRM E2E Test Suite (Playwright + TypeScript)

[![E2E tests](https://github.com/fedeojeda92/playwright-orangehrm/actions/workflows/playwright.yml/badge.svg)](https://github.com/fedeojeda92/playwright-orangehrm/actions/workflows/playwright.yml)
![Playwright](https://img.shields.io/badge/Playwright-1.x-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)

End-to-end tests for the critical flows of [OrangeHRM](https://opensource-demo.orangehrmlive.com/), an open-source HR management SPA, written with **Playwright**, **TypeScript** and the **Page Object Model**. The suite runs automatically on every push and every week through **GitHub Actions**.

## What it covers

| # | Flow | What it checks |
|---|------|----------------|
| T1 | Login (valid) | Admin credentials open the Dashboard |
| T2 | Login (invalid) | Wrong password shows "Invalid credentials" and stays on the login page |
| T3 | Employee search (no match) | Searching a name that does not exist shows "No Records Found" |
| T4 | Add employee | A new employee is saved and its Personal Details page shows the entered data |
| T5 | Search created employee | The employee created in T4 appears in the Employee List search |

Acceptance criteria are written in Given/When/Then format in [`specs/spec-testing.md`](specs/spec-testing.md).

## Design decisions

- **Page Object Model:** each screen has its own class in [`pages/`](pages) that holds its locators and actions, so tests read like user stories and a UI change is fixed in one place.
- **Custom fixtures:** [`fixtures/test.ts`](fixtures/test.ts) injects the page objects and a `loggedIn` fixture, which removes repeated login steps from the tests.
- **User-facing locators:** placeholders and accessible roles (`getByRole`, `getByPlaceholder`) instead of brittle CSS chains wherever the app allows it.
- **Shared-demo safety:** employees are created with a timestamp suffix (`Fede<timestamp>`) so runs never collide with other users, and the suite runs serially with one worker.
- **Debuggability:** traces are always recorded and an HTML report is published as a CI artifact.

## Project structure

```
pages/        Page Objects (Login, Dashboard, Employee List, Add Employee, Personal Details)
fixtures/     Custom Playwright fixtures (page objects + logged-in state)
tests/        Test specs (login, employees)
specs/        Test plan and acceptance criteria
.github/      CI workflow (GitHub Actions)
```

## Run it locally

```bash
npm install
npx playwright install chromium
npm test            # run the suite
npm run test:ui     # interactive UI mode
npm run report      # open the last HTML report
```

## Tech

Playwright Test · TypeScript · Page Object Model · GitHub Actions · Chromium (1280×720)

---

Built by [Federico Ojeda](https://github.com/fedeojeda92), Full-Stack Developer.
