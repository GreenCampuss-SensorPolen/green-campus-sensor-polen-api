import { Controller, Body, Req, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/passport/decorators/roles.decorator';
import { Role } from 'src/constants/enums/role.enum';
import * as authenticatedRequestInterface from 'src/constants/interfaces/authenticatedRequest.interface';

import { UpdateUserDto } from './dto';
import { UserService } from './user.service';

@ApiBearerAuth('token')
@ApiBearerAuth('jwt')
@Controller({ path: 'user', version: '1' })
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Patch('profile')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN, Role.MANAGER, Role.VIEWER)
  async updateProfile(@Req() req: authenticatedRequestInterface.AuthenticatedRequest, @Body() updateProfileDto: UpdateUserDto) {
    return await this.userService.updateUser(req.user.email, updateProfileDto);
  }
}
