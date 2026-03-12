export class OrderDetailsPage{
    constructor(page)
    {
        this.page = page;
        this.msgThankYou = page.locator("h1.hero-primary");
        this.orderId = page.locator("td.em-spacer-1 label.ng-star-inserted");

    }

}