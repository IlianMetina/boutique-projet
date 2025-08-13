import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const AdminGuard: CanActivateFn = async(route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const adminUrl = 'http://localhost:3000/admin';

  console.log("Entrée AdminGuard");

  if(!authService.isUserAuthenticated() || !authService.isAdmin()){

    console.log('FIRST');
    console.log(authService.isAdmin());
    router.navigateByUrl('/');
    return false;
  }

  const response = await authService.AuthenticatedRequest(adminUrl, 'GET');
  console.log("Réponse reçue AdminGuard :", response);
  console.log(response.isAdmin);
  if(response.isAdmin == true){
    
    console.log("Salut");
    return true;
  }else{
    router.navigateByUrl('/');
    return false;
  }
  
  return false;
};
