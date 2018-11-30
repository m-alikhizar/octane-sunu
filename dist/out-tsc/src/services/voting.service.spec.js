"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var web3_service_1 = require("./web3.service");
var models_1 = require("../app/models");
var voting_service_1 = require("./voting.service");
describe('VotingService', function () {
    var service;
    var web3Service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [voting_service_1.VotingService, web3_service_1.Web3Service]
        });
        service = testing_1.TestBed.get(voting_service_1.VotingService);
        web3Service = testing_1.TestBed.get(web3_service_1.Web3Service);
    });
    it('should be created', testing_1.inject([voting_service_1.VotingService], function (_service) {
        expect(_service).toBeTruthy();
    }));
    it('should set loaded to true after loading ABI', function (done) {
        var exprected = { loaded: true };
        service.loadABI().subscribe(function (status) {
            expect(status).toEqual(exprected);
            done();
        });
    });
    it('should get accountinfo from abi to match <AccountInfo> type', function (done) {
        // [0] => tokens, [1] => proposal, [2] => voted, [3] => delegate
        var mockData = [1, '', true, 'foo'];
        service.abi = { voterDetails: function () { return Promise.resolve(mockData); } };
        var expected = new models_1.AccountInfo(mockData);
        service.getUserInfo('1').subscribe(function (result) {
            expect(result).toEqual(expected);
            done();
        });
    });
    it('should get candidates from abi to match UTF-8 value', function (done) {
        var web3 = web3Service.web3;
        var mockData = ['foo'];
        service.abi = { allCandidates: function () { return Promise.resolve(mockData); } };
        var expected = mockData.map(function (m) { return web3.toUtf8(m); });
        service.getCandidates().subscribe(function (result) {
            expect(result).toEqual(expected);
            done();
        });
    });
    it('should buy tokens in ethers with abi and returns receipt', function (done) {
        var web3 = web3Service.web3;
        var mockData = { receipt: { test: 1 } };
        service.abi = { buy: function () { return Promise.resolve(mockData); } };
        service.tokenPrice = 1;
        var expected = mockData.receipt;
        service.buyTokens(10, 'foo').subscribe(function (result) {
            expect(result).toEqual(expected);
            done();
        });
    });
    it('should get tokens info to match type <TokensInfo>', function (done) {
        var web3 = web3Service.web3;
        // [0] => total, [1] => available, [2] => price
        var mockData = [1, 1, 1];
        service.abi = { getTokensInfo: function () { return Promise.resolve(mockData); } };
        var info = new models_1.TokensInfo(mockData);
        var expected = info;
        service.getTokensInfo().subscribe(function (result) {
            expect(result).toContain(expected);
            done();
        });
    });
    it('should vote in tokens tokens into account with proposal', function (done) {
        var web3 = web3Service.web3;
        var mockData = { receipt: { foo: 'bar' } };
        service.abi = { vote: function () { return Promise.resolve(mockData); } };
        var expected = mockData.receipt;
        service.vote('foo', 1, 'bar').subscribe(function (result) {
            expect(result).toEqual(expected);
            done();
        });
    });
    it('should delegate in tokens tokens into account without proposal', function (done) {
        var web3 = web3Service.web3;
        var mockData = { receipt: { foo: 'bar' } };
        service.abi = { delegate: function () { return Promise.resolve(mockData); } };
        var expected = mockData.receipt;
        service.delegate('foo', 1, 'bar').subscribe(function (result) {
            expect(result).toEqual(expected);
            done();
        });
    });
});
//# sourceMappingURL=voting.service.spec.js.map