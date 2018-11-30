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
var Observable_1 = require("rxjs/Observable");
var environment_1 = require("../environments/environment");
var models_1 = require("../app/models");
var Web3 = require('web3');
var Web3Service = /** @class */ (function () {
    function Web3Service() {
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof window.web3 !== 'undefined') {
            /* Using web3 detected from external source. */
            this.web3 = new Web3(window.web3.currentProvider);
        }
        else {
            /* No web3 detected. Falling back to 'environment.HttpProvider'.
            Should remove this fallback when you deploy live, as it's inherently insecure.
      
            FALLBACK - use fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            */
            this.web3 = new Web3(new Web3.providers.HttpProvider(environment_1.environment.HttpProvider));
        }
    }
    Web3Service.prototype.getAccounts = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.web3.eth.getAccounts(function (error, accounts) {
                if (error != null) {
                    observer.error("There was an error fetching accounts.");
                }
                if (accounts.length === 0) {
                    observer.error("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                }
                observer.next(accounts.map(function (account) { return new models_1.AccountItem(account); }));
                observer.complete();
            });
        });
    };
    ;
    Web3Service = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], Web3Service);
    return Web3Service;
}());
exports.Web3Service = Web3Service;
//# sourceMappingURL=web3.service.js.map