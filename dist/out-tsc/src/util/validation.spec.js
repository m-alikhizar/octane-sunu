"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validation_1 = require("./validation");
describe('Validation of string; check if it can be a number', function () {
    it('should return true', function () {
        var str = '12';
        var result = validation_1.canBeNumber(str);
        expect(result).toBe(true);
    });
    it('should return false', function () {
        var str = '1q';
        var result = validation_1.canBeNumber(str);
        expect(result).toBe(false);
    });
    it('should return false', function () {
        var str = '';
        var result = validation_1.canBeNumber(str);
        expect(result).toBe(false);
    });
});
//# sourceMappingURL=validation.spec.js.map