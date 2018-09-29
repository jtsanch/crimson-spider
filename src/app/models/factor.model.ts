export interface FactorValue {
    value: number;
    text: string;
}

export interface FactorModel {
    key: string;
    title: string;
    content: string;
    chosenValue: string;
    enabled: boolean;
    values: FactorValue[],
}

export interface FactorRequestModel {
    title: string;
    content: string;
    enabled: boolean;
    values: FactorValue[];
}

export class FactorUtil {
    static getEmptyObject(): FactorModel {
        const values: FactorValue[] = [];
        for (let i = 1; i <= 5; i++) {
            values.push({value: i, text: ''});
        }
        return {
            key: '',
            title: '',
            content: '',
            chosenValue: '1',
            enabled: false,
            values,
        };
    }
}
