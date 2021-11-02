let responseData = JSON.parse(responseBody);
pm.environment.set("tkLender_CustomerAuthToken", responseData.Data);

let infoMessage = responseData.InfoMessage;

pm.test("A Credit products are available to the user", function () {
    pm.expect(infoMessage).to.equal("Got cod is success");
})
pm.test("Error message must be empty", function () {
    pm.expect(responseData.Error).to.equal("");
})
pm.test("User can take PDL", function () {
    let CreditProduct = responseData.Data.find((item) => item.CreditProductType === 1);
    pm.expect(CreditProduct.CreditProductType).to.equal(1);
    pm.expect(CreditProduct.IsDefault).to.equal(true);
})

pm.test("User can take Annuity", function () {
    let CreditProduct = responseData.Data.find((item) => item.CreditProductType === 2
    || item.CreditProductType === 5);
    pm.expect(!!CreditProduct).to.equal(true)
    pm.expect(CreditProduct.IsDefault).to.equal(true);
    
})


pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
})

pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});