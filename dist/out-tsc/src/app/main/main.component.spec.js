"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
var main_component_1 = require("./main.component");
describe('MainComponent', function () {
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
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [main_component_1.MainComponent],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            providers: [{
                    provide: router_1.ActivatedRoute,
                    useClass: MockActivatedRoute
                }]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(main_component_1.MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
    it('should set account from from ActivatedRoute', function () {
        var account = component.getAccount();
        expect(account).toBeTruthy('test');
    });
});
//# sourceMappingURL=main.component.spec.js.map