import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { first } from 'rxjs/internal/operators/first';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  login() {
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
  getLoggedInUser() {
    return this.afAuth.authState;
  }

  async getCurrentUserSnapshot() {
    const user = await this.getLoggedInUser()
      .pipe(first())
      .toPromise();
    return user;
  }

  async getIdToken() {
    const user = await this.getCurrentUserSnapshot();
    if (user) {
      const token = await user.getIdToken(true);
      return token;
    }
    return null;
  }
}
