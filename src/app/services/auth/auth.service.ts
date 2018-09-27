import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable()
export class AuthService {

    private _user: User;

    constructor(public afAuth: AngularFireAuth) {
        this._user = null;
    }

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

    public createUser(email: string, password: string): Promise<boolean> {
        const promise = new Promise<boolean>((resolve, reject) => {
            this.afAuth.auth.createUserWithEmailAndPassword(email, password)
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

    public isLoggedIn(): boolean {
        return !!this._user;
    }

    public getUser(): User {
        return this._user;
    }
}
