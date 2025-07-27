import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

export const UserId = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        // On récupère le userId déjà extrait par le guard
        if (!request.user || !request.user.sub) {
            throw new UnauthorizedException('Utilisateur non authentifié');
        }
        return request.user.sub;
    },
);