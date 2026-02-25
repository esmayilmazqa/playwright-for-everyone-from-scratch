import { test, expect, browser } from "@playwright/test";
let webContext;

test.beforeAll(async ({ browser }) => {

    const uiContext = await browser.newContext();
    const page =  await uiContext.newPage();
    const lblFilters = page.locator("h4").nth(1);
    const email = 'academy123+@gmail.com';

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.locator("input#userEmail").fill(email);             
    await page.locator("input#userPassword").fill("Academy123+");  
    await page.locator("input#login").click();
    await lblFilters.waitFor();
    // keep application info on file :
    await uiContext.storageState({path: "state.json"});
    webContext = await browser.newContext({storageState:'state.json'});
    
});

test("Test Description", async () => {
    const productName = "iphone 13 pro";
    const page = await webContext.newPage(); // not work intellisense
    const products = page.locator("div.card-body"); // this is array

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.pause();
    

});
