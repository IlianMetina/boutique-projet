import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    
    console.log("Entrée ! ! ! AdminGuard");
    const request = context.switchToHttp().getRequest();
    console.log("Requete reçue");
    console.log(request.user);
    const user = request.user;
    console.log(user);
    if (user.role === 'ADMIN') {
      console.log("User ADMIN");
      return true;
    }
    throw new ForbiddenException('Accès réservé aux administrateurs');
  }
}