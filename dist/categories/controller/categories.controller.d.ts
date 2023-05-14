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
import { CategoriesService } from '../services/categories.service';
import { ReqUser } from 'src/common/interfaces/req-jwt.interface';
import { CreateCategoryDTO } from '../dto/category.dto';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    getAll(limit: number, skip: number): Promise<{
        total: number;
        categories: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schema/category.schema").Category> & Omit<import("../schema/category.schema").Category & {
            _id: import("mongoose").Types.ObjectId;
        }, never>> & Omit<import("mongoose").Document<unknown, {}, import("../schema/category.schema").Category> & Omit<import("../schema/category.schema").Category & {
            _id: import("mongoose").Types.ObjectId;
        }, never> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, never>)[];
    }>;
    getOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schema/category.schema").Category> & Omit<import("../schema/category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    }, never>> & Omit<import("mongoose").Document<unknown, {}, import("../schema/category.schema").Category> & Omit<import("../schema/category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    categoriesPost(createCategoryDTO: CreateCategoryDTO, { user }: ReqUser): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schema/category.schema").Category> & Omit<import("../schema/category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    }, never>> & Omit<import("mongoose").Document<unknown, {}, import("../schema/category.schema").Category> & Omit<import("../schema/category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    categoriesPut(createCategoryDTO: CreateCategoryDTO, id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schema/category.schema").Category> & Omit<import("../schema/category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    }, never>> & Omit<import("mongoose").Document<unknown, {}, import("../schema/category.schema").Category> & Omit<import("../schema/category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    categoriesDelete(rol: string, id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schema/category.schema").Category> & Omit<import("../schema/category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    }, never>> & Omit<import("mongoose").Document<unknown, {}, import("../schema/category.schema").Category> & Omit<import("../schema/category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
}
