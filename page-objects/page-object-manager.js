import { CartPage } from "./cart-page";
import { CheckoutPage } from "./checkout-page";
import { DashboardPage } from "./dashboard-page";
import { LoginPage } from "./login-page";
import { OrderDetailsPage } from "./order-details-page";
import { OrdersPage } from "./orders-page";

export class PageObjectManager{
    constructor(page, productName)
    {
        this.page = page;
        this.dashboardPage = new DashboardPage(this.page);
        this.loginPage = new LoginPage(this.page);
        this.cartPage = new CartPage(this.page, productName);
        this.checkoutPage = new CheckoutPage(this.page);
        this.orderDetailsPage = new OrderDetailsPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getCheckoutPage()
    {
        return this.checkoutPage;
    }

    getOrderDetailsPage()
    {
        return this.orderDetailsPage;
    }

    getOrdersPage()
    {
        return this.ordersPage;
    }
}