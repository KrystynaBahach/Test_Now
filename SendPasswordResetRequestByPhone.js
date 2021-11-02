let responseData = JSON.parse(responseBody);

let infoMessage = responseData.InfoMessage;

pm.test("BirthDate and Phone confirmed successfully", function () {
    pm.expect(infoMessage).to.equal("Created");
})
pm.test("Error message must be empty", function () {
    pm.expect(responseData.Error).to.equal("");
})

pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
})

pm.test("Code must be 4 symbuls", function () {
    pm.expect(responseData.Data.code.length).to.equal(4);
})

pm.test("The received phone must be equal the one sent in the request ", function () {
    let requestPhone = pm.request.body.urlencoded.find((item) => item.key === 'Phone').value;
    pm.expect(responseData.Data.Phone).to.equal(requestPhone);
})

pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});