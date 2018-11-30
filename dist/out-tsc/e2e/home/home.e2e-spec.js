"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var home_po_1 = require("./home.po");
var protractor_1 = require("protractor");
describe('Home', function () {
    var page;
    beforeAll(function () {
        page = new home_po_1.Page();
        // page.navigateTo();
    });
    beforeEach(function () {
        protractor_1.browser.waitForAngular();
    });
    it('should display address saying address', function () { return __awaiter(_this, void 0, void 0, function () {
        var account;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.getAccount()];
                case 1:
                    account = _a.sent();
                    expect(page.getAddressText()).toEqual(account);
                    protractor_1.browser.sleep(2000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should buy tokens and adds display in user info', function () { return __awaiter(_this, void 0, void 0, function () {
        var tokensToBuy, currentTokens, expected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tokensToBuy = 1;
                    return [4 /*yield*/, page.getTokensText()];
                case 1:
                    currentTokens = _a.sent();
                    expected = parseInt(currentTokens, 10) + tokensToBuy;
                    return [4 /*yield*/, page.getBuyTokensInput().sendKeys(tokensToBuy.toString())];
                case 2:
                    _a.sent();
                    page.getBuyTokensButton().click();
                    expect(page.getTokensText()).toEqual(expected.toString());
                    protractor_1.browser.sleep(2000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should account status for vote defaults to false', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(page.getVotedStatusText()).toBeFalsy();
            return [2 /*return*/];
        });
    }); });
    it('should vote to proposal in tokens to display voted status true', function () { return __awaiter(_this, void 0, void 0, function () {
        var tokens;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.getTokensText()];
                case 1:
                    tokens = _a.sent();
                    return [4 /*yield*/, page.setValueToVoteInput(tokens)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, page.clickProposalButton()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.clickVote()];
                case 4:
                    _a.sent();
                    expect(page.getVotedStatusText()).toBeTruthy();
                    expect(page.getTokensText()).toEqual('0');
                    protractor_1.browser.sleep(2000);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=home.e2e-spec.js.map