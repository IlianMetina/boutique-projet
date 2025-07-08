import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  if(!auth.isUserAuthenticated()){

    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
