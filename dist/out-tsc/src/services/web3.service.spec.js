"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var web3_service_1 = require("./web3.service");
describe('Web3Service', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [web3_service_1.Web3Service]
        });
    });
    it('should be created', testing_1.inject([web3_service_1.Web3Service], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=web3.service.spec.js.map