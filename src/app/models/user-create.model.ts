import { UserLoginModel } from './user-login.model';

export interface UserCreateModel {
    email: string;
    password: string;
    confirmPassword: string;
}


export class UserCreateUtil {
    static getEmptyObject(): UserCreateModel {
        return {
            email: '',
            password: '',
            confirmPassword: '',
        };
    }
}
