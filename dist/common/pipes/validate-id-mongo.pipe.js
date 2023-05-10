"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateIdMongoPipe = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let ValidateIdMongoPipe = class ValidateIdMongoPipe {
    transform(value, metadata) {
        const isValidIdMongo = mongoose_1.Types.ObjectId.isValid(value);
        console.log(value);
        if (!isValidIdMongo) {
            throw new common_1.BadRequestException(`The ID: ${value} is not valid id Mongo`);
        }
        return value;
    }
};
ValidateIdMongoPipe = __decorate([
    (0, common_1.Injectable)()
], ValidateIdMongoPipe);
exports.ValidateIdMongoPipe = ValidateIdMongoPipe;
//# sourceMappingURL=validate-id-mongo.pipe.js.map