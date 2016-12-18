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
var core_1 = require('@angular/core');
var TemperaturePipe = (function () {
    function TemperaturePipe() {
    }
    TemperaturePipe.prototype.transform = function (temperature, unitType) {
        switch (unitType) {
            case 'celsius':
                var celsius = (temperature - 32) * 0.556;
                return celsius;
            default:
                return temperature;
        }
    };
    TemperaturePipe = __decorate([
        core_1.Pipe({
            name: 'temperatureUnit'
        }), 
        __metadata('design:paramtypes', [])
    ], TemperaturePipe);
    return TemperaturePipe;
}());
exports.TemperaturePipe = TemperaturePipe;
//# sourceMappingURL=temperature-unit.pipe.js.map