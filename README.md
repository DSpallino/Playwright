# Playwright
Technical Evaluation
//
Step 1: Setup Environment
Initialize a New Playwright Project

Create a new directory for your project.
Initialize a new Node.js project and install Playwright

mkdir playwright
cd playwright
npm init -y
npm install playwright

Install Playwright Test Runner
Install Playwright's test runner for easier test writing.

npm install @playwright/test

Step 2: Implement Login Test
Create a Test File: Create a file named login.spec.js

// login.spec.js
const { test, expect } = require('@playwright/test');

test('Login to Asana', async ({ page }) => {
    await page.goto('https://app.asana.com/-/login');
    await page.fill('input[type="email"]', 'ben+pose@workwithloop.com');
    await page.fill('input[type="password"]', 'Password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/home');  // Wait for the home page to load
    expect(page.url()).toContain('/home');
});

Step 3: Implement Data-Driven Test
Create a Test File: Create a file named dataDrivenTest.spec.js.

const { test, expect } = require('@playwright/test');

const testCases = [
    {
        "id": 1,
        "name": "Test Case 1",
        "leftNav": "Cross-functional project plan, Project",
        "column": "To do",
        "card_title": "Draft project brief",
    },
    {
        "id": 2,
        "name": "Test Case 2",
        "leftNav": "Cross-functional project plan, Project",
        "column": "To do",
        "card_title": "Schedule kickoff meeting",
    },
    // Add other test cases as necessary
];

test.describe('Asana Data-Driven Tests', () => {
    testCases.forEach((data) => {
        test(data.name, async ({ page }) => {
            // Login to Asana
            await page.goto('https://app.asana.com/-/login');
            await page.fill('input[type="email"]', 'ben+pose@workwithloop.com');
            await page.fill('input[type="password"]', 'Password123');
            await page.click('button[type="submit"]');
            await page.waitForURL('**/home');

            // Navigate to the project page
            await page.click(`text=${data.leftNav}`);
            await page.waitForSelector(`text=${data.column}`);

            // Verify the card is within the right column
            const card = await page.$(`text=${data.card_title}`);
            const column = await card.evaluate(node => node.closest(`[data-column="${data.column}"]`));
            expect(column).not.toBeNull();
        });
    });
});

Step 4: Document the Process
Create a Documentation File: Create a file named README.md or writeup.md.

# Technical Evaluation Write-Up

## Challenges and Solutions

1. **Challenge**: Dynamic locators for cards in columns.
   **Solution**: Used `evaluate` to find the closest column element.

2. **Challenge**: Login page wait time.
   **Solution**: Used `waitForURL` to ensure the page loaded completely before proceeding.

## Recommendations

1. Implement more detailed error messages for failed login attempts.
2. Improve the performance of the card search by narrowing down the search scope.

## Submission

The code repository is available [here](https://github.com/DSpallino/playwright).
Email both the GitHub link and write-up document to `stacia@workwithloop.com`.

Step 5: Publish and Submit
Publish to GitHub:

git init
git add.
git commit -m "Initial commit for Playwright"
git remote add origin https://github.com/your-username/playwright-evaluation.git
git push -u origin master

//

## IN CASE YOU NEED THIS:

Ensure Node.js is Installed:

Make sure you have Node.js installed. You can download it from nodejs.org.
Open VS Code and Create a New Project:
Open VS Code.
Open a new terminal in VS Code (Ctrl + ~).
Create and navigate to your project directory:
mkdir playwright
cd playwright-evaluation

Initialize a New Node.js Project:
Initialize a new Node.js project and install Playwright:
npm init -y
npm install playwright @playwright/test

Create the Necessary Test Files:

Create the following files with the provided content.
login.spec.js:

// login.spec.js
const { test, expect } = require('@playwright/test');

test('Login to Asana', async ({ page }) => {
    await page.goto('https://app.asana.com/-/login');
    await page.fill('input[type="email"]', 'ben+pose@workwithloop.com');
    await page.fill('input[type="password"]', 'Password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/home');  // Wait for the home page to load
    expect(page.url()).toContain('/home');
});

dataDrivenTest.spec.js:
const { test, expect } = require('@playwright/test');

const testCases = [
    {
        "id": 1,
        "name": "Test Case 1",
        "leftNav": "Cross-functional project plan, Project",
        "column": "To do",
        "card_title": "Draft project brief",
    },
    {
        "id": 2,
        "name": "Test Case 2",
        "leftNav": "Cross-functional project plan, Project",
        "column": "To do",
        "card_title": "Schedule kickoff meeting",
    },
    // Add other test cases as necessary
];

test.describe('Asana Data-Driven Tests', () => {
    testCases.forEach((data) => {
        test(data.name, async ({ page }) => {
            // Login to Asana
            await page.goto('https://app.asana.com/-/login');
            await page.fill('input[type="email"]', 'ben+pose@workwithloop.com');
            await page.fill('input[type="password"]', 'Password123');
            await page.click('button[type="submit"]');
            await page.waitForURL('**/home');

            // Navigate to the project page
            await page.click(`text=${data.leftNav}`);
            await page.waitForSelector(`text=${data.column}`);

            // Verify the card is within the right column
            const card = await page.$(`text=${data.card_title}`);
            const column = await card.evaluate(node => node.closest(`[data-column="${data.column}"]`));
            expect(column).not.toBeNull();
        });
    });
});

Update package.json:
Add the test script to your package.json file.

{
  "name": "playwright",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "playwright test"
  },
  "dependencies": {
    "playwright": "^1.15.0",
    "@playwright/test": "^1.15.0"
  },
  "devDependencies": {},
  "author": "",
  "license": "ISC"
}

Then you'd do:
npm test
