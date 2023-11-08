import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    // if (context.getType() === 'http') {
    //   const request = context.switchToHttp().getRequest();
    //   user = request.user;
    // } else {
    //   const ctx = GqlExecutionContext.create(context);
    //   const request = ctx.getContext().req;
    //   user = request.user;
    // }

    return roles.some((role) => user.role === role);
  }
}
