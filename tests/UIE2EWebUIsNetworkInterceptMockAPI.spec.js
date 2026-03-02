import { test, expect, request } from "@playwright/test";
import { APIUtils } from "./utils/APIUtils";
/**
 * UIE2E.spec.js scenario with Login API Injection
 */
const loginPayload = {
    userEmail: "academy123+@gmail.com",
    userPassword: "Academy123+"
};

const orderPayload = {
    orders: [
        {
            country: "Turkey",
            productOrderedId: "6960eae1c941646b7a8b3ed3"
        }
    ]
}; // take this from Network > Payload section or postman body

const fakeOrderPayload = {
    data: [], message: "No Orders"
};

let orderIdAndToken;

test.beforeAll(async () => {
    // Login with API and generated token from response
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    orderIdAndToken = await apiUtils.createOrder(orderPayload);

});

test.only("E2E scenario - Mock API", async ({ page }) => {


    // token from login API and be set on localStorage
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, orderIdAndToken.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    // all steps are gone

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6943157d32ed8658713b0559",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakeOrderPayload);
            route.fulfill(
                {
                    response,
                    body,

                }
            );
        }
    );


    await page.locator("button[routerLink*='orders']").click();
    await page.pause();


});