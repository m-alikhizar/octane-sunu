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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var web3_service_1 = require("./web3.service");
var models_1 = require("../app/models");
var artifacts = require('../assets/data/Voting.json');
var contract = require('truffle-contract');
var VotingService = /** @class */ (function () {
    function VotingService(web3Service) {
        this.web3Service = web3Service;
        this.subject = new Subject_1.Subject();
    }
    VotingService.prototype.loadABI = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) { return __awaiter(_this, void 0, void 0, function () {
            var voting, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        voting = contract(artifacts);
                        voting.setProvider(this.web3Service.web3.currentProvider);
                        _a = this;
                        return [4 /*yield*/, voting.deployed()];
                    case 1:
                        _a.abi = _b.sent();
                        observer.next({ loaded: true });
                        observer.complete();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    VotingService.prototype.getUserInfo = function (account) {
        var web3 = this.web3Service.web3;
        (function () {
            return __awaiter(this, void 0, void 0, function () {
                var data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            if (!this.abi) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.abi.voterDetails.call(account)];
                        case 1:
                            data = _a.sent();
                            this.subject.next(new models_1.AccountInfo(data));
                            _a.label = 2;
                        case 2: return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            this.subject.observers.map(function (obs) { return obs.error("Error fetching account info"); });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }).bind(this)();
        return this.subject.asObservable();
    };
    VotingService.prototype.getCandidates = function () {
        var _this = this;
        var web3 = this.web3Service.web3;
        return Observable_1.Observable.create(function (observer) { return __awaiter(_this, void 0, void 0, function () {
            var candidates, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!this.abi) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.abi.allCandidates.call()];
                    case 1:
                        candidates = _a.sent();
                        observer.next(candidates.map(function (c) { return web3.toUtf8(c); }));
                        observer.complete();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        observer.error(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    VotingService.prototype.buyTokens = function (tokens, account) {
        var _this = this;
        var web3 = this.web3Service.web3;
        var price = tokens * this.tokenPrice;
        return Observable_1.Observable.create(function (observer) { return __awaiter(_this, void 0, void 0, function () {
            var payload, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payload = { value: web3.toWei(price, 'ether'), from: account };
                        return [4 /*yield*/, this.abi.buy(payload)];
                    case 1:
                        response = _a.sent();
                        observer.next(response.receipt);
                        observer.complete();
                        this.getUserInfo(account);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    VotingService.prototype.getTokensInfo = function () {
        var _this = this;
        var web3 = this.web3Service.web3;
        return Observable_1.Observable.create(function (observer) { return __awaiter(_this, void 0, void 0, function () {
            var data, info, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!this.abi) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.abi.getTokensInfo()];
                    case 1:
                        data = _a.sent();
                        info = new models_1.TokensInfo(data);
                        this.tokenPrice = web3.fromWei(info.price);
                        observer.next([info]);
                        observer.complete();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        observer.error(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    VotingService.prototype.vote = function (proposal, tokens, account) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) { return __awaiter(_this, void 0, void 0, function () {
            var response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.abi.vote(proposal, tokens, { gas: 140000, from: account })];
                    case 1:
                        response = _a.sent();
                        observer.next(response.receipt);
                        observer.complete();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        observer.error(err_1);
                        return [3 /*break*/, 3];
                    case 3:
                        this.getUserInfo(account);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    VotingService.prototype.delegate = function (delegateAccount, tokens, account) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) { return __awaiter(_this, void 0, void 0, function () {
            var response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.abi.delegate(delegateAccount, tokens, { gas: 140000, from: account })];
                    case 1:
                        response = _a.sent();
                        observer.next(response.receipt);
                        observer.complete();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        observer.error(error_4);
                        return [3 /*break*/, 3];
                    case 3:
                        this.getUserInfo(account);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    VotingService.prototype.stats = function () {
        var _this = this;
        var web3 = this.web3Service.web3;
        return Observable_1.Observable.create(function (observer) { return __awaiter(_this, void 0, void 0, function () {
            var candidates, result, _i, candidates_1, c, candidate, votes, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        if (!this.abi) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.abi.allCandidates.call()];
                    case 1:
                        candidates = _a.sent();
                        result = [];
                        _i = 0, candidates_1 = candidates;
                        _a.label = 2;
                    case 2:
                        if (!(_i < candidates_1.length)) return [3 /*break*/, 5];
                        c = candidates_1[_i];
                        candidate = web3.toUtf8(c);
                        return [4 /*yield*/, this.abi.totalVotesFor.call(candidate)];
                    case 3:
                        votes = _a.sent();
                        result.push({ 'proposal': candidate, 'voteCount': votes.toString() });
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        observer.next(result);
                        observer.complete();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_5 = _a.sent();
                        observer.error(error_5);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); });
    };
    VotingService.prototype.proposal = function () {
        var _this = this;
        var web3 = this.web3Service.web3;
        return Observable_1.Observable.create(function (observer) { return __awaiter(_this, void 0, void 0, function () {
            var response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!this.abi) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.abi.winningProposal.call()];
                    case 1:
                        response = _a.sent();
                        observer.next(web3.toUtf8(response));
                        observer.complete();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        observer.error(error_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    VotingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [web3_service_1.Web3Service])
    ], VotingService);
    return VotingService;
}());
exports.VotingService = VotingService;
//# sourceMappingURL=voting.service.js.map