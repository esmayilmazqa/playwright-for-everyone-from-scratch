export class CartPage {
    constructor(page, productName) {
        this.page = page;
        this.productName = productName;
        this.productCardInCart = page.locator("div.cart li");
        this.btnCheckout = page.locator("ul button[type='button']");

        this.productNameInCart = page.locator(`h3:has-text("${this.productName}")`);

    }

    async clickCheckoutBtn() {
        await this.btnCheckout.click();
    }
}