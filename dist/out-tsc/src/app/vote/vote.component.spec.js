"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var vote_component_1 = require("./vote.component");
var services_1 = require("../../services/services");
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http");
var platform_browser_1 = require("@angular/platform-browser");
var Observable_1 = require("rxjs/Observable");
describe('VoteComponent', function () {
    var component;
    var fixture;
    var contract;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule, http_2.HttpClientModule],
            declarations: [vote_component_1.VoteComponent],
            providers: [services_1.VotingService, services_1.Web3Service],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(vote_component_1.VoteComponent);
        component = fixture.componentInstance;
        contract = testing_1.TestBed.get(services_1.VotingService);
    });
    it('should be created', function () {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
    it('should receive candidates', function () {
        var expected = ['abc', 'cde'];
        spyOn(contract, 'getCandidates').and.returnValue(Observable_1.Observable.create(function (observer) {
            observer.next(expected);
            observer.complete();
        }));
        fixture.detectChanges();
        var elements = fixture.debugElement.queryAll(platform_browser_1.By.css('.proposal'));
        expect(elements.length).toEqual(expected.length);
    });
    it('should submit request for vote on click', function (done) {
        var transactionReceipt = { transactionHash: 'bar' };
        var expected = transactionReceipt.transactionHash;
        component.account = 'test';
        component.tokens = '1';
        component.proposal = 'foo';
        component.account = 'bar';
        spyOn(contract, 'vote').and.returnValue(Observable_1.Observable.create(function (observer) {
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
//# sourceMappingURL=vote.component.spec.js.map