"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var buy_tokens_component_1 = require("./buy-tokens.component");
var pipes_1 = require("../pipes");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable");
var services_1 = require("../../services/services");
var models_1 = require("../models");
var forms_1 = require("@angular/forms");
describe('BuyTokensComponent', function () {
    var component;
    var fixture;
    var contract;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule, http_2.HttpClientModule, forms_1.FormsModule],
            declarations: [buy_tokens_component_1.BuyTokensComponent, pipes_1.FromWei],
            providers: [services_1.VotingService, services_1.Web3Service]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(buy_tokens_component_1.BuyTokensComponent);
        component = fixture.componentInstance;
        contract = testing_1.TestBed.get(services_1.VotingService);
    });
    it('should be created', function () {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
    it('should return Observable from getTokensInfo and reflect in view', function () {
        var expected = new models_1.TokensInfo([1, 1]);
        spyOn(contract, 'getTokensInfo').and.returnValue(Observable_1.Observable.create(function (observer) {
            observer.next([expected]);
            observer.complete();
        }));
        fixture.detectChanges();
        var el = fixture.debugElement.query(platform_browser_1.By.css('.available'));
        expect(el.nativeElement.textContent.trim()).toEqual(expected.available.toString());
    });
});
//# sourceMappingURL=buy-tokens.component.spec.js.map