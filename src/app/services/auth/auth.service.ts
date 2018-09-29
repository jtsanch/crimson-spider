import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, auth } from 'firebase';
import { P } from '@angular/core/src/render3';
import { UserService } from '../user/user.service';
import { UserModel, UserServiceModel } from '../../models/user.model';
import { OptionModel } from '../../models/option.model';

@Injectable()
export class AuthService {

    private _user: User;

    constructor(
        public afAuth: AngularFireAuth,
        public _userService: UserService,
    ) {}

    public login(email: string, password: string): Promise<boolean> {
        const promise = new Promise<boolean>((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    this._user = this.afAuth.auth.currentUser;
                    resolve(true);
                })
                .catch((err) => {
                    reject(err);
                });
        });
        return promise;
    }

    public formUserServiceUser(user: User): UserServiceModel {
        return {
            key: user.uid,
            email: user.email,
            features: [],
        };
    }

    public createUser(email: string, password: string): Promise<boolean> {
        const promise = new Promise<boolean>((resolve, reject) => {
            this.afAuth.auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    this._user = this.afAuth.auth.currentUser;
                    const user = this.formUserServiceUser(this._user);
                    this._userService.createUser(user)
                        .then(() => {
                            resolve(true);
                        });
                })
                .catch((err) => {
                    reject(err);
                });
        });
        return promise;
    }

    public isLoggedIn(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.onAuthStateChanged(user => {
                resolve(!!user);
            });
        });
    }

    public getUser(): Promise<User> {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.onAuthStateChanged(user => {
                if (user) {
                    this._user = user;
                    resolve(user);
                } else {
                    resolve(null);
                }
            });
        });
    }

    public logout(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.signOut()
                .then(() => {
                   resolve(true);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}
