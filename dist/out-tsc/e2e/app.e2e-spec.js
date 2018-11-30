"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_po_1 = require("./app.po");
var protractor_1 = require("protractor");
describe('App', function () {
    var page;
    beforeEach(function () {
        page = new app_po_1.Page();
    });
    it('should display message saying app works', function () {
        page.navigateTo();
        var expected = 'Octane Sunu';
        expect(page.getHeaderText()).toEqual(expected);
        protractor_1.browser.sleep(1000);
    });
    it('should load Application Binary Interface for voting contract', function () {
        var expected = 'connected';
        expect(page.getStatusClasses()).toContain(expected);
        protractor_1.browser.sleep(1000);
    });
    it('should login in with the account', function () {
        var account = page.getFirstAccountText();
        page.clickOnAccount();
        // browser.sleep(2500);
        expect(protractor_1.browser.driver.getCurrentUrl()).toContain(account);
        protractor_1.browser.sleep(1000);
    });
});
//# sourceMappingURL=app.e2e-spec.js.map