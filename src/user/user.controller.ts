import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Inject,
  LoggerService,
  Body,
  Headers,
  Query,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { getUserDto } from './dto/user.dto';
import { TypormFiletr } from '../filters/typeorm.filter';

@Controller('user')
@UseFilters(new TypormFiletr())
export class UserController {
  // private logger = new Logger(UserController.name);

  constructor(
    private userService: UserService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.logger.log('UserController init');
  }

  @Get()
  getUsers(@Query() query: getUserDto): any {
    console.log('%c query ：', 'color:red', query);
    return this.userService.findAll(query);
    // return this.userService.getUsers();
  }
  @Get('/profile')
  getUserProfile(@Headers() headers): any {
    console.log('%c req ：', 'color:red', headers);

    return this.userService.findProfile(2);
  }

  @Post()
  addUser(@Body() body): any {
    console.log('%c body ：', 'color:red', body);
    // todo 解析Body参数
    const user = { username: 'toimc', password: '123456' } as User;
    // return this.userService.addUser();
    return this.userService.create(user);
  }
  @Patch()
  updateUser(): any {
    // todo 传递参数id
    // todo 异常处理
    const user = { username: 'newname' } as User;
    return this.userService.update(1, user);
  }

  @Delete()
  deleteUser(): any {
    // todo 传递参数id
    return this.userService.remove(1);
  }

  @Get('/logs')
  getUserLogs(): any {
    return this.userService.findUserLogs(2);
  }

  @Get('/logsByGroup')
  async getLogsByGroup(): Promise<any> {
    const res = await this.userService.findLogsByGroup(2);
    // return res.map((o) => ({
    //   result: o.result,
    //   count: o.count,
    // }));
    return res;
  }
}
