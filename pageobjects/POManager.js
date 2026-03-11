import { DashboardPage } from "./DashboardPage";
import { LoginPage } from "./LoginPage";

export class POManager{
    constructor(page)
    {
        this.page = page;
        this.dashboardPage = new DashboardPage(this.page);
        this.loginPage = new LoginPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }
}