import { test, expect, page } from "@playwright/test";

test("@HACK Network Request Intercept for Security Test", async ({ page }) => {


    const productName = "iphone 13 pro";
    const products = page.locator("div.card-body"); // this is array
    const txtUsername = page.locator("input#userEmail");
    const txtPassword = page.locator("input#userPassword");
    const lblFilters = page.locator("h4").nth(1);
    const email = 'academy123+@gmail.com';

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await txtUsername.fill(email); // email
    await txtPassword.fill("Academy123+"); // password
    await page.locator("input#login").click();
    await expect(lblFilters).toHaveText("Filters"); // auto-wait working
    console.log("text : ", await lblFilters.textContent());
    
    await page.locator("button[routerLink*='orders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64ce67ea7244490f9597bff6" })
    );
    await page.locator("button:has-text('View')").first().click();
    await page.pause();
});