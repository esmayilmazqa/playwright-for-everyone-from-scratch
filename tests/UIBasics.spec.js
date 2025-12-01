import { test, expect } from '@playwright/test';

test("First testcase with fresh browser and context declaration", async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test.only("second test without fresh instance", async ({page}) => {
    await page.goto("https://google.com");
    // await page.pause(); // browser does not close
    console.log(await page.title()); // print page title
    await expect(page).toHaveTitle("Google"); // Received: ""

});