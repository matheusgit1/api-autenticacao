import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Logger,
  UseGuards,
  Req,
  Request as ReqNest,
  Put,
  Patch,
  Param,
  HttpStatus
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserEntity } from './dtos/create-users.dto';
import { validateAcountEntity } from './dtos/validate-acount.dto';
import { ResentVerifyCodeEntity } from './dtos/resent-verify-code.dto';
import { ResetPasswordEntity } from './dtos/reset-password.dto';
import { ChangePasswordEntity } from './dtos/change-password.dto';
import { ResetPasswordWithTokenEntity } from './dtos/reset-password-with-token.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../../infrastructure/jwt/jwt-auth.guard';

@Controller('v1/auth/users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  public constructor(private readonly userService: UsersService) {
    //to-do
  }
  @Post('/create')
  async createUser(@Body() body: CreateUserEntity, @Res() res: Response) {
    const response = await this.userService.createUser(body);
    return res.status(!response.erro ? 200 : HttpStatus.CONFLICT).json(response);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async listOne(@Req() req: Request) {
    return req.user;
  }

  @Post('/validate')
  async validateUser(@Body() body: validateAcountEntity, @Res() res: Response) {
    const validate = await this.userService.validateUser(
      body.email,
      body.verifyCode,
    );
    return res.json(validate);
  }

  @Post('/validate/resent-verify-code')
  async resentVerifyCode(
    @Body() body: ResentVerifyCodeEntity,
    @Res() res: Response,
  ) {
    const resentCode = await this.userService.resentVerifyCode(body.email);
    return res.json(resentCode);
  }

  @Put('/resete-password')
  async resetPassword(@Body() body: ResetPasswordEntity, @Res() res: Response) {
    const resetPassword = await this.userService.resetPassword(body.email);
    return res.json(resetPassword);
  }

  @Put('/resete-password/:resetPasswordtoken')
  async changePasswordWithoutLogin(
    @Body() body: ResetPasswordWithTokenEntity,
    @Param('resetPasswordtoken') resetPasswordtoken: string,
    @Res() res: Response,
  ) {
    const changePassword = await this.userService.changePasswordWithoutLogin(
      body.email,
      body.password,
      body.confirmPassword,
      resetPasswordtoken,
    );
    return res.json(changePassword);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/change-password')
  async changePasswordWithLogin(
    @Body() body: ChangePasswordEntity,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const changePassword = await this.userService.changePasswordWithLogin(
      body.password,
      req.headers.authorization,
    );

    return res.json(changePassword);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@ReqNest() req) {
    return req.user;
  }
}
