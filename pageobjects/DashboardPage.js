import { CartPage } from "./CartPage";

export class DashboardPage {
    constructor(page) {
        this.page = page;
        this.cartPage = new CartPage(this.page);
        this.products = page.locator("div.card-body"); // this is array
        this.cartMenu = page.locator("button[routerlink*='cart']");
        this.ordersMenu = page.locator("button[routerLink*='orders']");

    }

    async clickOrdersMenu() {
          await this.ordersMenu.click();
    }

    async selectAndAddToCart(productName) {
        let count = await this.products.count(); // array lentgh
        for (let i = 0; i < count; i++) {

            const title = await this.products.nth(i).locator("b").textContent(); // chaining locator

            if (title && title.includes(productName)) { // title problem is solved as added null control
                console.log("title : ", title);
                console.log("Found : ", i, " index");

                // alternative 1 : await products.nth(i).locator(':has-text("Add To Cart")').click();
                // alternative 2: await products.nth(i).locator('button', { hasText: 'Add To Cart' }).click();
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }


    async clickCartMenu() {
        await this.cartMenu.click();
        await this.cartPage.productCardInCart.waitFor();

    }
}