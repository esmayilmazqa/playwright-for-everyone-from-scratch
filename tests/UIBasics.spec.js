import { test, expect } from '@playwright/test';

test("First testcase with fresh browser and context declaration", async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

// test.only
test("Second test without fresh instance", async ({page}) => {
    await page.goto("https://google.com");
    // await page.pause(); // browser does not close
    console.log(await page.title()); // print page title
    await expect(page).toHaveTitle("Google"); // dont miss "await"

});

test.only("Find locator and start ui automation", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title()); // LoginPage Practise | Rahul Shetty Academy
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    // Find locators to write something and click the button
    await page.locator('#username').fill("username");
    await page.locator('#password').fill("password");
    await page.locator('#signInBtn').click();
    // wait until this block locator shown up in the page
    console.log(await page.locator("[style*='block']").textContent()); // Incorrect username/password.
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");     // alternative full text : await expect(locator).toHaveText()
    
    
   // await page.pause();
});