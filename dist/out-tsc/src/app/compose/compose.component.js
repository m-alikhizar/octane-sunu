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
var ComposeComponent = /** @class */ (function () {
    function ComposeComponent() {
        var _this = this;
        this.getAccount = function () {
            return _this.account;
        };
        this.onDelegateOptClick = function () {
            _this.state = _this.STATES.DELEGATE;
        };
        this.onVoteOptClick = function () {
            _this.state = _this.STATES.VOTE;
        };
    }
    ComposeComponent.prototype.ngOnInit = function () {
        this.STATES = { VOTE: 1, DELEGATE: 2 };
        this.state = this.STATES.VOTE;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ComposeComponent.prototype, "account", void 0);
    ComposeComponent = __decorate([
        core_1.Component({
            selector: 'app-compose-in',
            templateUrl: './compose.component.html',
            styleUrls: ['./compose.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ComposeComponent);
    return ComposeComponent;
}());
exports.ComposeComponent = ComposeComponent;
//# sourceMappingURL=compose.component.js.map