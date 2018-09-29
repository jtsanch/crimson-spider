import { FactorModel } from './factor.model';
import { OptionModel } from './option.model';

export interface FeatureModel {
    enabled: boolean;
    title: string;
    factors: FactorModel[];
}


export class FeatureUtil {
    static getEmptyObject(): FeatureModel {
        return {
            enabled: false,
            title: '',
            factors: [],
        };
    }
}
