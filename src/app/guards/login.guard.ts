import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    public afAuth: AngularFireAuth,
    public auth: AuthService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const user = await this.auth.getCurrentUserSnapshot();
    if (user) {
      this.router.navigate(['/user']);
      return false;
    }
    return true;
  }
}
