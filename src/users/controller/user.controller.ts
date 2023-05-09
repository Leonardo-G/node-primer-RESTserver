import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDTO } from '../dto/users.dto';
import { IsExistUserGuard } from '../guards/is-exist-user.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUser(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
  ) {
    try {
      console.log(limit, skip);
      return this.usersService.getUsersWithLimit(limit, skip);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  @UseGuards(IsExistUserGuard)
  createUser(@Body() createUserDTO: CreateUserDTO) {
    try {
      return this.usersService.newUser(createUserDTO);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
