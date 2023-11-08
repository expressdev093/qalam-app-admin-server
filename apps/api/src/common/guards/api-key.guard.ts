import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API Key not found');
    }

    // Check if the API key is valid
    const isValid = this.validateApiKey(apiKey);

    if (!isValid) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return isValid;
  }

  private validateApiKey(apiKey: string): boolean {
    // Check if the API key is valid (e.g. in a whitelist)
    return apiKey === this.configService.get<string>('API_KEY');
  }
}
