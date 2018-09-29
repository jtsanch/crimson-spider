import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { OptionModel, OptionRequestModel } from '../../models/option.model';

@Injectable()
export class OptionService {

    constructor(private db: AngularFireDatabase) {
    }

    public getOptions(): Promise<any[]> {
        return new Promise((resolve) => {
            this.db.list('/options').snapshotChanges()
                .subscribe((snapshot) => {
                    const options = snapshot.map((child) => {
                        return {
                            key: child.key,
                            ...child.payload.val(),
                        };
                    });
                    resolve(options);
                })
        });
    }

    public createOption(option: OptionModel): Promise<boolean> {
        return new Promise((resolve) => {
            const optionRequest = this.formOptionRequest(option);
            this.db.list('/options').push(optionRequest)
                .then(() => {
                    resolve(true);
                });
        });
    }

    public updateOption(option: OptionModel): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const optionRequest = this.formOptionRequest(option);
            this.db.object(`/options/${ option.key }`)
                .update(optionRequest)
                .then(() => {
                    resolve(true);
                })
                .catch(() => {
                    reject(false);
                });
        });
    }

    public formOptionRequest(option: OptionModel): OptionRequestModel {
        return {
            title: option.title,
            description: option.description,
            factorKeys: option.factors.map(factor => factor.key),
        };
    }
}
