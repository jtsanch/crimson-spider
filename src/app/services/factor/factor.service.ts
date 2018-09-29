import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FactorModel, FactorRequestModel } from '../../models/factor.model';
import { UserService } from '../user/user.service';

@Injectable()
export class FactorService {

    constructor(
        private db: AngularFireDatabase,
        private _userService: UserService,
        ) {
    }

    public getFactors(): Promise<any[]> {
        return new Promise((resolve) => {
            this.db.list('/factors').snapshotChanges()
                .subscribe((snapshot) => {
                    const factors = snapshot.map((child) => {
                        return {
                            key: child.key,
                            ...child.payload.val()
                        }
                    });
                    resolve(factors);
                });
        });
    }

    private _formFactorRequest(factor: FactorModel): FactorRequestModel {
        return {
            title: factor.title,
            enabled: factor.enabled,
            content: factor.content,
            values: factor.values,
        };
    }

    public createFactor(factor: FactorModel): Promise<FactorModel> {
        const factorRequest = this._formFactorRequest(factor);
        return new Promise((resolve) => {
            this.db.list('/factors').push(factorRequest)
                .then((createdFactor) => {
                    resolve(createdFactor)
                });
        });
    }

    public updateFactor(factor: FactorModel): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.db.object(`/factors/${ factor.key }`)
                .update(factor)
                .then(() => {
                    resolve(true);
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }
}
