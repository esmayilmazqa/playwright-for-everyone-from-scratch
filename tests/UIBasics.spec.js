import { test, expect } from '@playwright/test';

test("Navigation methods on pw", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://google.com");
    await page.goBack(); // to rahul website
    await page.goForward(); // to google website

    await page.pause();

});

test.only("Validation of textbox visibility", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const textbox = await page.locator("#displayed-text");
    await expect(textbox).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(textbox).not.toBeVisible(); // or toBeHidden();


    await page.pause();

});

test("First testcase with fresh browser and context declaration", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

// test.only
test("Second test without fresh instance", async ({ page }) => {
    await page.goto("https://google.com");
    // await page.pause(); // browser does not close
    console.log(await page.title()); // print page title
    await expect(page).toHaveTitle("Google"); // dont miss "await"

});

test("Find locator and start ui automation on negative login scenario", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title()); // LoginPage Practise | Rahul Shetty Academy
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    // Find locators to write something and click the button
    await page.locator('#username').fill("username");
    await page.locator('#password').fill("password");
    await page.locator('#signInBtn').click();
    // wait until this block locator shown up in the page
    console.log(await page.locator("[style*='block']").textContent()); // Incorrect username/password.
    await expect(page.locator("[style*='block']")).toContainText("Incorrectx");     // alternative full text : await expect(locator).toHaveText()


    // await page.pause();
});

test("Select nth index in multiple elements", async ({ page }) => {
    const txtUsername = page.locator("#username");
    const btnSignIn = page.locator('#signInBtn');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await txtUsername.fill("username ");
    await page.locator("#password").fill("learning");
    await txtUsername.fill("rahulshettyacademy"); // yazmadan once temizliyor
    await btnSignIn.click();
    console.log(await page.locator("div.card-body a").first().textContent());
    console.log(await page.locator("div.card-body a").nth(1).textContent());
    console.log(await page.locator("div.card-body a").last().textContent());


    //await page.pause();
});

test("Grab titles of products in one time", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("learning");
    await page.locator("#signInBtn").click();
    const productTitlesElements = page.locator("div.card-body a");
    console.log(await productTitlesElements.nth(0).textContent());
    const allTitles = await productTitlesElements.allTextContents(); // bu satıra bak
    console.log(allTitles); // []
    // await page.pause();

});

test("Login and waiting mechanisms", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await expect(page).toHaveTitle("Let's Shop");
    await page.locator("input#userEmail").fill("eyazilim@gmail.com");
    await page.locator("input#userPassword").fill("Eyazilim2025");
    await page.locator("#login").click();
    // dynamic wait but sometimes it can be flaky
    // await page.waitForLoadState("networkidle"); // this is worked for me -------------- 1  wait
    await page.locator(".card-body b").last().waitFor();  // alternative of networkidle -- 2  wait
    const titleList = page.locator(".card-body b");
    console.log(await titleList.allTextContents()); // [ 'ZARA COAT 3', 'ADIDAS ORIGINAL', 'iphone 13 pro' ]
    await page.pause();
});

test("Handle Dropdown Test", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const txtUsername = page.locator("input#username");
    const txtPassword = page.locator("input#password");
    const btnSignIn = page.locator("input#signInBtn");
    const ddRole = page.locator("select.form-control");
    await ddRole.selectOption("consult");
    const radioUser = page.locator("input#usertype").last();
    await radioUser.click();
    await page.locator("button#okayBtn").click();
    await expect(radioUser).toBeChecked(); // assertion for radioBtn checked
    console.log(await radioUser.isChecked());
    const chckTerms = page.locator("input#terms");
    await chckTerms.click();
    await expect(chckTerms).toBeChecked();
    await chckTerms.uncheck();              // uncheck() method
    // toBeFalsy() is not an async action. but isChecked is async action
    expect(await chckTerms.isChecked()).toBeFalsy(); // assertion tobeFalse
    await expect(chckTerms).not.toBeChecked(); // falsy alternative - 
    // await page.pause();

});

// https://playwright.dev/docs/test-assertions#non-retrying-assertions
test("Understanding Assertions", async ({ page }) => {
    const blinkText = page.locator("a[href*='document']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await expect(blinkText).toHaveAttribute("class", "blinkingText");
    await page.pause();
});


test("Handling child window and tab", async ({ browser }) => {
    const context = await browser.newContext();
    const mainPage = await context.newPage(); // browser invoke at this moment like driver.getDriver()
    const documentLink = mainPage.locator("a[href*='document']");
    await mainPage.goto("https://rahulshettyacademy.com/loginpagePractise/"); // opening page
    const [childPage] = await Promise.all(
        [
            context.waitForEvent("page"),
            documentLink.click(),
        ]
    );

    const redText = await childPage.locator("p.red").textContent();
    console.log(redText); // Please email us at mentor@rahulshet...

    const username = redText.split("@")[1].split(" ")[0];
    console.log(username); // rahulshettyacademy.com

    await mainPage.locator("input#username").fill(username);
    console.log("textContent", await mainPage.locator("input#username").textContent()); // empty
    console.log("inputValue", await mainPage.locator("input#username").inputValue()); // rahulshettyacademy.com
    console.log("getAttribute", await mainPage.locator("input#username").getAttribute("value")); // null

    // await mainPage.pause();
});


// get Locators from coming Locator API on Playwright
test("Get Locators from Locator API", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click(); // or check
    await page.getByLabel("Employed").check(); // or click()
    await page.getByLabel("Gender").selectOption("Female"); // for select tags

    await page.getByPlaceholder("Password").fill("Abc123+");

    await page.getByRole("button", { name: 'Submit' }).click();

    const successMessage = await page.getByText("Success! The Form has been submitted successfully!.").textContent();
    console.log(successMessage);

    await page.getByRole("link", { name: 'Shop' }).click();

    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();

    // await page.pause();

});

test("Handle calendar element", async ({ page }) => {
    const month = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [month, date, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator("div.react-date-picker__inputGroup").click();
    await page.locator("span.react-calendar__navigation__label__labelText").click();
    await page.locator("span.react-calendar__navigation__label__labelText").click();
    await page.getByText(year).click();                                                 // year
    await page.locator("button.react-calendar__tile").nth(Number(month) - 1).click();     // month
    await page.locator(`//abbr[text()='${date}']`).click();

    const inputs = page.locator("div.react-date-picker__inputGroup input");

    for (let i = 1; i < await inputs.count(); i++) {
        const value = await inputs.nth(i).inputValue();
        await expect(value).toEqual(expectedList[i-1]);
    }

    await page.pause();

});


test('codegen app', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('span').nth(4).click();
    await page.getByRole('button', { name: 'Okay' }).click();
    await page.getByRole('combobox').selectOption('consult');
    await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).check();
    await page.getByRole('textbox', { name: 'Username:' }).click();
    await page.getByRole('textbox', { name: 'Username:' }).fill('rahulshettyacademy');
    await page.getByRole('textbox', { name: 'Username:' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password:' }).fill('learning');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Free Access to InterviewQues/' }).click();
    const page1 = await page1Promise;
    await page1.getByRole('link', { name: 'Courses' }).click();
    await page1.goto('https://rahulshettyacademy.com/documents-request');
    await page1.getByRole('link', { name: 'Mentorship' }).click();
    await page1.goto('https://rahulshettyacademy.com/documents-request');
    await page1.getByRole('link', { name: 'Practice' }).click();
    await page1.goto('https://rahulshettyacademy.com/documents-request');
    await page1.getByRole('link', { name: 'NEW All Access plan' }).click();
    const page2Promise = page1.waitForEvent('popup');
    await page1.getByRole('button', { name: 'JOIN NOW' }).first().click();
    const page2 = await page2Promise;
    await page2.getByRole('link', { name: 'Learning Path' }).click();
    await page2.getByRole('button', { name: 'Close' }).click();
    await page2.getByText('⚡').click();
    await page2.getByRole('heading', { name: '[JAVASCRIPT] Become Full' }).click();
    await page2.getByRole('button', { name: '+1 more courses' }).click();
});