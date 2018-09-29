import { Injectable } from '@angular/core';
import { OptionModel } from '../../models/option.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '../user/user.service';
import { UserServiceModel } from '../../models/user.model';
import { FeatureModel } from '../../models/feature.model';

@Injectable()
export class FeatureService {

    constructor(
        private _userService: UserService,
        private db: AngularFireDatabase) {
    }

    public getFeatures(): Promise<any[]> {
        return new Promise((resolve) => {
            this._userService.getCurrentUser()
                .then((user: UserServiceModel) => {
                    resolve(user.features);
                });
        });
    }

    public createFeature(feature: FeatureModel): Promise<boolean> {
        return new Promise((resolve) => {
            this._userService.getCurrentUser()
                .then((user: UserServiceModel) => {
                    user.features = user.features || [];
                    user.features.push(feature);
                    this._userService.updateUser(user)
                        .then(() => {
                            resolve(true);
                        })
                });
        });
    }

}
