import { expect, page } from "@playwright/test";

export class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.txtCountry = page.locator("input[placeholder*='Country']");
        this.cbbCountryPanel = page.locator("section.ta-results");
        this.countries = page.locator("section.ta-results button");
        this.lblUsername = page.locator("div.user__name label[type='text']");
        this.btnPlaceOrder = page.locator("a.action__submit");

    }

    async pressSequentiallyCountry(text) {
        await this.txtCountry.pressSequentially(text);
        await this.cbbCountryPanel.waitFor();
    }

    async selectCountry(country) {
        const optionCount = await this.countries.count();
        for (let i = 0; i < optionCount; i++) {
            const text = await this.countries.nth(i).textContent();
            console.log(text, "heeyyyyyyyyyy",country);
            if (text && text.trim() === country) // solved text error with null control
            {
                this.countries.nth(i).click();
            }
        }

    }

    async clickPlaceOrderBtn()
    {
        await this.btnPlaceOrder.click();
    }


}