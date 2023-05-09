import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { CreateUserDTO } from '../dto/users.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getUsersWithLimit(limit: number, skip: number): Promise<{
        total: number;
        users: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User> & Omit<User & {
            _id: import("mongoose").Types.ObjectId;
        }, never>> & Omit<import("mongoose").Document<unknown, {}, User> & Omit<User & {
            _id: import("mongoose").Types.ObjectId;
        }, never> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, never>)[];
    }>;
    newUser(createUserDTO: CreateUserDTO): Promise<UserDocument>;
    countUsers(): Promise<number>;
    findByEmail(email: string): Promise<UserDocument>;
}
