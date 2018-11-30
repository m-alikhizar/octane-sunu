"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var compose_component_1 = require("./compose.component");
describe('ComposeComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [compose_component_1.ComposeComponent],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(compose_component_1.ComposeComponent);
        component = fixture.componentInstance;
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
});
//# sourceMappingURL=compose.component.spec.js.map