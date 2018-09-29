import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserServiceModel } from '../../models/user.model';
import { AuthService } from '../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class UserService {

    constructor(
        private db: AngularFireDatabase,
        public afAuth: AngularFireAuth,
    ) {
    }

    public getCurrentUser(): Promise<any> {
        return new Promise((resolve) => {
            this.afAuth.auth.onAuthStateChanged(user => {
                const userUuid = user.uid;
                this._getUser(userUuid)
                    .then((currentUser) => {
                        resolve(currentUser);
                    });
            });
        });
    }

    public updateUser(user: UserServiceModel): Promise<boolean> {
        return new Promise((resolve) => {
            this.db.object(`/users/${ user.key }`).update(user)
                .then(() => {
                    resolve(true);
                });
        });
    }

    private _formUser(user): UserServiceModel {
        return {
            email: user[0],
            features: user[1],
            key: user[2] || [],
        };
    }

    private _getUser(userUuid: string): Promise<any> {
        return new Promise((resolve) => {
            this.db.list(`/users/${ userUuid }`).valueChanges()
                .subscribe((user) => {
                    const formedUser = this._formUser(user);
                    resolve(formedUser);
                });
        });
    }

    public createUser(user: UserServiceModel): Promise<boolean> {
        return new Promise((resolve) => {
            this.db.database.ref('/users').child(user.key).set(user)
                .then(() => {
                    resolve(true);
                })
        });
    }
}
