import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../Decorator/roles.decorator';
import { Role } from '../Roles/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // decide to take which roles ? 
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(), // get the role's handler
            context.getClass(), // get the role's class
        ]);

        if (!requiredRoles) {
            // role is empty => always passed
            return true;
        } else {

        }
        let httpRequest = context.switchToHttp().getRequest();
        let result = requiredRoles.some((role) => httpRequest.user.roles?.includes(role));
        return result;
    }
}