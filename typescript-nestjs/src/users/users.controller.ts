import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  ParseBoolPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './interfaces/interface';
import { UserDTO, UserParamsDTO } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //HTTP request methods
  @Get()
  getUsers(
    @Param('id', ParseIntPipe) id: number,
    @Query('sort', ParseBoolPipe) sort: boolean,
  ): User[] {
    return this.userService.getUsers();
  }
  @Get('/:email')
  getUser(@Param() params: UserParamsDTO): User {
    return this.userService.getUser(params.email);
  }
  @Post()
  @UsePipes(
    new ValidationPipe({
      enableDebugMessages: true,
    }),
  )
  postUser(@Body() user: UserDTO): User {
    return this.userService.addUser(user);
  }
  @Delete('/:email')
  deleteUser(@Param() params: UserParamsDTO): User[] {
    return this.userService.deleteUser(params.email);
  }
}
