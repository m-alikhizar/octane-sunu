"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var Page = /** @class */ (function () {
    function Page() {
    }
    Page.prototype.navigateTo = function () {
        return protractor_1.browser.get('/');
    };
    Page.prototype.getHeaderText = function () {
        return protractor_1.element(protractor_1.by.css('.hero .title')).getText();
    };
    Page.prototype.getStatusClasses = function () {
        return protractor_1.element(protractor_1.by.css('.hero .title')).getAttribute('class').then(function (classes) { return classes.split(' '); });
    };
    Page.prototype.getFirstAccountText = function () {
        return protractor_1.element.all(protractor_1.by.css('table td.address')).first().getText();
    };
    Page.prototype.clickOnAccount = function () {
        protractor_1.element.all(protractor_1.by.css('.button')).first().click();
    };
    return Page;
}());
exports.Page = Page;
//# sourceMappingURL=app.po.js.map