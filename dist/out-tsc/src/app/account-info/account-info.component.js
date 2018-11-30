"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var router_1 = require("@angular/router");
var AccountInfoComponent = /** @class */ (function () {
    function AccountInfoComponent(route, votingService) {
        var _this = this;
        this.route = route;
        this.votingService = votingService;
        this.onReady = function () {
            _this.userInfo = {};
            _this.subscription = _this.votingService.getUserInfo(_this.account).subscribe(function (result) {
                _this.userInfo = __assign({}, _this.userInfo, result);
            }, function (error) { });
        };
    }
    AccountInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            _this.account = params.account;
        });
        this.onReady();
    };
    AccountInfoComponent = __decorate([
        core_1.Component({
            selector: 'app-account-info',
            templateUrl: './account-info.component.html',
            styleUrls: ['./account-info.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, services_1.VotingService])
    ], AccountInfoComponent);
    return AccountInfoComponent;
}());
exports.AccountInfoComponent = AccountInfoComponent;
//# sourceMappingURL=account-info.component.js.map