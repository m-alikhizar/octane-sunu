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
var BuyTokensComponent = /** @class */ (function () {
    function BuyTokensComponent(votingService) {
        var _this = this;
        this.votingService = votingService;
        this.onReady = function () {
            _this.tokensInfo = _this.votingService.getTokensInfo();
        };
        this.buyTokens = function () {
            _this.pending = true;
            var receipt = _this.votingService.buyTokens(_this.tokens, _this.account)
                .pipe(operators_1.tap(function () {
                _this.tokens = 0;
                _this.pending = false;
                _this.tokensInfo = _this.votingService.getTokensInfo();
            })).subscribe();
        };
    }
    BuyTokensComponent.prototype.ngOnInit = function () {
        this.onReady();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], BuyTokensComponent.prototype, "account", void 0);
    BuyTokensComponent = __decorate([
        core_1.Component({
            selector: 'app-buy-tokens',
            templateUrl: './buy-tokens.component.html',
            styleUrls: ['./buy-tokens.component.css']
        }),
        __metadata("design:paramtypes", [services_1.VotingService])
    ], BuyTokensComponent);
    return BuyTokensComponent;
}());
exports.BuyTokensComponent = BuyTokensComponent;
//# sourceMappingURL=buy-tokens.component.js.map