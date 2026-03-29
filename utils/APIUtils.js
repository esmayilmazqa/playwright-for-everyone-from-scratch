export class APIUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            }
        );
        const responseJson = await loginResponse.json();
        const token = responseJson.token;
        console.log("Token : ", token);
        return token;
    }

    async createOrder(orderPayload) {
        let orderIdAndToken= {};
        orderIdAndToken.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'Authorization': orderIdAndToken.token,
                    'Content-Type': 'application/json'
                }
            }
        );

        const orderResponseJson = await orderResponse.json();
        console.log("Response : ", orderResponseJson);
        orderIdAndToken.orderId = orderResponseJson.orders[0];
        return orderIdAndToken;
    }
}