import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dto/signin-user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize/serialize.interceptor';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

class signupDto {
  @IsString()
  userName: string;
  @IsString()
  password: string;
}
class signinVo {
  @Expose()
  userName: string;
  @Expose()
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signin')
  async signin(@Body() dto: SigninUserDto) {
    const { userName, password } = dto;
    const token = await this.authService.signin(userName, password);
    return {
      access_token: token,
    };
  }

  @Post('/signup')
  @UseInterceptors(new SerializeInterceptor(signinVo))
  signup(@Body() dto: signupDto) {
    console.log(
      '%c 🐞~~ dto ：',
      'color:#fff;background:red;border-radius:3px',
      dto,
    );
    return dto;
  }
}
