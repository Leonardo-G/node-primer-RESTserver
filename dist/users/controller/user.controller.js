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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("../services/users.service");
const users_dto_1 = require("../dto/users.dto");
const is_exist_user_guard_1 = require("../guards/is-exist-user.guard");
const validate_id_mongo_pipe_1 = require("../../common/pipes/validate-id-mongo.pipe");
const validate_rol_pipe_1 = require("../../common/pipes/validate-rol/validate-rol.pipe");
const validate_jwt_guard_1 = require("../../common/guards/validate-jwt.guard");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getUser(limit = 10, skip = 0) {
        try {
            console.log(limit, skip);
            return this.usersService.getUsersWithLimit(limit, skip);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    createUser(createUserDTO) {
        try {
            return this.usersService.newUser(createUserDTO);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    userPut(updateUserDTO, id) {
        try {
            return this.usersService.updateUser(updateUserDTO, id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    userDelete(rol, id) {
        try {
            return this.usersService.deleteUser(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('skip', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(is_exist_user_guard_1.IsExistUserGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.CreateUserDTO]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', validate_id_mongo_pipe_1.ValidateIdMongoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UpdateUserDTO, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "userPut", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(validate_jwt_guard_1.ValidateJwtGuard),
    __param(0, (0, common_1.Body)('rol', validate_rol_pipe_1.ValidateRolPipe)),
    __param(1, (0, common_1.Param)('id', validate_id_mongo_pipe_1.ValidateIdMongoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "userDelete", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=user.controller.js.map