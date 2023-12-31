import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ApiKey = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.headers['x-api-key'];
});
