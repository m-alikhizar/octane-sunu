"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var accounts_component_1 = require("./accounts.component");
var services_1 = require("../../services/services");
var models_1 = require("../models");
var platform_browser_1 = require("@angular/platform-browser");
var Observable_1 = require("rxjs/Observable");
describe('AccountsComponent', function () {
    var component;
    var fixture;
    var web3Service;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [accounts_component_1.AccountsComponent],
            providers: [services_1.Web3Service]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(accounts_component_1.AccountsComponent);
        component = fixture.componentInstance;
        web3Service = testing_1.TestBed.get(services_1.Web3Service);
    });
    it('should be created', function () {
        spyOn(web3Service, 'getAccounts').and.returnValue(Observable_1.Observable.create(function (observer) {
            observer.next([new models_1.AccountItem('abc')]);
            observer.complete();
        }));
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
    fit('should be populated with accounts of type AccountItem', function () {
        var expected = new models_1.AccountItem('abc');
        spyOn(web3Service, 'getAccounts').and.returnValue(Observable_1.Observable.create(function (observer) {
            observer.next([expected]);
            observer.complete();
        }));
        fixture.detectChanges();
        var el = fixture.debugElement.query(platform_browser_1.By.css('.address'));
        expect(el.nativeElement.textContent.trim()).toEqual(expected.address);
    });
});
//# sourceMappingURL=accounts.component.spec.js.map