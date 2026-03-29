export class LoginPage {
    constructor(page) {
        this.page = page;
        this.txtUsername = page.locator("input#userEmail");
        this.txtPassword = page.locator("input#userPassword");
        this.btnSignIn = page.locator("input#login");
        this.lblFilters = page.locator("h4").nth(1);
    }

    async landOnPage() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    }

    // not use function keyword for function declaration
    async validLogin(username, password) {
        await this.txtUsername.fill(username); // email
        await this.txtPassword.fill(password); // password
        await this.btnSignIn.click();
        
    }
}