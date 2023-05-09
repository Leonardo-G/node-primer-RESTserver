/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UsersService } from '../services/users.service';
import { CreateUserDTO } from '../dto/users.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUser(limit?: number, skip?: number): Promise<{
        total: number;
        users: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schema/user.schema").User> & Omit<import("../schema/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>> & Omit<import("mongoose").Document<unknown, {}, import("../schema/user.schema").User> & Omit<import("../schema/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, never>)[];
    }>;
    createUser(createUserDTO: CreateUserDTO): Promise<import("mongoose").Document<unknown, {}, import("../schema/user.schema").User> & Omit<import("../schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
