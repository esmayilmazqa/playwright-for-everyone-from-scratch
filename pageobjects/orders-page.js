export class OrdersPage {
    constructor(page) {
        this.page = page;
        this.orderRows = page.locator("tbody tr");
    }


    async clickViewBtnForAddedOrder(orderId) {
        await this.orderRows.nth(0).waitFor();
        const count = await this.orderRows.count();

        for (let i = 0; i < count; i++) {
            const rowOrderId = await this.orderRows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.orderRows.nth(i).locator("button").first().click();
                break;
            }

        }
    }

    
}