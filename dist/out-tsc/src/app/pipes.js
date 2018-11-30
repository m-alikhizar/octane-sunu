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
var services_1 = require("../services/services");
var ToUTF8 = /** @class */ (function () {
    function ToUTF8(web3Service) {
        this.web3Service = web3Service;
    }
    ToUTF8.prototype.transform = function (value) {
        if (value) {
            var web3 = this.web3Service.web3;
            return web3.toUtf8(value);
        }
        return value;
    };
    ToUTF8 = __decorate([
        core_1.Pipe({ name: 'toUTF8' }),
        __metadata("design:paramtypes", [services_1.Web3Service])
    ], ToUTF8);
    return ToUTF8;
}());
exports.ToUTF8 = ToUTF8;
var FromWei = /** @class */ (function () {
    function FromWei(web3Service) {
        this.web3Service = web3Service;
    }
    FromWei.prototype.transform = function (value) {
        if (value) {
            var web3 = this.web3Service.web3;
            return web3.fromWei(value);
        }
        return value;
    };
    FromWei = __decorate([
        core_1.Pipe({ name: 'fromWei' }),
        __metadata("design:paramtypes", [services_1.Web3Service])
    ], FromWei);
    return FromWei;
}());
exports.FromWei = FromWei;
//# sourceMappingURL=pipes.js.map