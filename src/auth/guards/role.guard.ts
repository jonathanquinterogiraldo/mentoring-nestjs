import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { roles } from '../roles/roletypes';

@Injectable()
export class RoleGuard implements CanActivate {    

    canActivate(
        context: ExecutionContext
        ): boolean  {

            const rolesList = roles;

            if (!roles){
                return true
            }

            const request = context.switchToHttp().getRequest();
            const { user } = request;

            const hasRole = rolesList.find(elementRole => elementRole === user.role);

        return user && user.role && hasRole === 'ADMIN' ? true : false
    }
}