import { OptionModel } from './option.model';
import { FeatureModel } from './feature.model';

export interface UserModel {
    key?: string;
    email: string;
    password: string;
}

export interface UserServiceModel {
    key: string;
    email: string;
    features: FeatureModel[];
}