import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PRIVATE_KEY } from '../metadata/private.metadata';
import { IS_PUBLIC_KEY } from '../metadata/public.metadata';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest();
    }

    return undefined;
    // const ctx = GqlExecutionContext.create(context);
    // return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const isPrivate = this.reflector.getAllAndOverride(IS_PRIVATE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPrivate) {
      return super.canActivate(context);
    }
    return isPublic ? true : super.canActivate(context);
  }
}
