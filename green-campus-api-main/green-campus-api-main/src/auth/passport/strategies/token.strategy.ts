import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { StrategyOptionsWithoutRequest } from 'passport-jwt';
import { Role } from 'src/constants/enums/role.enum';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy, 'token') {
  constructor(private configService: ConfigService) {
    super({} as StrategyOptionsWithoutRequest);
  }

  validate(token: string) {
    if(token == this.configService.get<string>('TOKEN')) {
      return { email: this.configService.get<string>('PGADMIN_DEFAULT_EMAIL'), role: Role.ADMIN };
    } else if(token == this.configService.get<string>('SENSOR_TOKEN')) {
      return { email: this.configService.get<string>('SENSOR_EMAIL'), role: Role.SENSOR };
    } else throw new UnauthorizedException('Invalid token');
  }
}
