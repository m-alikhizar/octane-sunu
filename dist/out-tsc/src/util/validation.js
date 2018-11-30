"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function canBeNumber(str) {
    if (!str) {
        return false;
    }
    return !isNaN(+str);
}
exports.canBeNumber = canBeNumber;
//# sourceMappingURL=validation.js.map