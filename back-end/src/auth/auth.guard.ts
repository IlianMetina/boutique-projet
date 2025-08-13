import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService){}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    console.log("Entrée AuthGuard ! ! ! ");
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    console.log("Méthode AuthGuard");

    if(!token){

      throw new UnauthorizedException('Token manquant');
    }

    try{

      const payload = this.jwtService.verify(token);
      if(payload){
        console.log("Token dans payload :");
        console.log(payload);
        request.user = payload;
        return true;
      }

      throw new UnauthorizedException('Erreur récupération payload ?');
      
    }catch(err){

      throw new UnauthorizedException('Token invalide');
    }

  }
}
