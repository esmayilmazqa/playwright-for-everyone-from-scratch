import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { DashboardPage } from "./DashboardPage";
import { LoginPage } from "./LoginPage";
import { OrderDetailsPage } from "./OrderDetailsPage";
import { OrdersPage } from "./OrdersPage";

export class POManager{
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