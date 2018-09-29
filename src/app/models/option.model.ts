import { FactorModel, FactorValue } from './factor.model';

export interface OptionModel {
    key: string;
    title: string;
    description: string;
    enabled: boolean;
    factors: FactorModel[];
}

export interface OptionRequestModel {
    title: string;
    description: string;
    factorKeys: string[];
}

export class OptionUtil {
    static getEmptyObject(): OptionModel {
        return {
            key: '',
            title: '',
            description: '',
            enabled: false,
            factors: [],
        };
    }
}
