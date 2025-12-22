// @ts-check
import { test, expect } from '@playwright/test';

test.only("e-commerce automation", async ({ page }) => {

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

    if (title.includes("iphone")) {
      console.log("title : ", title);
      console.log("Found : ", i, " index");
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }


  await page.pause();

});
