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
var VoteComponent = /** @class */ (function () {
    function VoteComponent(votingService) {
        var _this = this;
        this.votingService = votingService;
        this.onVoteClick = function () {
            if (!_this.proposal || _this.voting) {
                return;
            }
            if (!parseInt(_this.tokens, 10)) {
                return;
            }
            _this.voting = true;
            _this.votingService.vote(_this.proposal, parseInt(_this.tokens, 10), _this.account).subscribe(function (receipt) {
                receipt.keys = Object.keys(receipt);
                _this.receipt = receipt;
                _this.voting = false;
            }, function (error) {
                _this.voting = false;
                console.log(error);
            });
        };
        this.onCandidateClick = function (index) {
            _this.proposal = _this.candidates[index];
        };
    }
    VoteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.candidates = [];
        this.votingService.getCandidates().subscribe(function (result) {
            _this.candidates = result;
        }, function (error) {
            console.error(error);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VoteComponent.prototype, "account", void 0);
    VoteComponent = __decorate([
        core_1.Component({
            selector: 'app-vote',
            templateUrl: './vote.component.html',
            styleUrls: ['./vote.component.css']
        }),
        __metadata("design:paramtypes", [services_1.VotingService])
    ], VoteComponent);
    return VoteComponent;
}());
exports.VoteComponent = VoteComponent;
//# sourceMappingURL=vote.component.js.map