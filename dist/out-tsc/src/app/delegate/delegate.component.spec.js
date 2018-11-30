"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var delegate_component_1 = require("./delegate.component");
var services_1 = require("../../services/services");
var platform_browser_1 = require("@angular/platform-browser");
var Observable_1 = require("rxjs/Observable");
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http");
describe('DelegateComponent', function () {
    var component;
    var fixture;
    var contract;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule, http_2.HttpClientModule],
            declarations: [delegate_component_1.DelegateComponent],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            providers: [services_1.VotingService, services_1.Web3Service]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(delegate_component_1.DelegateComponent);
        component = fixture.componentInstance;
        contract = testing_1.TestBed.get(services_1.VotingService);
    });
    it('should be created', function () {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
    it('should receive account as @input', function () {
        component.account = 'test';
        fixture.detectChanges();
        expect(component.getAccount()).toEqual('test');
    });
    it('should submit request for delegate on click', function (done) {
        var transactionReceipt = { transactionHash: 'bar' };
        var expected = transactionReceipt.transactionHash;
        component.account = 'test';
        component.delegateAddress = 'foo';
        component.tokens = '1';
        spyOn(contract, 'delegate').and.returnValue(Observable_1.Observable.create(function (observer) {
            observer.next(transactionReceipt);
            observer.complete();
            expect(transactionReceipt.transactionHash).toEqual(expected);
            done();
        }));
        var el = fixture.debugElement.query(platform_browser_1.By.css('.button')).nativeElement;
        el.click();
        fixture.detectChanges();
    });
});
//# sourceMappingURL=delegate.component.spec.js.map