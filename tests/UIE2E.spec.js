// @ts-check
import { test, expect } from '@playwright/test';

test.only("e-commerce automation", async ({page}) => {
  
  const username = page.locator("input#userEmail");
  const password = page.locator("input#userPassword");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  await username.fill("academy123+@gmail.com"); // email
  await password.fill("Academy123+"); // password
  await page.locator("input#login").click();

  await page.pause();

});
