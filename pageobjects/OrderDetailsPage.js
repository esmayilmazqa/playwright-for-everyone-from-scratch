export class OrderDetailsPage{
    constructor(page)
    {
        this.page = page;
        this.msgThankYou = page.locator("h1.hero-primary");
        this.orderId = page.locator("td.em-spacer-1 label.ng-star-inserted");        
        this.lblOrderId = page.locator("div.col-text.-main");

    }

    async getOrderId() {
        console.log("orderId ", this.lblOrderId); //  | 695963e0c941646b7a7b4fca |
        // await lblOrder.waitFor(); 
        console.log("lblOrderText : ", await this.lblOrderId.textContent());
        return this.lblOrderId;
    }

}