"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var services_1 = require("../../services/services");
var operators_1 = require("rxjs/operators");
var AccountsComponent = /** @class */ (function () {
    function AccountsComponent(web3Service, ref) {
        this.web3Service = web3Service;
        this.ref = ref;
    }
    AccountsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accounts = this.web3Service.getAccounts()
            .pipe(operators_1.tap(function () {
            // https://github.com/brave/browser-laptop/issues/13711
            setTimeout(function () {
                _this.ref.tick();
            }, 0);
        }));
    };
    AccountsComponent = __decorate([
        core_1.Component({
            selector: 'app-accounts',
            templateUrl: './accounts.component.html',
            styleUrls: ['./accounts.component.css']
        }),
        __metadata("design:paramtypes", [services_1.Web3Service, core_1.ApplicationRef])
    ], AccountsComponent);
    return AccountsComponent;
}());
exports.AccountsComponent = AccountsComponent;
//# sourceMappingURL=accounts.component.js.map