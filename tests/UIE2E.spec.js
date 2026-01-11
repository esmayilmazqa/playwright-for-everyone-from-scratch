// @ts-check
import { test, expect } from '@playwright/test';

test("E-commerce automation with traditional locators - locator API -", async ({ page }) => {

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
  // await page.waitForLoadState("networkidle"); // not enought, put some control mechanism (crashed)
  await expect(lblFilters).toHaveText("Filters"); // auto-wait working
  console.log("text : ", await lblFilters.textContent());

  let count = await products.count(); // array lentgh
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
    if (text && text.trim() === "India") // solved text error with null control
    {
      cbbCountryPanel.locator("button").nth(i).click();
    }
  }

  await expect(page.locator("div.user__name label[type='text']")).toHaveText(email);
  await page.locator("a.action__submit").click();
  await expect(page.locator("h1.hero-primary")).toHaveText(" Thankyou for the order. ");

  const orderId = await page.locator("td.em-spacer-1 label.ng-star-inserted").textContent();
  console.log(orderId);

  await page.locator("button[routerLink*='orders']").click();

  const rows = page.locator("tbody tr");
  await rows.nth(0).waitFor();
  count = await rows.count();

  for (let i = 0; i < count; i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }

  }

  const lblOrder = page.locator("div.col-text.-main");
  console.log("orderId ", orderId); //  | 695963e0c941646b7a7b4fca |
  // await lblOrder.waitFor(); 
  console.log("lblOrderText : ", await lblOrder.textContent());
  expect(lblOrder).toHaveText(orderId?.replaceAll("|", "").replaceAll(" ", ""));



  await page.pause();

});

test("E-Commerce App by using PW Special Locators", async ({ page }) => {
  const productName = "iphone 13 pro";
  const products = page.locator("div.card-body"); // this is array
  const txtUsername = page.locator("input#userEmail");
  const txtPassword = page.locator("input#userPassword");
  const lblFilters = page.locator("h4").nth(1);
  const email = 'academy123+@gmail.com';

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  await page.getByPlaceholder("email@example.com").fill(email);             // await txtUsername.fill(email); // email
  await page.getByPlaceholder("enter your passsword").fill("Academy123+");  // await txtPassword.fill("Academy123+"); // password
  await page.getByRole("button", {name:'Login'}).click();                 // await page.locator("input#login").click();
  // await page.waitForLoadState("networkidle"); // not enought, put some control mechanism (crashed)
  await expect(lblFilters).toHaveText("Filters"); // auto-wait working
  console.log("text : ", await lblFilters.textContent());


  await page.locator(".card-body").filter({hasText:'iphone 13 pro'}).getByRole("button",{name:"Add To Cart"}).click();

  await page.getByRole("listitem").getByRole("button", {name:"Cart"}).click();  // await page.locator("button[routerlink*='cart']").click();

  await page.locator("div.cart li").waitFor();

  // alternative  // await expect(page.locator(`h3:has-text("${productName}")`)).toBeVisible();
  await expect(page.getByText(productName)).toBeVisible(); // const isPresent = await page.locator(`h3:has-text("${productName}")`).isVisible();   expect(isPresent).toBeTruthy();
  await page.getByRole("button", {name:"Checkout"}).click();  // check checkout elements   await page.locator("ul button[type='button']").click();

  await page.getByPlaceholder("Select Country").pressSequentially("ind"); // await page.locator("input[placeholder*='Country']").pressSequentially("ind");

  // not waiting to open cbb panel during using pw locators
  await page.getByRole("button", {name: "India"}).nth(1).click();

  await page.getByText("PLACE ORDER").click(); //   await page.locator("a.action__submit").click();
  await expect(page.getByText("Thankyou for the order.")).toBeVisible(); // await expect(page.locator("h1.hero-primary")).toHaveText(" Thankyou for the order. ");

  
  let orderId = await page.locator("td.em-spacer-1 label.ng-star-inserted").textContent();
  orderId = orderId.replaceAll("|", "").replaceAll(" ", "");
  console.log(orderId);
  await expect(orderId).not.toBeNull();

  await page.getByRole("button", {name: "ORDERS"}).click(); // await page.locator("button[routerLink*='orders']").click();

  const rows = page.locator("tbody tr");
  await rows.nth(0).waitFor(); // this is component

  // await page.getByText(orderId).getByRole("button", {name: "View"}).click(); -> not work
   await page.locator('tr', {   has: page.getByText(orderId)}).getByRole('button', { name: 'View' }).click();


  const lblOrder = page.locator("div.col-text.-main");
  console.log("orderId ", orderId);
  // await lblOrder.waitFor(); 
  console.log("lblOrderText : ", await lblOrder.textContent());
  expect(lblOrder).toHaveText(orderId);



  // await page.pause();
  
  
});
