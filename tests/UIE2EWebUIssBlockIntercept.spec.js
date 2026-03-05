import {test, page, browser, expect  } from "@playwright/test";

test("Block API call for .css files", async ({ browser }) => {
    const context = await browser.newContext();
    const page  = await context.newPage(); // browser invoke at this moment like driver.getDriver()
    page.route("**/*.css", route => route.abort());
    const txtUsername= page.locator("#username");
    const btnSignIn = page.locator("#signInBtn");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // opening page
    await txtUsername.fill("rahulshettyacademy");
    await page.locator("input#password").fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();
    const productTitlesElements = page.locator("div.card-body a");
    console.log(await productTitlesElements.nth(0).textContent());
    await page.pause();
    
});

test("Block API call for image files", async ({ browser }) => {
    const context = await browser.newContext();
    const page  = await context.newPage(); // browser invoke at this moment like driver.getDriver()
    page.route("**/*.{jpg,jpeg,png}", route => route.abort());
    const txtUsername= page.locator("#username");
    const btnSignIn = page.locator("#signInBtn");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // opening page
    await txtUsername.fill("rahulshettyacademy");
    await page.locator("input#password").fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();
    const productTitlesElements = page.locator("div.card-body a");
    console.log(await productTitlesElements.nth(0).textContent());
    await page.pause();
    
});

test("Print all API call on network", async ({ browser }) => {
    const context = await browser.newContext();
    const page  = await context.newPage(); // browser invoke at this moment like driver.getDriver()
    const txtUsername= page.locator("#username");
    const btnSignIn = page.locator("#signInBtn");
    page.on("request", request => console.log(request.url()));
    page.on("response", response => console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // opening page
    await txtUsername.fill("rahulshettyacademy");
    await page.locator("input#password").fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();
    const productTitlesElements = page.locator("div.card-body a");
    console.log(await productTitlesElements.nth(0).textContent());
    await page.pause();
    
});

