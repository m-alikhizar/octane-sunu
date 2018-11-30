"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var app_component_1 = require("./app.component");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var services_1 = require("../services/services");
var testing_2 = require("@angular/router/testing");
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable");
describe('AppComponent', function () {
    var contract;
    var fixture;
    var app;
    var spy;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule, testing_2.RouterTestingModule, http_1.HttpModule, http_2.HttpClientModule],
            declarations: [app_component_1.AppComponent],
            providers: [services_1.VotingService, services_1.Web3Service]
        }).compileComponents();
    }));
    beforeEach(function () {
        contract = testing_1.TestBed.get(services_1.VotingService);
        fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        app = fixture.debugElement.componentInstance;
        spy = spyOn(contract, 'loadABI').and.returnValue(Observable_1.Observable.create(function (observer) {
            observer.next();
            observer.complete();
        }));
        fixture.detectChanges();
    });
    it('should create the app', testing_1.async(function () {
        expect(app).toBeTruthy();
    }));
    it('should load the pre requisites', testing_1.async(function () {
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    }));
    it('should set loaded boolean to true', testing_1.async(function () {
        var expected = 'connected';
        var el = fixture.debugElement.query(platform_browser_1.By.css('.title'));
        expect(el.nativeElement.classList).toContain(expected);
    }));
});
//# sourceMappingURL=app.component.spec.js.map