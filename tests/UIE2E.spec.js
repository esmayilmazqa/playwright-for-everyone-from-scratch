// @ts-check
import { test, expect } from '@playwright/test';

test.only("e-commerce automation", async ({ page }) => {

  const productName = "iphone 13 pro";
  const products = page.locator("div.card-body"); // this is array
  const txtUsername = page.locator("input#userEmail");
  const txtPassword = page.locator("input#userPassword");
  const lblFilters = page.locator("h4").nth(1);
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  await txtUsername.fill("academy123+@gmail.com"); // email
  await txtPassword.fill("Academy123+"); // password
  await page.locator("input#login").click();
  await page.waitForLoadState("networkidle"); // not enought, put some control mechanism
  await expect(lblFilters).toHaveText("Filters");
  console.log("text : ", await lblFilters.textContent());

  const count = await products.count(); // array lentgh
  for (let i = 0; i < count; i++) {

    const title = await products.nth(i).locator("b").textContent(); // chaining locator

    if (title && title.includes("iphone")) { // title problem is solved as added null control
      console.log("title : ", title);
      console.log("Found : ", i, " index");
      await products.nth(i).locator("text= Add To Cart").click();
      // alternative 1 : await products.nth(i).locator(':has-text("Add To Cart")').click();
      // alternative 2: await products.nth(i).locator('button', { hasText: 'Add To Cart' }).click();

      break;
    }
  }

  await page.locator("button[routerlink*='cart']").click();

  // alternative  // await expect(page.locator(`h3:has-text("${productName}")`)).toBeVisible();
  await page.locator("div.cart li").waitFor();
  const isPresent = await page.locator(`h3:has-text("${productName}")`).isVisible();

  expect(isPresent).toBeTruthy();

  // check checkout elements
  await page.locator("ul button[type='button']").click();

  await page.locator("input[placeholder*='Country']").pressSequentially("ind");

  const cbbCountryPanel = page.locator("section.ta-results");
  await cbbCountryPanel.waitFor();

  const optionCount = await cbbCountryPanel.locator("button").count();
  for (let i = 0; i < optionCount; i++) {
    const text = await cbbCountryPanel.locator("button").nth(i).textContent();
    // console.log(text);
    if(text && text.trim() === "India") // solved text error with null control
    {
      cbbCountryPanel.locator("button").nth(i).click();
    }
  }




  await page.pause();

});
