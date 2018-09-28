import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FactorModel, FactorRequestModel } from '../../models/factor.model';

@Injectable()
export class FactorService {

    constructor(private db: AngularFireDatabase) {
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

    public createFactor(factor: FactorModel): Promise<FactorModel> {
        return new Promise((resolve) => {
            this.db.list('/factors').push(factor)
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
