import { test as base, expect} from "@playwright/test";

export const customtest = base.extend({
  testDataForOrder: async ({}, use) => {
    const userData = {
      username: "academy123+@gmail.com",
      password: "Academy123+",
      productName: "iphone 13 pro"
    }
    await use(userData);
  }
});


export {expect}; // Module '"../test-factory/base-test.js"' declares 'expect' locally, but it is not exported.ts(2459) base-test.js(1, 24): 'expect' is declared here.