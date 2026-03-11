import { test, page, expect } from "@playwright/test";

test("Taking full and Partial Screenshot", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const textbox = await page.locator("#displayed-text");
    await expect(textbox).toBeVisible(); 
    // if you not give locator as "#displayed-text" get an error (as textbox variable)
    await page.locator("#displayed-text").screenshot({path: "partialSs.jpg"}); // partial screenshot   
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: "screenshot.jpg"}); // screeshot for wholepage
    await expect(textbox).not.toBeVisible(); // or toBeHidden();
});

test("Visual Comparison Test", async({page})=>{
    await page.goto("https://www.rediff.com/");
    expect(await page.screenshot()).toMatchSnapshot("actualImage.png");

});