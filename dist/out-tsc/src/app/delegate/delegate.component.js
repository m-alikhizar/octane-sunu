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
var DelegateComponent = /** @class */ (function () {
    function DelegateComponent(votingService) {
        var _this = this;
        this.votingService = votingService;
        this.getAccount = function () {
            return _this.account;
        };
        this.onDelegateClick = function () {
            if (!_this.delegateAddress || _this.delegating) {
                return;
            }
            if (!parseInt(_this.tokens, 10)) {
                return;
            }
            _this.delegating = true;
            _this.votingService.delegate(_this.delegateAddress, parseInt(_this.tokens, 10), _this.account).subscribe(function (receipt) {
                receipt.keys = Object.keys(receipt);
                _this.receipt = receipt;
                _this.delegating = false;
            }, function (error) {
                _this.delegating = false;
                console.log(error);
            });
        };
    }
    DelegateComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DelegateComponent.prototype, "account", void 0);
    DelegateComponent = __decorate([
        core_1.Component({
            selector: 'app-delegate-vote',
            templateUrl: './delegate.component.html',
            styleUrls: ['./delegate.component.css']
        }),
        __metadata("design:paramtypes", [services_1.VotingService])
    ], DelegateComponent);
    return DelegateComponent;
}());
exports.DelegateComponent = DelegateComponent;
//# sourceMappingURL=delegate.component.js.map