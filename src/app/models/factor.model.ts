export interface FactorModel {
    title: string;
    content: string;
}


export class FactorUtil {
    static getEmptyObject(): FactorModel {
        return {
            title: '',
            content: '',
        };
    }
}
