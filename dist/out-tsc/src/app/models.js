"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccountItem = /** @class */ (function () {
    function AccountItem(address) {
        this.address = address;
    }
    return AccountItem;
}());
exports.AccountItem = AccountItem;
var TokensInfo = /** @class */ (function () {
    function TokensInfo(arr) {
        this.total = parseInt(arr[0], 10);
        this.available = parseInt(arr[1], 10);
        this.price = parseFloat(arr[2]);
    }
    return TokensInfo;
}());
exports.TokensInfo = TokensInfo;
var AccountInfo = /** @class */ (function () {
    function AccountInfo(arr) {
        this.tokens = arr[0].toString();
        this.proposal = arr[1].toString();
        this.voted = arr[2];
        this.delegate = arr[3].toString();
    }
    return AccountInfo;
}());
exports.AccountInfo = AccountInfo;
//# sourceMappingURL=models.js.map