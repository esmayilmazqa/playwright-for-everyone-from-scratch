import {customtest, expect} from "../test-factory/base-test.js";
import { PageObjectManager } from '../page-objects/page-object-manager';


  customtest.only(`E-commerce PO automation with traditional locators and customtest by fixture`, async ({ page, testDataForOrder }) => {

    const pomManager = new PageObjectManager(page, testDataForOrder.productName);
    await pomManager.getLoginPage().landOnPage();
    await pomManager.getLoginPage().validLogin(testDataForOrder.username, testDataForOrder.password);
    // await page.waitForLoadState("networkidle"); // not enought, put some control mechanism (crashed)
    await expect(pomManager.getLoginPage().lblFilters).toHaveText("Filters"); // auto-wait working
    // console.log("text : ", await dashboardPage.lblFilters.textContent());

    await pomManager.getDashboardPage().selectAndAddToCart(testDataForOrder.productName);
    await pomManager.getDashboardPage().clickCartMenu();

    await expect(pomManager.getCartPage().productNameInCart.isVisible()).toBeTruthy();

    // check checkout elements
    await pomManager.getCartPage().clickCheckoutBtn();
    await pomManager.getCheckoutPage().pressSequentiallyCountry("ind");
    await pomManager.getCheckoutPage().selectCountry("India");

    await expect(pomManager.getCheckoutPage().lblUsername).toHaveText(testDataForOrder.username);

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