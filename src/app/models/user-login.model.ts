export interface UserLoginModel {
    email: string;
    password: string;
}

export class UserLoginUtil {
    static getEmptyObject(): UserLoginModel {
        return {
            email: '',
            password: '',
        };
    }
}
