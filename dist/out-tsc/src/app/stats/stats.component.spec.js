"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var stats_component_1 = require("./stats.component");
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable");
var platform_browser_1 = require("@angular/platform-browser");
var services_1 = require("../../services/services");
describe('StatsComponent', function () {
    var component;
    var fixture;
    var contract;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule, http_2.HttpClientModule],
            declarations: [stats_component_1.StatsComponent],
            providers: [services_1.VotingService, services_1.Web3Service]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(stats_component_1.StatsComponent);
        component = fixture.componentInstance;
        contract = testing_1.TestBed.get(services_1.VotingService);
    });
    it('should be created', function () {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
    it('should return Observable from stats and reflect in view', function () {
        var expected = [{
                proposal: 'abc',
                voteCount: 1
            }];
        var expectedProposal = 'test';
        spyOn(contract, 'stats').and.returnValue(Observable_1.Observable.create(function (observer) {
            observer.next(expected);
            observer.complete();
        }));
        spyOn(contract, 'proposal').and.returnValue(Observable_1.Observable.create(function (observer) {
            observer.next(expectedProposal);
            observer.complete();
        }));
        fixture.detectChanges();
        var el = fixture.debugElement.queryAll(platform_browser_1.By.css('.record'));
        var proposalEl = fixture.debugElement.query(platform_browser_1.By.css('.proposal'));
        expect(el.length).toEqual(expected.length);
        expect(proposalEl.nativeElement.textContent.trim()).toEqual(expectedProposal);
    });
});
//# sourceMappingURL=stats.component.spec.js.map