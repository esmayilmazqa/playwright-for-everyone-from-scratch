import { test, expect } from '@playwright/test';

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

test("Select nth index in multiple elements", async ({page}) =>{
    const txtUsername = page.locator("#username");
    const btnSignIn = page.locator('#signInBtn');
    await  page.goto("https://rahulshettyacademy.com/loginpagePractise/");
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