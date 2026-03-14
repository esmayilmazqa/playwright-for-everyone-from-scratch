// @ts-check
import { test, expect } from '@playwright/test';
import { POManager } from '../pageobjects/POManager';

test.only("E-commerce PO automation with traditional locators - locator API -", async ({ page }) => {

  const productName = "iphone 13 pro";
  const username = 'academy123+@gmail.com';
  const password = "Academy123+";

  const pomManager = new POManager(page,productName);
  await pomManager.getLoginPage().landOnPage();
  await pomManager.getLoginPage().validLogin(username, password);
  // await page.waitForLoadState("networkidle"); // not enought, put some control mechanism (crashed)
  await expect(pomManager.getLoginPage().lblFilters).toHaveText("Filters"); // auto-wait working
  // console.log("text : ", await dashboardPage.lblFilters.textContent());

  await pomManager.getDashboardPage().selectAndAddToCart(productName);
  await pomManager.getDashboardPage().clickCartMenu();

  await expect(pomManager.getCartPage().productNameInCart.isVisible()).toBeTruthy();

  // check checkout elements
  await pomManager.getCartPage().clickCheckoutBtn();
  await pomManager.getCheckoutPage().pressSequentiallyCountry("ind");
  await pomManager.getCheckoutPage().selectCountry("India");

  await expect(pomManager.getCheckoutPage().lblUsername).toHaveText(username);

  await pomManager.getCheckoutPage().clickPlaceOrderBtn();


  // order details page
  await expect(await pomManager.getOrderDetailsPage().msgThankYou).toHaveText(" Thankyou for the order. ");

  const orderId = await pomManager.getOrderDetailsPage().orderId.textContent();
  // await page.locator("td.em-spacer-1 label.ng-star-inserted").textContent();
  console.log(orderId);


  // OrdersPage 
  await pomManager.getDashboardPage().clickOrdersMenu();
  await pomManager.getOrdersPage().clickViewBtnForAddedOrder(orderId);


  // Order Summary
  const lblOrder = await pomManager.getOrderDetailsPage().getOrderId();
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
  await page.getByRole("button", { name: 'Login' }).click();                 // await page.locator("input#login").click();
  // await page.waitForLoadState("networkidle"); // not enought, put some control mechanism (crashed)
  await expect(lblFilters).toHaveText("Filters"); // auto-wait working
  console.log("text : ", await lblFilters.textContent());


  await page.locator(".card-body").filter({ hasText: 'iphone 13 pro' }).getByRole("button", { name: "Add To Cart" }).click();

  await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();  // await page.locator("button[routerlink*='cart']").click();

  await page.locator("div.cart li").waitFor();

  // alternative  // await expect(page.locator(`h3:has-text("${productName}")`)).toBeVisible();
  await expect(page.getByText(productName)).toBeVisible(); // const isPresent = await page.locator(`h3:has-text("${productName}")`).isVisible();   expect(isPresent).toBeTruthy();
  await page.getByRole("button", { name: "Checkout" }).click();  // check checkout elements   await page.locator("ul button[type='button']").click();

  await page.getByPlaceholder("Select Country").pressSequentially("ind"); // await page.locator("input[placeholder*='Country']").pressSequentially("ind");

  // not waiting to open cbb panel during using pw locators
  await page.getByRole("button", { name: "India" }).nth(1).click();

  await page.getByText("PLACE ORDER").click(); //   await page.locator("a.action__submit").click();
  await expect(page.getByText("Thankyou for the order.")).toBeVisible(); // await expect(page.locator("h1.hero-primary")).toHaveText(" Thankyou for the order. ");


  let orderId = await page.locator("td.em-spacer-1 label.ng-star-inserted").textContent();
  orderId = orderId.replaceAll("|", "").replaceAll(" ", "");
  console.log(orderId);
  await expect(orderId).not.toBeNull();

  await page.getByRole("button", { name: "ORDERS" }).click(); // await page.locator("button[routerLink*='orders']").click();

  const rows = page.locator("tbody tr");
  await rows.nth(0).waitFor(); // this is component

  // await page.getByText(orderId).getByRole("button", {name: "View"}).click(); -> not work
  await page.locator('tr', { has: page.getByText(orderId) }).getByRole('button', { name: 'View' }).click();


  const lblOrder = page.locator("div.col-text.-main");
  console.log("orderId ", orderId);
  // await lblOrder.waitFor(); 
  console.log("lblOrderText : ", await lblOrder.textContent());
  expect(lblOrder).toHaveText(orderId);



  // await page.pause();


});
