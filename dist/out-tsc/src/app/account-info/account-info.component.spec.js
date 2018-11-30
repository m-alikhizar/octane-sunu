"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var account_info_component_1 = require("./account-info.component");
var pipes_1 = require("../pipes");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable");
var services_1 = require("../../services/services");
describe('AccountInfoComponent', function () {
    var component;
    var fixture;
    var route;
    var contract;
    var MockActivatedRoute = /** @class */ (function () {
        function MockActivatedRoute() {
        }
        Object.defineProperty(MockActivatedRoute.prototype, "params", {
            get: function () {
                return Observable_1.Observable.create(function (observer) {
                    observer.next({ 'account': 'test' });
                    observer.complete();
                });
            },
            enumerable: true,
            configurable: true
        });
        return MockActivatedRoute;
    }());
    ;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule, http_2.HttpClientModule],
            declarations: [account_info_component_1.AccountInfoComponent, pipes_1.ToUTF8],
            providers: [services_1.VotingService, services_1.Web3Service,
                {
                    provide: router_1.ActivatedRoute,
                    useClass: MockActivatedRoute
                }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(account_info_component_1.AccountInfoComponent);
        component = fixture.componentInstance;
        route = testing_1.TestBed.get(router_1.ActivatedRoute);
        contract = testing_1.TestBed.get(services_1.VotingService);
    });
    it('should be created', function () {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
    it('route should be detected and reflected in address field', function () {
        var el = fixture.debugElement.query(platform_browser_1.By.css('.address'));
        expect(el.nativeElement.textContent.trim()).toEqual('');
        var expected = 'test';
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toEqual(expected);
    });
    it('account-info should be detected and receive an Observable', function () {
        var expected = { tokens: 1 };
        var el = fixture.debugElement.query(platform_browser_1.By.css('.tokens'));
        spyOn(contract, 'getUserInfo').and.returnValue(Observable_1.Observable.create(function (observer) {
            observer.next(expected);
            observer.complete();
        }));
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toEqual(expected.tokens.toString());
    });
});
//# sourceMappingURL=account-info.component.spec.js.map